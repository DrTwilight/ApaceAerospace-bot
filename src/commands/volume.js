const {MessageEmbed} = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    // eslint-disable-next-line max-len
    return message.channel.send('You are not allowed to change the volume of the music');
  }


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

  if (!args[0]) {
    embed.setAuthor(`The Current Volume is ${serverQueue.volume}`);
    return message.channel.send(embed);
  }

  if (isNaN(args[0])) {
    embed.setAuthor('Please Use Numerical Values Only');
    return message.channel.send(embed);
  }

  if (args[0] > 200) {
    embed.setAuthor('You will die if you reach the limit of 200 :)');
    return message.channel.send(embed);
  }

  serverQueue.volume = args[0];
  serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
  embed.setDescription(`Seted Volume to ${args[0]}`);
  embed.setThumbnail(client.user.displayAvatarURL());
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'volume',
  category: 'Music',
  description: 'It changes the music volume.',
  usage: 'volume <number>',
};
