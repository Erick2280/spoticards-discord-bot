import { Message } from 'discord.js';
import { Server } from '../../spoticards/server';
import * as interfaceUtils from '../interface-utils';
import { environment } from '../../temp/environment';

export const data = {
    name: 'join',
    description: 'Adiciona o usuário a um jogo existente.',
    aliases: ['joingame', 'entergame'],
    args: true,
    usage: '<identificador>'
};

export function execute(message: Message, args: string[], server: Server, client) {
    const identifier = interfaceUtils.extractGameIdentifierFromString(args[0]);
    const targetGame = server.joinGame(message.author.id, identifier);
    message.channel.send(`Bem vindo ao jogo ${identifier}, ${message.author}! Assim que todo mundo estiver no jogo, distribua as cartas e comece o jogo enviando **${environment.botPrefix}distribute**.`);
    message.channel.send(interfaceUtils.createPlayersList(targetGame, false, client));
}