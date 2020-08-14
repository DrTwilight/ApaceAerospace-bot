const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args, level) => {
    let embed = new MessageEmbed();
        
        const { channel } = message.member.voice;
        if (!channel) {
          //IF AUTHOR IS NOT IN VOICE CHANNEL
          embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/")
          return message.channel.send(embed);
        }
    
        const serverQueue = message.client.queue.get(message.guild.id);
    
        if (!serverQueue) {
          embed.setAuthor("There is nothing playing that i could loop")
          return message.channel.send(embed);
        }
        
        //OOOOF
        serverQueue.loop = !serverQueue.loop
        
        
        embed.setDescription(`Loop is now **${serverQueue.loop ? "Enabled" : "Disabled"}**`)
        embed.setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed)
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["repeat"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "loop",
    category: "Music",
    description: "It enables/disables repeat",
    usage: "loop"
  };