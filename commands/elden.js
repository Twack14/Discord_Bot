const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')
const url = 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('elden')
		.setDescription('Just give it a shot'),
	async execute(interaction) {

        axios.get('https://eldenring.fanapis.com/api/npcs')
        .then(function (response) {
            const json = response.data.data 
            console.log(json)
            console.log(json.length)
        })
        await interaction.reply("test");
	},
};