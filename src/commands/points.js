/* eslint-disable max-len */
exports.run = async (client, message, args, level) => {
  const key = `${message.guild.id}-${message.author.id}`;
  return message.channel.send(`You currently have ${client.points.get(key, 'points')} points, and are level ${client.points.get(key, 'level')}!`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'points',
  category: 'Points',
  description: 'Shows you how many points you currently have.',
  usage: 'points',
};
