const { Command } = require('discord.js-commando');
const { MessageEmbed } = require("discord.js")

module.exports = class ResumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'resume',
			group: 'music',
			memberName: 'resume',
			description: 'Resume the Cureent Playing Song',
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
         if(serverQueue && !serverQueue.playing) {
              serverQueue.playing = true;
              serverQueue.connection.dispatcher.resume()
          embed.setAuthor("✅ | Resumed the Paused Song")
           embed.setThumbnail(this.client.user.displayAvatarURL())
          return message.channel.send(embed)
         }
            embed.setDescription("There is nothing paused that i can resume")
            message.channel.send(embed)
    }
};