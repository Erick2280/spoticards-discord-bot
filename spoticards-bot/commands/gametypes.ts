import { Message } from 'discord.js';
import { environment } from '../../temp/environment';

export const data = {
    name: 'gametypes',
    aliases: ['helptypes', 'helpgametypes'],
    description: 'Mostra a ajuda para os tipos de jogo.',
    args: false
};

export function execute(message: Message, args: string[], server, client) {
    const messageText =
`__**Tipos de jogo**__
_Clássico_
**${environment.botPrefix}create classic <rodadas> <playlist>**
• É o Spoticards clássico. A playlist passada servirá como deck de cartas. As cartas serão distribuídas aleatoriamente entre os participantes. Os critérios da rodada serão selecionados aleatoriamente, usando nome, artista, álbum, popularidade, duração e tempo.

_Minucioso_
**${environment.botPrefix}create thorough <rodadas> <playlist>**
• É o Spoticards clássico com mais critérios. A playlist passada servirá como deck de cartas. As cartas serão distribuídas aleatoriamente entre os participantes. Os critérios da rodada serão selecionados aleatoriamente, dentre todos disponíveis.`;
    message.channel.send(messageText);
}