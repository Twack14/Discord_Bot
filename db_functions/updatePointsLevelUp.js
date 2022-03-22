const clientObject = require('../db_objects/client');
const axios = require('axios');
const baseUrl = 'http://localhost:3000'
const random = require('random');
const { Client, Collection, Intents } = require('discord.js');
const { levelUp } = require('../embeds/levelUp');


async function updatePointsLevelUp(tag, message) {
    //set up variables to access db API and update points.
    var randExp = random.int(15, 25);
    var tag = encodeURIComponent(tag);
    var fullUrl = baseUrl + `/users/${tag}`

    axios.get(fullUrl)
        .then(function (response) {
            const json = response.data

            if (json.length === 0) {
                return console.log(`${tag} does not exist in the database.`)
            }

            var currentLevel = json[0].current_level;
            var currentPoints = json[0].exp_points;
            var username = json[0].discord_id;

            var newPoints = currentPoints + randExp;

            var newLevel = Math.floor(0.1 * Math.sqrt(newPoints));

            console.log(`\nPoints before update: ${currentPoints}`);

            axios.put(fullUrl, `exp_points=${newPoints}`)

            console.log(`Points after update ${newPoints}`)
            console.log(`Points earned for message: ${newPoints - currentPoints}`);

            levelUp.title = `Level Up!`
            levelUp.fields[0].value = `<@${username}>`
            levelUp.fields[1].value = `**${newLevel}**`
            levelUp.fields[2].value = `${newPoints}`

            if (newLevel > currentLevel) {
                return message.reply({ embeds: [ levelUp ] });
            }

        })
}

module.exports = {
    updatePointsLevelUp
}