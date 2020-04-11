import { Message } from 'discord.js';
import { Server } from '../../spoticards/server';
import * as interfaceUtils from '../interface-utils';
import { ClassicGame } from '../../spoticards/game-types/classic-game';
import { environment } from '../../temp/environment';

export const data = {
    name: 'throw',
    description: 'Joga uma carta na mesa.',
    args: true,
    usage: '<número da carta>'
};

export function execute(message: Message, args: string[], server: Server, client) {
    const identifier = server.findGameIdentifierByUser(message.author.id);
    if (identifier == null) {
        throw new Error('UserNotFound');
    }
    const targetGame = server.findGameByIdentifier(identifier);

    if (targetGame instanceof ClassicGame) {
        const cardIndex = interfaceUtils.extractIndexFromString(args[0], targetGame.rounds);
        const roundFinishData = targetGame.disposeCard(message.author.id, cardIndex);
        // message.reply(`você jogou a sua carta ${cardIndex + 1}.`);
        message.react('👍');
        if (roundFinishData != null) {
            message.channel.send('Todos jogaram! Vamos ver os resultados?');
            message.channel.send('E a carta vencedora foi...');
            message.channel.send({embed: interfaceUtils.createCardEmbed(roundFinishData.table[0].card)});
            message.channel.send(interfaceUtils.createGameTable(targetGame, roundFinishData, client));
            message.channel.send(interfaceUtils.createPlayersList(targetGame, true, client));

            if (!targetGame.gameIsRunning) {
                message.channel.send('E o jogo chega ao fim!');
                message.channel.send(interfaceUtils.createWinningMessage(targetGame, client));
                message.channel.send(`Se quiser jogar uma nova rodada, mantendo as pontuações, é só redistribuir as cartas com **${environment.botPrefix}redistribute**. Caso queira mudar a playlist, basta usar **${environment.botPrefix}changeplaylist <playlist>**.`);
            } else {
                message.channel.send(interfaceUtils.createRoundData(targetGame));
            }
        }
    }
}