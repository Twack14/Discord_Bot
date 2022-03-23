var exampleEmbed = {
    color: 0x0099ff,
    title: 'title here',
    author: {
        name: 'Warzone Stats Retriever',
        icon_url: 'https://i.imgur.com/yDpdvSh.jpg',
        url: 'https://github.com/Twack14/Discord-Bot',
    },
    thumbnail: {
        url: 'https://i.imgur.com/yDpdvSh.jpg',
    },
    fields: [
        {
            name: 'Total Wins',
            value: 0,
        },
        {
            name: 'Total Kills',
            value: 0,
            inline: true,
        },
        {
            name: 'Total Deaths',
            value: 0,
            inline: true,
        },
        {
            name: 'Total Downs',
            value: 0,
            inline: true,
        },
        {
            name: 'K/D Ratio',
            value: 0,
            inline: true,
        },
        {
            name: 'Top 25',
            value: 0,
            inline: true,
        },
        {
            name: 'Top 10',
            value: 0,
            inline: true,
        },
        {
            name: 'Top 5',
            value: 0,
            inline: true,
        },
        {
            name: 'Games Played',
            value: 0,
            inline: true,
        },
        {
            name: 'Avg Kills per Game',
            value: 0,
            inline: true,
        },
        {
            name: '\u200b',
            value: '\u200b',
            inline: false,
        }
    ],
    /*image: {
        url: 'https://i.imgur.com/yDpdvSh.jpg',
    },*/
    timestamp: new Date(),
    footer: {
        text: 'Bot Created by Taylor Womack',
        icon_url: 'https://i.imgur.com/o95RO6a.jpg',
    },
}

module.exports = {
    exampleEmbed
}