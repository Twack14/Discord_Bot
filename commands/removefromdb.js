const { SlashCommandBuilder } = require('@discordjs/builders');

const permissions = [
	{
		id: '668690950335365141',
		type: 'USER',
		permission: true,
	},
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removefromdb')
		.setDescription('Remove user from DB (Server Owner Only)')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Choose user to remove from database')
		)
		.setDefaultPermission(false),
	async execute(interaction) {
		//remove user from database code
	},
};