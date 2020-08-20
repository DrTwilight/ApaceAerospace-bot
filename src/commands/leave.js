const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args, level) => {
    let embed = new MessageEmbed()
				
			const { channel } = message.member.voice;
			  
			if (!channel) {
			  //IF AUTHOR IS NOT IN VOICE CHANNEL
			  embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/")
			  return message.channel.send(embed);
			}
		
			const serverQueue = message.client.queue.get(message.guild.id);
		
			if (!serverQueue) {
			  embed.setAuthor("There is nothing playing that i could stop")
			  return message.channel.send(embed);
			}
		
			serverQueue.songs = [];
			serverQueue.connection.dispatcher.end();
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "leave",
    category: "Music",
    description: "Makes music work next time u wanna use it.",
    usage: "leave"
  };