const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { default: axios } = require('axios');
const fullUrl = process.env.RIOT_URL

const APIKey = process.env.RG_API_KEY

module.exports = {
	data: new SlashCommandBuilder()
		.setName('valorant')
		.setDescription('Replies with Valorant Data'),
	async execute(interaction) {

        axios.get(fullUrl , {headers: { "X-Riot-Token" : APIKey }})
            .then(function (response) {
                const json = response.data.players
                console.log(json);

                const valLeaderEmbed = new MessageEmbed()
                valLeaderEmbed.setColor('#0099ff')
                valLeaderEmbed.setTitle(':trophy: Top 10 Valorant Players for Act 1 :trophy:')

                for (i = 0; i < json.length; i++) {

                    var playerName = `${json[i].gameName}` + `#` +`${json[i].tagLine}`

                    valLeaderEmbed.addField(`${i + 1}.) ${playerName}`, `Rank: ${json[i].leaderboardRank} - Rating: ${json[i].rankedRating} - Wins: ${json[i].numberOfWins}`);
                }
                interaction.reply({ embeds: [ valLeaderEmbed ] });
            })
	},
};