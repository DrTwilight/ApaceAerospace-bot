/* eslint-disable max-len */
const {MessageEmbed} = require('discord.js');
exports.run = async (client, message, args, level) => {
  const filtered = client.points.filter( (p) => p.guild === message.guild.id ).array();

  // Sort it to get the top results... well... at the top. Y'know.
  const sorted = filtered.sort((a, b) => b.points - a.points);

  // Slice it, dice it, get the top 10 of it!
  const top10 = sorted.splice(0, 10);

  // Now shake it and show it! (as a nice embed, too!)
  const embed = new MessageEmbed();
  embed.setTitle('Leaderboard');
  embed.setAuthor(client.user.username, client.user.avatarURL);
  embed.setDescription('Our top 10 points leaders!');
  embed.setColor(0x00AE86);
  for (const data of top10) {
    embed.addField(client.users.cache.get(data.user).tag, `${data.points} points (level ${data.level})`);
  }
  return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'leaderboard',
  category: 'Points',
  description: 'Shows you top 10 people with most points.',
  usage: 'leaderboard',
};
