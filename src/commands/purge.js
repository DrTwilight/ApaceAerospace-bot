/* eslint-disable max-len */
exports.run = async (client, message, args) => {
  const deleteCount = parseInt(args[0], 10);

  // Ooooh nice, combined conditions. <3
  if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
    return message.reply('Please provide a number between 2 and 100 for the number of messages to delete');
  }

  // So we get our messages, and delete them. Simple enough, right?
  const fetched = await message.channel.messages.fetch({limit: deleteCount});
  message.channel.bulkDelete(fetched)
      .catch((error) => message.reply(`Couldn't delete messages because of: ${error}`));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator',
};

exports.help = {
  name: 'purge',
  category: 'Moderation',
  description: 'It mass deletes messages.',
  usage: 'purge <num>',
};
