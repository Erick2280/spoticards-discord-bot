import { Message } from 'discord.js';
import { Server } from '../../spoticards/server';
import * as interfaceUtils from '../interface-utils';
import { ClassicGame } from '../../spoticards/game-types/classic-game';

export const data = {
    name: 'sendcards',
    aliases: ['sendmydeck', 'mydeck', 'mycards'],
    description: 'Envia as suas cartas para sua DM.',
    args: false,
    usage: '<filterused (opcional caso queira filtrar as cartas utilizadas)>'
};

export function execute(message: Message, args: string[], server: Server, client) {
    const identifier = server.findGameIdentifierByUser(message.author.id);
    if (identifier == null) {
        throw new Error('UserNotFound');
    }
    const targetGame = server.findGameByIdentifier(identifier);

    if (targetGame instanceof ClassicGame) {

        let filterUsed = false;
        if (args[0] != null && args[0] === 'filterused') {
            filterUsed = true;
        }

        message.reply('enviei suas cartas nas sua DM.');
        let index = 0;
        const targetPlayer = targetGame.players.find(player => player.userName === message.author.id);
        message.author.send(`Estas são as suas cartas do jogo ${targetGame.identifier}:`);
        for (const card of targetPlayer.deck) {
            if (!filterUsed || filterUsed && !card.used) {
                message.author.send({embed: interfaceUtils.createCardEmbed(card, index)});
            }
            index += 1;
        }

    }
}