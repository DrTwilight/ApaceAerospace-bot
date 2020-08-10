const { Command } = require('discord.js-commando');
const { MessageEmbed } = require("discord.js")

module.exports = class PauseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pause',
			group: 'music',
			memberName: 'pause',
			description: 'Pauses the song that is currently playing',
		});
    }
    async run(message) {
        const { channel } = message.member.voice;
        let embed = new MessageEmbed()     
         
         if (!channel) {
           //IF AUTHOR IS NOT IN VOICE CHANNEL
           embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/")
           return message.channel.send(embed);
         }
         
         
         const serverQueue = message.client.queue.get(message.guild.id);
     
         if (!serverQueue) {
           embed.setAuthor("There is nothing playing that i could pause")
           return message.channel.send(embed);
         }
         
         if(serverQueue && serverQueue.playing) {
           serverQueue.playing = false;
           serverQueue.connection.dispatcher.pause(true)
           
           embed.setDescription("✅ | Paused The Current Playing Song")
           embed.setThumbnail(this.client.user.displayAvatarURL())
           return message.channel.send(embed)
       }  
       }
};