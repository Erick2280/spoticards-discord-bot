import { Message } from 'discord.js';
import { Server, GameType, GameOptions } from '../../spoticards/server';
import * as interfaceUtils from '../interface-utils';
import { environment } from '../../temp/environment';
import { Criterion } from '../../spoticards/game';

export const data = {
    name: 'create',
    description: 'Cria um novo jogo.',
    aliases: ['newgame', 'creategame'],
    args: true,
    usage: '<tipo de jogo> <opções do tipo>'
};

export async function execute(message: Message, args: string[], server: Server, client) {

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
    } else if (args[0] === 'customcriteria') {
        const gameType = GameType.CustomCriteria;
        const gameOptions: GameOptions = {
            rounds: interfaceUtils.extractRoundsFromString(args[1]),
            playlistId: interfaceUtils.extractSpotifyPlaylistId(args[2])
        };
        message.channel.send('Antes de criar a sua sala, vamos selecionar os critérios.');
        message.channel.send(interfaceUtils.createAvailableCriteriaList());
        await message.channel.send(`Escolha os critérios enviando **${environment.botPrefix}reply criteria** seguindo do número de cada um separados por vírgula.`);

        const filter = m => message.author.id === m.author.id;
        let newMessages;
        try {
            newMessages = await message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] });
        } catch {
            throw new Error('NoReplyAbortedGameCreation');
        }
        const reply = newMessages.first().content;
        if (reply.startsWith(`${environment.botPrefix}`) && !reply.startsWith(`${environment.botPrefix}reply criteria`)) {
            throw new Error('NewCommandAbortedGameCreation');
        }
        gameOptions.criteria = interfaceUtils.extractCriteriaFromString(reply.substring(environment.botPrefix.length + 15));
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