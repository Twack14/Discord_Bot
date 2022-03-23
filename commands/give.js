const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const baseUrl = "http://localhost:3000/users/"
const dbf = require('../db_functions/updatePointsLevelUp')
const { levelUp } = require('../embeds/levelUp')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('give')
        .setDescription('Give specified user up to 1,000xp (Mods only)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to give XP')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('points')
                .setDescription('Number of points to give user')
                .setRequired(true)
        )
        .setDefaultPermission(false),
    async execute(interaction) {



        try {
            var user = interaction.options.getUser('user');
            user = user.tag
            user = encodeURIComponent(user);
            var fullUrl = baseUrl + `${user}`

            const pointsToAdd = interaction.options.getInteger('points')

            if (pointsToAdd < 0) {
                return interaction.reply('You can only gift a positive amount of points!')
            }
            if (pointsToAdd > 1000) {
                return interaction.reply(`You can only gift up to 1,000 points!`)
            }

            axios.get(fullUrl)
                .then(function (response) {
                    if (response.data.length === 0) {
                        return interaction.reply('That user is not registered in the database! They need to use `/register` to start earning XP!')
                    }

                    const json = response.data
                    console.log(json);

                    var currentPoints = json[0].exp_points
                    var currentLevel = json[0].current_level
                    var username = json[0].discord_id

                    var newPoints = currentPoints + pointsToAdd
                    var newLevel = Math.floor(0.1 * Math.sqrt(newPoints));

                    axios.put(fullUrl, `exp_points=${newPoints}`);

                    levelUp.title = `Level Up!`
                    levelUp.fields[0].value = `<@${username}>`
                    levelUp.fields[1].value = `**${newLevel}**`
                    levelUp.fields[2].value = `${newPoints}`

                    if (newLevel > currentLevel) {
                       return interaction.reply({ content: `<@${username}> has received **${pointsToAdd}**xp!\n`, embeds: [ levelUp ] });          
                    } else {
                        return interaction.reply(`<@${username}> has received **${pointsToAdd}**xp!`);
                    }
                })

        } catch (err) {
            console.log(err);
            return interaction.reply('There was an error running this command')
        }
    },
};