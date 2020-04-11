import { Message } from 'discord.js';
import { Server } from '../../spoticards/server';
import * as interfaceUtils from '../interface-utils';
import { ClassicGame } from '../../spoticards/game-types/classic-game';
import { environment } from '../../temp/environment';

export const data = {
    name: 'distribute',
    aliases: ['redistribute'],
    description: 'Distribui as cartas do jogo e inicia-o.',
    args: false
};

export async function execute(message: Message, args: string[], server: Server, client) {
    const identifier = server.findGameIdentifierByUser(message.author.id);

    if (identifier == null) {
        throw new Error('UserNotFound');
    }
    const targetGame = server.findGameByIdentifier(identifier);

    if (targetGame instanceof ClassicGame) {

        message.channel.send('Irei distribuir as cartas. Os jogadores vão recebê-las nas suas DMs :)');
        await targetGame.distributeDeck();
        for (const player of targetGame.players) {
            const user = interfaceUtils.getUserById(player.userName, client);
            user.send(`Estas são as suas cartas do jogo ${targetGame.identifier}:`);
            let index = 0;
            for (const card of player.deck) {
                user.send({embed: interfaceUtils.createCardEmbed(card, index)});
                index += 1;
            }
        }

        message.channel.send(`Tudo pronto! Vamos começar a primeira rodada. Jogue uma carta usando **${environment.botPrefix}throw <número da carta>**`);
        message.channel.send(interfaceUtils.createRoundData(targetGame));
    }
}