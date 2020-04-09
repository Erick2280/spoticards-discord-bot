import { SpotifyService } from './spotify-service';
import { Game } from './game';
import { Card } from './card';

export class Server {
    runningGames: Game[];
    spotifyService: SpotifyService;

    constructor() {
        this.runningGames = [];
        this.spotifyService = new SpotifyService();
    }

    startGame(admin, gameType) {
        let identifier: number;
        while (identifier == null || this.runningGames.find(game => game.identifier === identifier)) {
            identifier = Math.floor(Math.random() * 65536);
        }
        // const newGame = new Game(identifier, admin, cardSet, rounds, this.spotifyService);
        // this.runningGames.push(newGame);
        // return newGame;
    }

    stopGame(identifier) {
        const gameIndex = this.runningGames.findIndex(game => game.identifier = identifier);
        if (gameIndex !== -1) {
            this.runningGames.splice(gameIndex, 1);
        } else {
            throw new Error('GameNotFound');
        }
    }

    createCardEmbed(card: Card, index: number) {
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
                    name: 'Tempo',
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
}