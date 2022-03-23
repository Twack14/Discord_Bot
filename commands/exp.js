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

                    if (response.data.length === 0) {
                        return interaction.reply('You are not registered in the database! Use `/register` to start earning XP! ')
                    }
                    const json = response.data[0];
                    var points = nwc.numberWithCommas(json.exp_points);
                    var level = json.current_level;
                    var nextLevel = level + 1;
                    var currentPoints = json.exp_points


                    var pointsForLevelUp = ((nextLevel / 0.1) * (nextLevel / 0.1))

                    var pointsNeeded = pointsForLevelUp - currentPoints;
                    console.log(pointsForLevelUp);

                    var percentProgress = Math.floor((currentPoints / pointsForLevelUp) * 100)
                    console.log(percentProgress);

                    var avgXpPerMsg = 20;
                    var estNumOfMsgs = Math.ceil((pointsNeeded / 20))

                    //console.log(points)

                    const expEmbed = new MessageEmbed()
                    expEmbed.setColor('#0099ff');
                    expEmbed.setTitle(`:bar_chart: ${interaction.user.tag}'s Stats`);
                    expEmbed.addField(`Current Level`, `${level}`, true);
                    expEmbed.addField(`Current XP`, `${points}xp`, true);
                    expEmbed.addField(`XP to next lvl`, `${nwc.numberWithCommas(pointsNeeded)}xp`);
                    expEmbed.addField(`% to next lvl`, `${percentProgress}%`, true);
                    expEmbed.addField(`Est. # of Messages Until Next lvl`, `${estNumOfMsgs}`);
                    expEmbed.setFooter({ text: 'Bot Created by Taylor Womack', iconURL: 'https://i.imgur.com/o95RO6a.jpg' })

                    interaction.reply({ embeds: [expEmbed] });
                })
        } catch (err) {
            return interaction.reply('You are not registered in the database. Use the **/register** command to register yourself in the database to start earning points!')
        }
    },
};