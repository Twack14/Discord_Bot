//const { Client } = require('pg');
const clientObject = require('../db_objects/client');
const axios = require('axios');
const baseUrl = 'http://localhost:3000'
const random = require('random');
const { Client, Collection, Intents } = require('discord.js');
const { levelUp } = require('../embeds/levelUp');


async function updatePointsLevelUp(tag) {
    var randExp = random.int(15, 25);
    var tag = encodeURIComponent(tag);
    var fullUrl = baseUrl + `/users/${tag}`
    
    axios.get(fullUrl)
    .then(function (response) {
        console.log(response);
    })
}

module.exports = {
    updatePointsLevelUp
}