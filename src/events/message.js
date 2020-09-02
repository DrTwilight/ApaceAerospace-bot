/* eslint-disable max-len */
module.exports = async (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  const settings = message.settings = client.getSettings(message.guild);


  if (message.guild) {
    // This is where we'll put our code.
    const key = `${message.guild.id}-${message.author.id}`;
    client.points.ensure(key, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1,
    });
    client.points.math(key, '+', 25, 'points');
    const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, 'points')));

    // Act upon level up by sending a message and updating the user's level in enmap.
    if (client.points.get(key, 'level') < curLevel) {
      message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
      client.points.set(key, curLevel, 'level');
    }
  }


  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(settings.prefix) !== 0) return;
  // Our standard argument/command name definition.
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.guild && !message.member) await message.guild.fetchMember(message.author);

  const level = client.permlevel(message);


  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;
  if (cmd && !message.guild && cmd.conf.guildOnly) {
    return message.channel.send('This command is unavailable via private message. Please run this command in a guild.');
  }

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === 'true') {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find((l) => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === '-') {
    message.flags.push(args.shift().slice(1));
  }

  // Run the command
  cmd.run(client, message, args, level);
};
