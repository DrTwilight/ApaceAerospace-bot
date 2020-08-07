const { Command } = require('discord.js-commando');

module.exports = class KickCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'mods',
			memberName: 'kick',
            description: 'Kicks a guild member',
            userPermissions: ["KICK_MEMBERS"],
		});
    }
    run(message, [mention, ...reason]) {
        if (message.mentions.members.size === 0)
          return message.reply("Please mention a user to kick");
      
        if (!message.guild.me.hasPermission("KICK_MEMBERS"))
          return message.reply("");
      
        const kickMember = message.mentions.members.first();
      
        kickMember.kick(reason.join(" ")).then(member => {
          message.reply(`${member.user.username} was succesfully kicked.`);
        });
    }
};
