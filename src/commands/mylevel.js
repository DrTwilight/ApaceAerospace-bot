exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find((l) => l.level === level).name;
  console.log(friendly);
  message.reply(`Your permission level is: ${level} - ${friendly}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'mylevel',
  category: 'Miscellaneous',
  // eslint-disable-next-line max-len
  description: 'Tells you your permission level for the current message location.',
  usage: 'mylevel',
};
