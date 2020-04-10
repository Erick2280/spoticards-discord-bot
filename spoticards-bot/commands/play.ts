import { Message } from 'discord.js';
import { environment } from '../../temp/environment';

export const data = {
    name: 'play',
    aliases: ['hi'],
    description: 'Dá as boas-vindas para o usuário.',
    args: false
};

export function execute(message: Message, args: string[], server, client) {
    const messageText =
`**Oi! Desejamos boas vindas ao Spoticards!**

Para criar um novo jogo, envie **${environment.botPrefix}create** com as opções de jogo.
Para ver estilos e opções de jogo, envie **${environment.botPrefix}gametypes**.
Para ver a ajuda e todos os comandos disponíveis, envie **${environment.botPrefix}help**.`;
    message.channel.send(messageText);
}