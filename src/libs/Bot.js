const { Client, Message, Guild, Collection } = require('discord.js');
const Enmap = require('enmap');


module.exports = class ApaceClient extends Client {
	/**
	 * THIS IS HERE BECAUSE SOME PEOPLE DELETE ALL THE GUILD SETTINGS
	 * 
	 * And then they're stuck because the default settings are also gone.
	 * 
	 * So if you do that, you're resetting your defaults. Congrats.
	 */
	defaultSettings = {
		'prefix': '!',
		'modLogChannel': 'mod-log',
		'modRole': 'Moderator',
		'adminRole': 'Administrator',
		'systemNotice': 'true',
		'welcomeChannel': 'welcome',
		'welcomeMessage': 'Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D',
		'welcomeEnabled': 'false',
	}

	/**
	 * PERMISSION LEVEL FUNCTION
	 * 
	 * This is a very basic permission system for commands which uses "levels"
	 * "spaces" are intentionally left black so you can add them if you want.
	 * 
	 * NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
	 * command including the VERY DANGEROUS `eval` and `exec` commands!
	 * @param {Message} message Write a dsec here
   * @returns {string} returns the permlvl
	 */
	permlevel = message => {
		let permlvl = 0;

		const permOrder = this.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

		while (permOrder.length) {
			const currentLevel = permOrder.shift();
			if (message.guild && currentLevel.guildOnly) continue;
			if (currentLevel.check(message)) {
				permlvl = currentLevel.level;
				break;
			}
		}
		return permlvl;
	};

	/**
	 * GUILD SETTINGS FUNCTION
	 * 
	 * Merges the client defaults with the guild settings. Guild settings in enmap should only have *unique* overrides that are different from defaults.
	 * 
	 * This function merges the default settings (from config.defaultSettings) with any
	 * guild override you might have for particular guild. If no overrides are present,
	 * the default settings are used.
	 * @param {Guild} guild the server stuff
	 */
	getSettings = guild => {
		this.settings.ensure('default', this.defaultSettings);
		if (!guild) return this.settings.get('default');
		const guildConf = this.settings.get(guild.id) || {};
		return ({ ...this.settings.get('default'), ...guildConf });
    };

	/**
	*    SINGLE-LINE AWAITMESSAGE
  * A simple way to grab a single reply, from the user that initiated
  * the command. Useful to get "precisions" on certain things...
  * USAGE
  * const response = await client.awaitReply(msg, "Favorite Color?");
  * msg.reply(`Oh, I really love ${response} too!`);
	 * @param {Message} msg Lets bot send message
	 * @param {string} question Question to ask
	 * @param {number} limit How long to wait till it stops waiting for a reply
	 * @returns {string} returns what it collected from the yser
	 */
	awaitReply = async (msg, question, limit = 60000) => {
		const filter = (m) => m.author.id === msg.author.id;
		await msg.channel.send(question);
		const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
		return collected.first().content;
  };
 /**
 *  Removes everyone pings as well as token and makes code blocks escaped so they are shown more easily also resolves promises.
 * @param {string} text he supplied text to "Clean"
 * @returns {string} Text cleaned with no sensitive info leaked
 */
clean = async text => {
  if (text && text.constructor.name == 'Promise') text = await text;
  if (typeof text !== 'string') text = require('util').inspect(text, { depth: 1 });

  return text
  .replace(/`/g, '`' + String.fromCharCode(8203))
  .replace(/@/g, '@' + String.fromCharCode(8203))
  .replace(this.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0');
};
  /**
   * 
   * @param {string} commandName The name of the command to load
   */

  loadCommand = (commandName) => {
      console.log(`Loading Command: ${commandName}`);
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      this.commands.set(props.help.name, props);
      props.conf.aliases.forEach((alias) => {
        this.aliases.set(alias, props.help.name);
      });
      //return false;

  };
  /**
   * 
   * @param {string} commandName the name of the command to unload
   */
  unloadCommand = async (commandName) => {
    let command;
    if (this.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod = require.cache[require.resolve(`../commands/${command.help.name}`)];
    delete require.cache[require.resolve(`../commands/${command.help.name}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    // return false;
  };

  wait = require('util').promisify(setTimeout);
  points = new Enmap({name: 'points'});
  warns = new Enmap({name: 'warns'});
  settings = new Enmap({name: 'settings'});
  queue = new Collection();
  vote = new Collection();
  commands = new Collection();
  aliases = new Collection();
}