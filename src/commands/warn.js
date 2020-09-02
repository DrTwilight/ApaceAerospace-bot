/* eslint-disable max-len */
const {MessageEmbed} = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const mod = message.author;
  const user = message.mentions.members.first();
  const reason = await client.awaitReply(message, 'What is your reasoning');
  const settings = message.settings;
  const modlog = message.guild.channels.cache.find((ch) => ch.name === settings['modLogChannel']);
  const key = `${message.guild.id}-${user.id}`;
  client.warns.ensure(key, 0);
  client.warns.inc(key);
  const totalWarns = client.warns.get(key);
  console.log(totalWarns);
  const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Warned ${user.id}`)
      .setDescription(`<@${user.id}> has been warned by ${mod} `)
      .addField('Reason', `${reason}`);
  message.channel.send(`<@${user.id}> has been warned`);
  switch (totalWarns) {
    case 1: user.send(`You have been warned for \`\`\`${reason}\`\`\``); modlog.send(embed); break;
    case 2: user.send(`You have been warned for \`\`\`${reason}\`\`\` next time you are getting banned!`); modlog.send(embed); break;
    case 3: user.send(`You have been warned for \`\`\`${reason}\`\`\` and are now getting banned!`); user.ban({reason: reason}); modlog.send(`${user} has been banned by ${mod.tag} because: ${reason}`); client.warns.delete(key); break;
    case 4: client.warns.delete(key);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator',
};

exports.help = {
  name: 'warn',
  category: 'Moderation',
  description: 'Warns a naughty user.',
  usage: 'warn <user>',
};
