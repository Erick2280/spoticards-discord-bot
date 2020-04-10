import { Card, Game, Player } from '../spoticards/game';
import { User, Client } from 'discord.js';
import { ClassicGame } from '../spoticards/game-types/classic-game';

export function createCardEmbed(card: Card, index: number = null) {
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
        ]
    };
    if (index != null) {
        embed['footer'] = {
            text: card.used ?  `Card nº ${index + 1} do deck • JÁ FOI UTILIZADA` : `Card nº ${index + 1} do deck`
        };
    }
    return embed;
}

export function createPlayersList(game: Game, leaderboardEnabled: boolean, client: Client) {
    let message = leaderboardEnabled ? `**${game.identifier} • Ranking de jogadores**` : `**${game.identifier} • Jogadores**`;
    let index = 1;
    if (leaderboardEnabled) {
        game.sortPlayersByPoints();
        for (const player of game.players) {
            message += `\n${index}º • **${getUserById(player.userName, client)}** • _${player.points} ${(player.points === 1) ? 'ponto' : 'pontos'}_`;
            index += 1;
        }
    } else {
        for (const player of game.players) {
            message += `\n${index}. **${getUserById(player.userName, client)}**`;
            index += 1;
        }
    }
    return message;
}

export function createGameTable(game: Game, roundFinishData, client: Client) {
    let message = `**${game.identifier} • Mesa da rodada ${roundFinishData.round}**`;
    if (game instanceof ClassicGame) {
        message += `\nO critério da rodada foi: _${game.criteria[roundFinishData.selectedCriterion].name}_`;

        let index = 1;
        for (const tableSpace of roundFinishData.table) {
            message += `\n${index}º • **${getUserById(tableSpace.player.userName, client)}** • _${tableSpace.card.name} - ${tableSpace.card.artist}_ • **${tableSpace.card[game.criteria[roundFinishData.selectedCriterion].variableName]}**`;
            index++;
        }
    }
    return message;
}

export function createRoundData(game: Game) {
    let message = `**${game.identifier} • Round ${game.round}/${game.rounds}**`;
    if (game instanceof ClassicGame) {
        message += `\nO critério da rodada é: _${game.criteria[game.selectedCriterion].name}_`;
    }
    return message;
}

export function createWinningMessage(game: Game, client: Client) {
    const winnerPoints = game.players[0].points;
    const winnerPlayers: Player[] = [];

    for (const player of game.players) {
        if (player.points === winnerPoints) {
            winnerPlayers.push(player);
        } else {
            break;
        }
    }

    let message;

    if (winnerPlayers.length === 1) {
        message = `Parabéns ao vencedor, **${getUserById(winnerPlayers[0].userName, client)}**!`;
    } else {
        message = `Parabéns aos vencedores, empatados: `;
        for (const winnerPlayer of winnerPlayers) {
            message += `\n**${getUserById(winnerPlayer.userName, client)}**`;
        }
    }

    return message;
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

	if (isNaN(index) || index <= 0 || index > length) {
        throw new Error('IndexStringIsNotAValidNumber');
    }

    return (index - 1);
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