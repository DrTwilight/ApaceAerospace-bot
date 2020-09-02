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
    embed.setAuthor('There is nothing in the queue');
    return message.channel.send(embed);
  }

  embed.setDescription(
      `${serverQueue.songs
          .map((song, index) => index + 1 + '. ' + song.title)
          .join('\n\n')}`,
      {split: true},
  );
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
  name: 'queue',
  category: 'Music',
  description: 'It shows u every song in the queue of songs to be played.',
  usage: 'queue',
};
