const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  let ment
  if(message.mentions.users.first()) {
    ment = message.mentions.users.first()
  } else {
    ment = message.author
  }
		if(!ment) {
			message.channel.send('Please mention a user!')
		}
	// Creats an embed with information about the mentioned user
		let embed = new MessageEmbed()
		.addField("Username", ment.tag)
		.addField("ID", ment.id)
		.addField("Status", ment.presence.status)
		.addField("Created", ment.createdAt)
		.setThumbnail(ment.avatarURL)
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