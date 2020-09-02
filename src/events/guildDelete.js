module.exports = (client, guild) => {
  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
};
