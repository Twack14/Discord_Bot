const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
var axios = require('axios')
var { exampleEmbed } = require('../embeds/wzEmbed')

const { login } = require('call-of-duty-api');
login('MTE4OTE4NjU0OTYwMTQzODcyNjU6MTY0OTI4MDU3NDU2NzpkMjM4Mjk0MTM4ZWI3YTIxNjY2NDdkOTc1ZjNlODIyNA');

const { platforms } = require('call-of-duty-api');
const { Warzone } = require('call-of-duty-api');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wz')
        .setDescription('Retrieve your Warzone Stats')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('You Warzone username. Ex: User1234')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('platform')
                .setDescription('The platform you play on (psn = playstation, xbl = xbox, battle = battle.net, steam = steam)')
                .setRequired(true)
        ),
    async execute(interaction) {

        var username = interaction.options.getString('username')
        username1 = encodeURIComponent(username);
        const platform = interaction.options.getString('platform')

        if ((platform !== 'psn') && (platform !== 'xbl') && (platform !== 'battle') && (platform !== 'steam')) {
           return interaction.reply('You must use one of the specified platforms:\npsn\nxbl\nbattle\nsteam')
        }

        try {
            let data = await Warzone.fullData(username1, platform)
            const output = data.data.lifetime.mode.br.properties
            fillFields(username, output.wins, output.kills, output.deaths, output.downs, output.kdRatio, output.topTwentyFive, output.topTen, output.topFive, output.gamesPlayed);

            interaction.reply({ embeds: [ exampleEmbed ] })
        } catch (err) {
            console.log(err)
            interaction.reply('failed');
        }

        // var options = {
        //     method: 'GET',
        //     url: `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${username1}/${platform}`,
        //     headers: {
        //       'X-RapidAPI-Host': 'call-of-duty-modern-warfare.p.rapidapi.com',
        //       'X-RapidAPI-Key': '249114ebcemshb05d81fd2b40f99p1b51a4jsn1e8b7283c612'
        //     }
        //   };

        //   axios.request(options).then(function (response) {
        //     const output = response.data;

        //     try {
        //     fillFields(username, output.br.wins, output.br.kills, output.br.deaths, output.br.downs, output.br.kdRatio, output.br.topTwentyFive, output.br.topTen, output.br.topFive, output.br.gamesPlayed);
        //     //interaction.reply(`test`);
        //     interaction.reply({ embeds: [ exampleEmbed ] });
        //     } catch (err) {
        //         console.log(err);
        //         interaction.reply(`Could not find data for ${username}`);
        //     }
        // }).catch(function (error) {
        //     console.error(error);
        // });

        

        
    },
};

fillFields = (user, wins, kills, deaths, dwns, kdRat, topTf, topTen, topFv, amtPlayed) => {
    let KDR = kdRat;
    KDR = KDR.toFixed(2);
    kpg = kills / amtPlayed;
    kpg = kpg.toFixed(2);
    exampleEmbed.title = `Warzone stats for ${user}`;
    exampleEmbed.fields[0].value = `${wins}`;
    exampleEmbed.fields[1].value = `${kills}`;
    exampleEmbed.fields[2].value = `${deaths}`;
    exampleEmbed.fields[3].value = `${dwns}`;
    exampleEmbed.fields[4].value = `${KDR}`;
    exampleEmbed.fields[5].value = `${topTf}`;
    exampleEmbed.fields[6].value = `${topTen}`;
    exampleEmbed.fields[7].value = `${topFv}`;
    exampleEmbed.fields[8].value = `${amtPlayed}`;
    exampleEmbed.fields[9].value = `${kpg}`;
}