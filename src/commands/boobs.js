/* eslint-disable max-len */
const snekfetch = require('snekfetch');
const Discord = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!message.channel.nsfw) return message.channel.send('This command can not be used here, go to a NSFW channel instead.');
  const id = [Math.floor(Math.random() * 10930)];
  const res = await snekfetch.get(`http://api.oboobs.ru/boobs/${id}`);
  const preview = res.body[0]['PREVIEW'.toLowerCase()];
  const image = `http://media.oboobs.ru/${preview}`;

  const embed = new Discord.MessageEmbed()
      .setFooter('http://oboobs.ru/')
      .setImage(image)
      .setColor('#CEA0A6');
  return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'boobs',
  category: 'NSFW',
  description: 'Gives you boobs.',
  usage: 'boobs',
};
