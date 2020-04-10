import { Message } from 'discord.js';
import { Server, GameType, GameOptions } from '../../spoticards/server';
import * as interfaceUtils from '../interface-utils';
import { environment } from '../../temp/environment';

export const data = {
    name: 'create',
    description: 'Cria um novo jogo.',
    args: true,
    usage: '<tipo de jogo> <opções do tipo>'
};

export function execute(message: Message, args: string[], server: Server, client) {

    if (args[0] === 'classic') {
        const gameType = GameType.Classic;
        const gameOptions: GameOptions = {
            rounds: interfaceUtils.extractRoundsFromString(args[1]),
            playlistId: interfaceUtils.extractSpotifyPlaylistId(args[2])
        };
        const targetGame = server.startGame(message.author.id, gameType, gameOptions);
        const messageText =
`Oi, ${message.author}! Você está conectado ao jogo ${targetGame.identifier}, do tipo **${targetGame.gameTypeName}** :)
A playlist em uso é: ${interfaceUtils.getSpotifyPlaylistLinkFromId(targetGame.playlistId)}
Outras pessoas podem entrar no jogo usando **${environment.botPrefix}join ${targetGame.identifier}**.
Assim que todo mundo estiver no jogo, distribua as cartas e comece o jogo enviando **${environment.botPrefix}distribute**.
`;
        message.channel.send(messageText);
    } else if (args[0] === 'thorough') {
        const gameType = GameType.Thorough;
        const gameOptions: GameOptions = {
            rounds: interfaceUtils.extractRoundsFromString(args[1]),
            playlistId: interfaceUtils.extractSpotifyPlaylistId(args[2])
        };
        const targetGame = server.startGame(message.author.id, gameType, gameOptions);
        const messageText =
`Oi, ${message.author}! Você está conectado ao jogo ${targetGame.identifier}, do tipo **${targetGame.gameTypeName}** :)
A playlist em uso é: ${interfaceUtils.getSpotifyPlaylistLinkFromId(targetGame.playlistId)}
Outras pessoas podem entrar no jogo usando **${environment.botPrefix}join ${targetGame.identifier}**.
Assim que todo mundo estiver no jogo, distribua as cartas e comece o jogo enviando **${environment.botPrefix}distribute**.
`;
        message.channel.send(messageText);
    }
    else {
        message.channel.send(`Não reconheço esse tipo de jogo. Veja todas as opções disponíveis enviando **${environment.botPrefix}gametypes**.`);
    }
}