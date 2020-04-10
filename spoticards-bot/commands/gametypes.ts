import { Message } from 'discord.js';

export const data = {
    name: 'gametypes',
    aliases: ['helptypes', 'helpgametypes'],
    description: 'Mostra a ajuda para os tipos de jogo.',
    args: false
};

export function execute(message: Message, args: string[], server, client) {
    const messageText =
`**Tipos de jogo**
_Clássico_
.create classic <rodadas> <playlist> \n
• É o Spoticards clássico. A playlist passada servirá como deck de cartas. As cartas serão distribuídas aleatoriamente entre os participantes. Os critérios da rodada serão selecionados aleatoriamente, usando nome, artista, álbum, popularidade, duração e tempo.`;
    message.channel.send(messageText);
}