const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
var axios = require('axios')
var { exampleEmbed } = require('../embeds/wzEmbed')

const { login } = require('call-of-duty-api');
login(process.env.SSO_TOKEN);

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