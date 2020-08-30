const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  let mention
  if(message.mentions.users.first()) {
    mention = message.mentions.users.first()
  } else {
    mention = message.author
  }
		if(!mention) {
			message.channel.send('Please mention a user!')
		}
	// Creates an embed with information about the mentioned user
		let embed = new MessageEmbed()
		.addField("Username", mention.tag)
		.addField("ID", mention.id)
		.addField("Status", mention.presence.status)
		.addField("Created", mention.createdAt)
		.setThumbnail(mention.avatarURL)
		message.channel.send(embed)
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "userinfo",
    category: "Miscellaneous",
    description: "Shows you stuff about a person.",
    usage: "userinfo <mention user>"
  };