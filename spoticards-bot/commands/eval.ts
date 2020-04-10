import { Message } from 'discord.js';

export const data = {
    name: 'eval',
    description: '[RESTRITO] Avalia o argumento no JavaScript.',
    args: true,
    restricted: true
};

export function execute(message: Message, args: string[], server, client) {
    // tslint:disable-next-line: no-eval
    console.log(eval(args[0]));

    message.channel.send('Um belíssimo comando avaliado no seu terminal. :)');
}