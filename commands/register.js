const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('pg');
const clientObject = require('../db_objects/client')
var uniqid = require('uniqid');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Registers yourself to the database to enable xp rewards'),
    async execute(interaction) {
        console.log(interaction.user.tag)
        const client = new Client(clientObject.client)
        //await interaction.reply('Pong!');
        try {

            var id = uniqid();

            await client.connect()
            console.log('Connected successfully')

            try {

                var username = await client.query(`select user_name from discord_users WHERE user_name = $1`, [interaction.user.tag])

                //console.log(username);
                if (username.rowCount === 1) {
                    return interaction.reply('You are already registered in the database!')
                }

            } catch (err) {
                console.log(err)
            }

            try {
                await client.query('insert into discord_users(ID, user_name, exp_points, discord_id) values($1, $2, $3, $4)', [id, interaction.user.tag, 100, interaction.user.id])
                const results = await client.query('select * from discord_users where user_name = $1', [interaction.user.tag])
                console.log(results)
                return interaction.reply(`You were successfully registered to the database! You are now level **${results.rows[0].current_level}**`)

            } catch (err) {
                console.log(err)
                return interaction.reply('You were not registered to the database. Ask admin for details and to report the issue.')
            }

        }
        catch (err) {
            console.log(err)
        }
        finally {
            await client.end()
            console.log('Successfully disconnected')
        }
    },
};