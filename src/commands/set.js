/* eslint-disable max-len */
exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars
  // Retrieve current guild settings (merged) and overrides only.
  const settings = message.settings;
  const defaults = client.settings.get('default');
  const overrides = client.settings.get(message.guild.id);
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
  cosnt array = []
  // Edit an existing key value


  switch (action) {
    case 'edit':
      if (!key) return message.reply('Please specify a key to edit');
      if (!defaults[key]) return message.reply('This key does not exist in the settings');
      const joinedValue = value.join(' ');
      if (joinedValue.length < 1) return message.reply('Please specify a new value');
      // User must specify a different value than the current one.
      if (joinedValue === settings[key]) return message.reply('This setting already has that value!');

      // If the guild does not have any overrides, initialize it.
      if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

      // Modify the guild overrides directly.
      client.settings.set(message.guild.id, joinedValue, key);
      break;
    case 'del' || 'reset':
      if (!overrides[key]) return message.reply('This key does not have an override and is already using defaults.');

      // Good demonstration of the custom awaitReply method in `./modules/functions.js` !
      const response = await client.awaitReply(message, `Are you sure you want to reset ${key} to the default value?`);

      // If they respond with y or yes, continue.
      if (['y', 'yes'].includes(response.toLowerCase())) {
        // We delete the `key` here.
        client.settings.delete(message.guild.id, key);
        message.reply(`${key} was successfully reset to default.`);
      } else
      // If they respond with n or no, we inform them that the action has been cancelled.
      if (['n', 'no', 'cancel'].includes(response)) {
        message.reply(`Your setting for \`${key}\` remains at \`${settings[key]}\``);
      }
      break;
    case 'get':
      const isDefault = !overrides[key] ? '\nThis is the default global default value.' : '';
      message.reply(`The value of ${key} is currently ${settings[key]}${isDefault}`);
      break;
    case undefined:
      let array = [];
      Object.entries(settings).forEach(([key, value]) => {
        array.push(`${key}${' '.repeat(20 - key.length)}::  ${value}`);
      });
      await message.channel.send(`= Current Guild Settings =\n${array.join('\n')}`, {code: 'asciidoc'});
      break;
    case 'view':
      let array = [];
      Object.entries(settings).forEach(([key, value]) => {
        array.push(`${key}${' '.repeat(20 - key.length)}::  ${value}`);
      });
      await message.channel.send(`= Current Guild Settings =\n${array.join('\n')}`, {code: 'asciidoc'});
      break;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['setting', 'settings', 'conf'],
  permLevel: 'Administrator',
};

exports.help = {
  name: 'set',
  category: 'System',
  description: 'View or change settings for your server.',
  usage: 'set <view/get/edit> <key> <value>',
};
