const { MessageEmbed } = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class VolumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'volume',
			group: 'music',
			memberName: 'volume',
            description: 'Changes voluem of music.',
            args: [
                {
                     type: 'integer',
                     prompt: 'What volume would you like?',
                     key: 'volume',
                     validate: messages => {
                         if(messages) return true
                         return `Please Use Numerical Values Only`
                     }
                 }
             ],
		});
    }
    async run(message, { volume }) {
        let embed = new MessageEmbed();

    
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
    
    if(!volume) {
      embed.setAuthor(`The Current Volume is ${serverQueue.volume}`)
      return message.channel.send(embed)
    }
    
    if(volume > 200) {
      embed.setAuthor("You will die if you reach the limit of 200 :)")
      return message.channel.send(embed)
    }
    
    serverQueue.volume = volume
    serverQueue.connection.dispatcher.setVolumeLogarithmic(volume / 100)
    embed.setDescription(`Seted Volume to ${volume}`)
    embed.setThumbnail(this.client.user.displayAvatarURL())
    message.channel.send(embed)
    
  }
}