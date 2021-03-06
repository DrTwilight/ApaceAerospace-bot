/* eslint-disable max-len */
exports.run = async (client, message, args) => {
  const member = message.mentions.members.first();
  if (!member) {
    return message.reply('Please mention a valid member of this server');
  }
  if (!member.bannable) {
    return message.reply('I cannot ban this user! Do they have a higher role? Do I have ban permissions?');
  }

  let reason = args.slice(1).join(' ');
  if (!reason) reason = 'No reason provided';

  await member.ban({reason: reason})
      .catch((error) => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
  message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator',
};

exports.help = {
  name: 'ban',
  category: 'Moderation',
  description: 'It zaps a person off the channel forever.',
  usage: 'ban <user>',
};
