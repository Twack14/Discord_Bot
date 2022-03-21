const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')

const cat = 'https://aws.random.cat/meow'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomcat')
        .setDescription('Replies with a random cat!'),
    async execute(interaction) {

        axios.get(cat)
            .then(function (response) {
                // handle success
                var reply = response.data;
                console.log(reply);
                interaction.reply(reply.file);
            })

    },
};