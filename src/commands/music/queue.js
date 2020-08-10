const { MessageEmbed } = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class QueueCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'queue',
			group: 'music',
			memberName: 'queue',
			description: 'Shows what is in the queue.',
		});
    }
    async run(message) {
        let embed = new MessageEmbed();
        const { channel } = message.member.voice;
    
        if (!channel) {
          //IF AUTHOR IS NOT IN VOICE CHANNEL
          embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/");
          return message.channel.send(embed);
        }
    
        const serverQueue = message.client.queue.get(message.guild.id);
    
        if (!serverQueue) {
          embed.setAuthor("There is nothing in the queue");
          return message.channel.send(embed);
        }
    
        embed.setDescription(
          `${serverQueue.songs
            .map((song, index) => index + 1 + ". " + song.title)
            .join("\n\n")}`,
          { split: true }
        );
        embed.setThumbnail(this.client.user.displayAvatarURL())
        
        message.channel.send(embed);
      }
    };