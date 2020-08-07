const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'leave',
			group: 'music',
			memberName: 'leave',
			description: 'Replies with a meow, kitty cat.',
		});
    }
    async run(message) {
        if (message.member.voice.channel) {
            const leave = await message.member.voice.channel.leave();
            message.reply("Left.")
		}
    }
};