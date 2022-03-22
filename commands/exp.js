const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const baseUrl = "http://localhost:3000/users/"
const nwc = require('../helpful_functions/numbersWithCommas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('exp')
        .setDescription('Replies with your xp points and current level in the server'),
    async execute(interaction) {

        var id = interaction.user.tag
        id = encodeURIComponent(id);

        var fullUrl = baseUrl + `${id}`
        try {
            axios.get(fullUrl)
                .then(function (response) {

                    const json = response.data[0];
                    var points = nwc.numberWithCommas(json.exp_points);
                    var level = json.current_level;

                    //console.log(points)

                    const expEmbed = new MessageEmbed()
                    expEmbed.setColor('#0099ff');
                    expEmbed.setTitle(`:bar_chart: ${interaction.user.tag}'s Stats`);
                    expEmbed.addField(`Current Level`, `${level}`);
                    expEmbed.addField(`Current XP:`, `${points}xp`);

                    interaction.reply({ embeds: [ expEmbed ] });
                })
        } catch (err) {
            return interaction.reply('You are not registered in the database. Use the **/register** command to register yourself in the database to start earning points!')
        }
	},
};