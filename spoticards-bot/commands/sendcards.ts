import { Message } from 'discord.js';
import { Server } from '../../spoticards/server';
import * as interfaceUtils from '../interface-utils';
import { ClassicGame } from '../../spoticards/game-types/classic-game';

export const data = {
    name: 'sendcards',
    description: 'Envia as suas cartas para sua DM.',
    args: false
};

export function execute(message: Message, args: string[], server: Server, client) {
    const identifier = server.findGameIdentifierByUser(message.author.id);
    if (identifier == null) {
        throw new Error('UserNotFound');
    }
    const targetGame = server.findGameByIdentifier(identifier);

    if (targetGame instanceof ClassicGame) {

        message.reply('enviei suas cartas nas sua DM.');
        // # todo, enviar título antes de spammar cartas
        // # todo, ver índice das cartas throw
        let index = 0;
        const targetPlayer = targetGame.players.find(player => player.userName === message.author.id);
        for (const card of targetPlayer.deck) {
            message.author.send({embed: interfaceUtils.createCardEmbed(card, index)});
            index += 1;
        }

    }
}