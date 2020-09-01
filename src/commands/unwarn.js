exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    let mod = message.author;
    let user = message.mentions.members.first();
    let totalWarns = await client.awaitReply(message, "How many warning would you like to remove");
    const settings = message.settings;
    let mod_log = message.guild.channels.cache.find(ch => ch.name === settings["modLogChannel"]);
    client.warns.math(`${message.guild.id}-${user.id}`, "-", totalWarns);
    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Unwarned ${user}`)
    .setDescription(`<@${user.id}> has had ${totalWarns} removed by ${mod} `)
    .addField("Reason", `${reason}`);
    mod_log.send(embed);
}
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: "unwarn",
    category: "Moderation",
    description: "Unwarns a naughty user.",
    usage: "warn <user> <num>"
  };