/* eslint-disable max-len */
const {MessageEmbed} = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Server Info')
      .setImage(message.guild.iconURL)
      .setDescription(`${message.guild}'s information`)
      .addField('Owner', `The owner of this server is ${message.guild.owner}`)
      .addField('Member Count', `This server has ${message.guild.memberCount} members`)
      .addField('Emoji Count', `This server has ${message.guild.emojis.cache.size} emojis`)
      .addField('Roles Count', `This server has ${message.guild.roles.cache.size} roles`);


  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'serverinfo',
  category: 'Miscellaneous',
  description: 'Shows u satistics abotu the server you are in.',
  usage: 'serverinfo',
};
