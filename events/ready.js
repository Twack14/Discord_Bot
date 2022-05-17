module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		
		// const GUILDS = client.guilds.cache.map((guild) => guild);
		// const all_fetchCommands = await GUILDS[0].commands.fetch();

		// //get the information for the remove user command
		// const removeUserCommand = all_fetchCommands.find(command => command.name === 'removefromdb')
		// const removeCmdID = removeUserCommand.permissions.commandId;

		// //get the information for the give command
		// const giveCommand = all_fetchCommands.find(command => command.name === 'give')
		// const giveCmdID = giveCommand.permissions.commandId;

		// const fullPermissions = [
		// 	{
		// 		id: removeCmdID,
		// 		permissions: [
		// 			{
		// 				id: '668690950335365141',
		// 				type: 'USER',
		// 				permission: true,
		// 			},
		// 		]
		// 	},
		// 	{
		// 		id: giveCmdID,
		// 		permissions: [
		// 			{
		// 				id: '831311012044996659',
		// 				type: 'ROLE',
		// 				permission: true,
		// 			},
		// 			{
		// 				id: '668690950335365141',
		// 				type: 'USER',
		// 				permission: true,
		// 			}

		// 		]
		// 	},
		// ];

		// await GUILDS[0].commands.permissions.set({ fullPermissions });

	},
};