const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const baseUrl = "http://localhost:3000/users/"
module.exports = {
	data: new SlashCommandBuilder()
		.setName('removefromdb')
		.setDescription('Remove user from DB (Server Owner Only)')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Choose user to remove from database')
				.setRequired(true)
		)
		.setDefaultPermission(false),
	async execute(interaction) {
		var userId = interaction.options.getUser('user')
		id = userId.tag
		id = encodeURIComponent(id);
		console.log(id);

		//interaction.reply('test');
		var fullUrl = baseUrl + `${id}`
		console.log(fullUrl);
		try {
			axios.delete(fullUrl)
				.then(function (response) {
					console.log(response)
					interaction.reply(`User ${userId} was removed from the database.`)
				})
		} catch (err) {
			//console.log(err);
			interaction.reply('An error occured!')
		}

	},
};