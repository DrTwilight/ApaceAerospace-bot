const {MessageEmbed} = require('discord.js');

exports.run = async (client, message, args, level) => {
  const {channel} = message.member.voice;
  const embed = new MessageEmbed();

  if (!channel) {
    // IF AUTHOR IS NOT IN VOICE CHANNEL
    embed.setAuthor('YOU NEED TO BE IN VOICE CHANNEL :/');
    return message.channel.send(embed);
  }


  const serverQueue = message.client.queue.get(message.guild.id);

  if (!serverQueue) {
    embed.setAuthor('There is nothing playing that i could pause');
    return message.channel.send(embed);
  }

  if (serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause(true);

    embed.setDescription('✅ | Paused The Current Playing Song');
    embed.setThumbnail(client.user.displayAvatarURL());
    return message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'pause',
  category: 'Music',
  description: 'It pauses the song currently playing.',
  usage: 'pause',
};
