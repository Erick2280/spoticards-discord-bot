import { Message } from 'discord.js';
import { Server } from '../../spoticards/server';

export const data = {
    name: 'unjoin',
    aliases: ['exit'],
    description: 'Remove o usuário de um jogo.',
    args: false
};

export function execute(message: Message, args: string[], server: Server, client) {
    const gameStopped = server.unjoinGame(message.author.id);
    let messageText = `Você saiu do jogo, ${message.author}.`;
    if (gameStopped) {
        messageText += `\nComo você era o anfitrião, o jogo foi finalizado.`;
    }
    message.channel.send(messageText);
}