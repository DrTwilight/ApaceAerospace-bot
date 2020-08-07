const { CommandoClient } =  require("discord.js-commando");
const { token, prefix, owners, invite } =  require('./Config.json');
const path = require("path")
const client = new CommandoClient({
    commandPrefix: prefix,
    owner: owners,
	invite: invite,
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['public', 'Commands everyone can use'],
        ['mods', 'Commands for moderation'],
		['fun', 'Commands that are here for only fun'],
		['music', 'Commands related to music'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on("guildMemberAdd", (member) => {
	const role = message.guild.roles.find(r => r.name === "member");
	member.roles.add(role)
});

client.login(token)