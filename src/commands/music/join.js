const { Command } = require('discord.js-commando');

module.exports = class JoinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'join',
			group: 'music',
			memberName: 'join',
			description: 'Joins teh voice hcannel u are in currently',
		});
    }
    async run(message) {
        if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
			message.reply("Joined.")
		}
    }
};