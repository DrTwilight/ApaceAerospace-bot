/* eslint-disable max-len */
exports.run = async (client, message, args, _level) => { // eslint-disable-line no-unused-vars
  const code = args.join(' ');
  try {
    const {VM} = require('vm2');
    const vm = new VM({
      timeout: 2500,
      sandbox: {},
    });
    const evaled = vm.run(code);
    const clean = await client.clean(client, evaled);
    message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err.message)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'eval',
  category: 'System',
  description: 'Evaluates arbitrary javascript.',
  usage: 'eval [...code]',
};
