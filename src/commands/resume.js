const {MessageEmbed} = require('discord.js');

exports.run = async (client, message, args) => {
  const embed = new MessageEmbed();

  const {channel} = message.member.voice;

  if (!channel) {
    // IF AUTHOR IS NOT IN VOICE CHANNEL
    embed.setAuthor('YOU NEED TO BE IN VOICE CHANNEL :/');
    return message.channel.send(embed);
  }

  const serverQueue = message.client.queue.get(message.guild.id);
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    embed.setAuthor('✅ | Resumed the Paused Song');
    embed.setThumbnail(client.user.displayAvatarURL());
    return message.channel.send(embed);
  }
  embed.setDescription('There is nothing paused that i can resume');
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'resume',
  category: 'Music',
  description: 'It plays the song currently paused.',
  usage: 'resume',
};
