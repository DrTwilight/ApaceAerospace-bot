const {MessageEmbed} = require('discord.js');

exports.run = async (client, message, args, level) => {
  const embed = new MessageEmbed();

  const {channel} = message.member.voice;
  if (!channel) {
    // IF AUTHOR IS NOT IN VOICE CHANNEL
    embed.setAuthor('YOU NEED TO BE IN VOICE CHANNEL :/');
    return message.channel.send(embed);
  }

  const serverQueue = message.client.queue.get(message.guild.id);

  if (!serverQueue) {
    embed.setAuthor('Bot is not playing anything');
    return message.channel.send(embed);
  }

  embed.setDescription(`**NOW PLAYING** - ${serverQueue.songs[0].title}`)
      .setThumbnail(serverQueue.songs[0].thumbnail);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'np',
  category: 'Music',
  description: 'It shows you teh current song playing.',
  usage: 'np',
};
