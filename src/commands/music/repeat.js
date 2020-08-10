const { Command } = require('discord.js-commando');
const { MessageEmbed } = require("discord.js")

module.exports = class RepeatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'repeat',
			group: 'music',
			memberName: 'repeat',
			description: 'Loop Your Queue and have fun.',
		});
    }
    async run(message) {
        let embed = new MessageEmbed()
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
    embed.setThumbnail(this.client.user.displayAvatarURL())
    message.channel.send(embed)
    }
};