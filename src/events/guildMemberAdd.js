/* eslint-disable max-len */
module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getSettings(member.guild);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== 'true') return;

  const replacements = [
    [new RegExp('{{user}}', 'g'), `<@${member.user.id}>`],
    [new RegExp('{{server}}', 'g'), member.guild.name],
  ];
  // Replace the placeholders in the welcome message with actual data
  // const welcomeMessage = settings.welcomeMessage.replace(, `<@${member.user.id}>`);
  const welcomeMessage = replaceAll(settings.welcomeMessage, replacements);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.cache.find((c) => c.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};

const replaceAll = (str, map) => {
  // eslint-disable-next-line guard-for-in
  for (const replace of map) {
    str = str.replace(replace[0], replace[1]);
  }
  return str;
};
