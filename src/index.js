const {promisify} = require('util');
const readdir = promisify(require('fs').readdir);
const ApaceClient = require('./libs/Bot.js');

const client = new ApaceClient();

client.config = require('./config.js');

;(async () => {
  const cmdFiles = await readdir('./src/commands');
  console.log(`Loading a total of ${cmdFiles.length} commands.`);
  for (const f of cmdFiles) {
    if (!f.endsWith('.js')) continue;
    const response = client.loadCommand(f);
    if (response !== undefined) console.log(response);
  }

  const evtFiles = await readdir('./src/events');
  console.log(`Loading a total of ${evtFiles.length} events.`);
  for (const f of evtFiles) {
    const eventName = f.split('.')[0];
    console.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${f}`);
    client.on(eventName, event.bind(null, client));
  }

  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.login(client.config.token);
})().catch(console.err);

process.on('SIGINT', async () => {
  console.log('aught interrupt signal');
  await client.points.close();
  await client.warns.close();
  await client.settings.close();
  await client.aliases;
  await client.destroy();
  process.exit(0);
});
