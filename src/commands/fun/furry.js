
const { Command } = require('discord.js-commando');

module.exports = class FurryCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'furry',
			group: 'fun',
			memberName: 'furry',
			description: 'Responds with a randomly generated fursona.',
		});
	}

	run(message) {
        const num = Math.floor(Math.random() * 100000);
		return message.say(`Fursona #${num}`, {
			files: [`https://thisfursonadoesnotexist.com/v2/jpgs/seed${num.toString().padStart(5, '0')}.jpg`]
		});
	}
};