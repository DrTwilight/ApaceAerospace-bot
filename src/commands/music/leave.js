const { Command } = require('discord.js-commando');
const { MessageEmbed } = require("discord.js")

module.exports = class LeaveCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'leave',
			group: 'music',
			memberName: 'leave',
			description: 'leaves Voice channel.',
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
			  embed.setAuthor("There is nothing playing that i could stop")
			  return message.channel.send(embed);
			}
		
			serverQueue.songs = [];
			serverQueue.connection.dispatcher.end();
    }
};