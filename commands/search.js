const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

var search = require('youtube-search');
const { data } = require('./leaderboard');

var opts = {
    maxResults: 10,
    key: process.env.YT_KEY
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search Youtube')
        .addStringOption(option =>
            option.setName('video')
                .setDescription('Video to search on YouTube')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {

            var video = interaction.options.getString('video');
            var video = encodeURIComponent(video);
            console.log(video)
            search(video, opts, function (err, results) {

               console.log(results.length);

                const youtubeEmbed = new MessageEmbed()
                youtubeEmbed.setColor('#0099ff')
                youtubeEmbed.setTitle(`First 10 results for ${search}`);

                for (i = 0; i < results.length; i++) {

                    youtubeEmbed.addField(`${i + 1}.) ${results[i].title}`)

                }

                interaction.reply({ embeds: [ youtubeEmbed ] })


            });
        } catch (err) {
            console.error(err.message);
        }


        //await interaction.reply('Pong!');
    },
};