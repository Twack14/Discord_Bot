const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')

const insult = 'https://insult.mattbas.org/api/insult.json'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('insult')
        .setDescription('Replies with an insult!')
        .addUserOption(option => option
            .setName('user')
            .setDescription('Select a user to insult')
            .setRequired(true)
        ),
    async execute(interaction) {

        axios.get(insult)
            .then(function (response) {
                // handle success
                var reply = response.data.insult;
                console.log(reply);
                var user = interaction.options.getUser('user')
                interaction.reply(`<@${user.id}>, ${reply}`);
            })

    },
};