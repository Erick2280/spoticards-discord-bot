import { Message } from 'discord.js';

export const data = {
    name: 'dump',
    description: '[RESTRITO] Realiza o dump no terminal do Spoticards.',
    args: false,
    restricted: true
};

export function execute(message: Message, args: string[], server, client) {
    console.log(server);
    message.channel.send('Um belíssimo dump no seu terminal :)');
}