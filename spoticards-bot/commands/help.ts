import { Message } from 'discord.js';

export const data = {
    name: 'play',
    description: 'Dá as boas-vindas para o usuário.',
    args: false
};

export function execute(message: Message, args: string[], server, client) {
    const messageText =
`**Oi! Desejamos boas vindas ao Spoticards!**

Para criar um novo jogo, envie **.create** com as opções de jogo.
Para ver estilos e opções de jogo, envie **.gametypes**.`;
    message.channel.send(messageText);
}