/* eslint-disable max-len */
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const mod = message.author;
  const user = message.mentions.members.first();
  const totalWarns = await client.awaitReply(message, 'How many warning would you like to remove');
  const settings = message.settings;
  const modlog = message.guild.channels.cache.find((ch) => ch.name === settings['modLogChannel']);
  client.warns.math(`${message.guild.id}-${user.id}`, '-', totalWarns);
  const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Unwarned ${user}`)
      .setDescription(`<@${user.id}> has had ${totalWarns} removed by ${mod} `)
      .addField('Reason', `${reason}`);
  modlog.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator',
};

exports.help = {
  name: 'unwarn',
  category: 'Moderation',
  description: 'Unwarns a naughty user.',
  usage: 'warn <user> <num>',
};
