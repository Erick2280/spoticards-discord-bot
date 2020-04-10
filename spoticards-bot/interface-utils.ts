import { Card, Game, TableSpace } from '../spoticards/game';
import { User, Client } from 'discord.js';
import { ClassicGame } from '../spoticards/game-types/classic-game';

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
            text: card.used ?  `Card nº ${index} do deck • **Já foi utilizada**` : `Card nº ${index} do deck`
        }
    };
    return embed;
}

export function createPlayersList(game: Game, leaderboardEnabled: boolean, client: Client) {
    let message = `**${game.identifier} • Jogadores**`;
    let index = 1;
    if (leaderboardEnabled) {
        game.sortPlayersByPoints();
        for (const player of game.players) {
            message += `${index}º • **${getUserById(player.userName, client)}** • _${player.points} pontos_`;
            index += 1;
        }
    } else {
        for (const player of game.players) {
            message += `${index}. **${getUserById(player.userName, client)}**`;
            index += 1;
        }
    }
}

export function createGameTable(gameTable: TableSpace[], client: Client) {
    return '';
}

export function createRoundData(game: Game) {
    let message = `**${game.identifier} • Round ${game.round}/${game.rounds}**`;
    if (game instanceof ClassicGame) {
        message += `\nO critério da rodada é: _${game.criteria[game.selectedCriterion].name}_`;
    }
    return message;
}

export function createWinningMessage(game: Game, client: Client) {
    return '';
}

export function createWarningFromDmMessage(user: User) {
    return `**Oi, ${user}! Aqui é o robô do Spoticards!** \n Só posso ser utilizado em canais de texto de servidores. Eu vou mandar informações privadas (como seu deck numa partida) por aqui, mas você me comanda lá pelo canal onde você está jogando :)`;

}

export function getUserById(id: string, client: Client) {
    return client.users.cache.get(id);
}

export function extractRoundsFromString(string: string) {
    const rounds = parseInt(string, 10);

	if (isNaN(rounds) || rounds <= 0) {
        throw new Error('RoundStringIsNotAValidNumber');
    }

    return rounds;
}

export function extractIndexFromString(string: string, length: number) {
    const index = parseInt(string, 10);

	if (isNaN(index) || index < 0 || index >= length) {
        throw new Error('IndexStringIsNotAValidNumber');
    }

    return index;
}

export function extractGameIdentifierFromString(string: string) {
    const identifier = parseInt(string, 10);

	if (isNaN(identifier) || identifier <= 0 || identifier > 65536) {
        throw new Error('GameIdentifierStringIsNotAValidNumber');
    }

    return identifier;
}

export function getSpotifyPlaylistLinkFromId(playlistId: string) {
    return `https://open.spotify.com/playlist/${playlistId}`;
}

export function extractSpotifyPlaylistId(string: string) {
    if (string == null) {
        throw new Error ('SpotifyPlaylistStringNotProvided');
    }

    const playlistId = string.match(/(?<=spotify:playlist:|open\.spotify\.com\/playlist\/|)[a-zA-Z0-9]{22}/);

    if (playlistId == null) {
        throw new Error('CannotExtractSpotifyId');
    }

    return playlistId[0];
}