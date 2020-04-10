import { Card } from './spoticards/game';
import { User, Client } from 'discord.js';

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

export function createUsersList() {}

export function createTableCard() {}

export function createRoundData() {}

export function createWelcomeMessage(user: User) {
    return `**Oi! Desejamos boas vindas ao Spoticards!** \n Para criar um novo jogo, envie **.create** com as opções de jogo.
    \n Para ver estilos e opções de jogo, envie **.typehelp**.`;
}

export function getUserByTag(client) {

}

export function getSpotifyPlaylistLinkFromId(playlistId: string) {

}

export function extractSpotifyPlaylistIdFromLink(link: string) {

}