const { Command } = require('discord.js-commando');
const { MessageEmbed } = require("discord.js")

module.exports = class NpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'np',
			group: 'music',
			memberName: 'np',
			description: 'Get the name of current playing song',
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
      embed.setAuthor("Bot is not playing anything")
      return message.channel.send(embed);
    }
    
    embed.setDescription(`**NOW PLAYING** - ${serverQueue.songs[0].title}`)
    .setThumbnail(serverQueue.songs[0].thumbnail)
    message.channel.send(embed)
    }
};