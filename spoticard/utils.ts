import { Card } from './game';

export function generateRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffleArray(array: Array<any>){
    // Knuth Shuffle
    // https://github.com/Daplie/knuth-shuffle/blob/master/index.js

    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = generateRandomInteger(0, currentIndex - 1);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export function createCardEmbed(card: Card, index: number) {
    const minutes = Math.floor(card.duration / 60);
    const seconds = Math.round(card.duration - minutes * 60);
    let leadingZero = '';

    if (seconds.toString().length === 1) {
        leadingZero = '0';
    }

    const embed = {
        title: card.name,
        description: `${card.artist}\n${card.album}`,
        thumbnail: {
            url: card.imageUrl,
        },
        fields: [
            {
                name: 'Popularidade',
                value: card.popularity,
                inline: true,
            },
            {
                name: 'Danceabilidade',
                value: card.danceability,
                inline: true,
            },
            {
                name: 'Sonoridade',
                value: card.loudness,
                inline: true,
            },
            {
                name: 'Proporção de fala',
                value: card.speechiness,
                inline: true,
            },
            {
                name: 'Acústica',
                value: card.acousticness,
                inline: true,
            },
            {
                name: 'Instrumentalidade',
                value: card.instrumentalness,
                inline: true,
            },
            {
                name: 'Vivacidade',
                value: card.liveness,
                inline: true,
            },
            {
                name: 'Valência',
                value: card.valence,
                inline: true,
            },
            {
                name: 'Tempo (BPM)',
                value: card.tempo,
                inline: true,
            },
            {
                name: 'Duração',
                value: `${minutes}:${leadingZero}${seconds} (${card.duration}s)`,
                inline: true,
            }
        ],
        footer: {
            text: `Card nº ${index} do deck`
        }
    };
    return embed;
}