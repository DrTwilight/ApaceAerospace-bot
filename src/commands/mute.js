/* eslint-disable max-len */
const ms = require('ms');
exports.run = async (client, message, args, level) => {
  const tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!tomute) return message.reply('Couldn\'t find user.');
  if (tomute.hasPermission('MANAGE_MESSAGES')) return message.reply('Can\'t mute them!');
  let muterole = message.guild.roles.cache.find((role) => role.name === 'muted');
  // start of create role
  if (!muterole) {
    try {
      muterole = await message.guild.roles.create({
        data: {
          name: 'muted',
          color: '#000000',
        },
        reason: 'Needed to mute someone and the roles was not here -Apace',
      });
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  // end of create role
  const mutetime = args[1];
  if (!mutetime) return message.reply('You didn\'t specify a time!');

  await(tomute.roles.add(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function() {
    tomute.roles.remove(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator',
};

exports.help = {
  name: 'mute',
  category: 'Moderation',
  description: 'Mutes a user.',
  usage: 'mute <user>',
};
