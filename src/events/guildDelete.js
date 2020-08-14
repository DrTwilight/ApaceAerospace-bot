module.exports = (client, guild) => {
  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }
}