const { SlashCommandBuilder, channelMention } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const axios = require('axios');
const { numberWithCommas } = require('../helpful_functions/numbersWithCommas');
const baseUrl = "http://localhost:3000"
const fullUrl = baseUrl + '/top10'
const nwc = require('../helpful_functions/numbersWithCommas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Show the top 10 points earners on the server'),
    async execute(interaction) {

        axios.get(fullUrl)
            .then(function (response) {
                // handle success
                const json = response.data;
                
                const leaderEmbed = new MessageEmbed()
                leaderEmbed.setColor('#0099ff')
                leaderEmbed.setTitle(':trophy: Our Top 10 Points Leaders! :trophy:')

                for (i = 0; i < json.length; i++) {
                    leaderEmbed.addField(`${i + 1}.) ${json[i].user_name}`, `lvl. ${json[i].current_level} - ${nwc.numberWithCommas(json[i].exp_points)}xp`);
                }

                interaction.reply({ embeds: [ leaderEmbed ] });
            })

    },

   
};

