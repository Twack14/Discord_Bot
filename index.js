const dotenv = require('dotenv');
dotenv.config();

const fs = require('node:fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const update = require('./db_functions/updatePointsLevelUp')



// Create a new client instance
const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', async c => {	
	console.log(`Ready! Logged in as ${c.user.tag}`);

	const GUILDS = client.guilds.cache.map((guild) => guild);
	const all_fetchCommands = await GUILDS[0].commands.fetch();
	const removeUserCommand = all_fetchCommands.find(command => command.name === 'removefromdb')
	const removeCmdID = removeUserCommand.permissions.commandId;

	const fullPermissions = [
		{
			id: removeCmdID,
			permissions: [
				{
					id: '668690950335365141',
					type: 'USER',
					permission: true,
				},
			]
		}
	];

	await GUILDS[0].commands.permissions.set({ fullPermissions });

});


//trigger points update everytime a message is sent
client.on('messageCreate', async (message) => {
	if (message.author.bot) return;
	var tag = message.author.tag
	update.updatePointsLevelUp(tag, message);
})

client.on('interactionCreate', async interaction => {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

	
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);