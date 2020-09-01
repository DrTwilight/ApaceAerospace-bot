const {MessageEmbed} =  require("discord.js")
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    let mod = message.author;
    let user = message.mentions.members.first();
    let reason = await client.awaitReply(message, "What is your reasoning");
    const settings = message.settings;
    let mod_log = message.guild.channels.cache.find(ch => ch.name === settings["modLogChannel"]);
    let key = `${message.guild.id}-${user.id}`;
    client.warns.ensure(key, 0);
    client.warns.inc(key);
    let totalWarns = client.warns.get(key);
    console.log(totalWarns);
    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Warned ${user.id}`)
    .setImage(user.iconURL)
    .setDescription(`<@${user.id}> has been warned by ${mod} `)
    .addField("Reason", `${reason}`)
    message.channel.send(`<@${user.id}> has been warned`)
    switch (totalWarns) {
        case 1: user.send(`You have been warned for \`\`\`${reason}\`\`\``); mod_log.send(embed); break;
        case 2: user.send(`You have been warned for \`\`\`${reason}\`\`\` next time you are getting banned!`); mod_log.send(embed); break;
        case 3: user.send(`You have been warned for \`\`\`${reason}\`\`\` and are now getting banned!`); user.ban({reason: reason}); mod_log.send(`${user} has been banned by ${mod.tag} because: ${reason}`); client.warns.delete(key); break;
        case 4: client.warns.delete(key);
    }
}
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: "warn",
    category: "Moderation",
    description: "Warns a naughty user.",
    usage: "warn <user>"
  };