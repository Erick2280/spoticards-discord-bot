import { Message } from 'discord.js';
import { Server, GameType, GameOptions } from '../../spoticards/server';
import * as interfaceUtils from '../interface-utils';
import { ClassicGame } from '../../spoticards/game-types/classic-game';

export const data = {
    name: 'changeplaylist',
    description: 'Altera a playlist do jogo.',
    args: true,
    usage: '<playlist>'
};

export function execute(message: Message, args: string[], server: Server, client) {
    // TODO: change global para mudar configs do jogo
    const playlistId = interfaceUtils.extractSpotifyPlaylistId(args[0]);
    const identifier = server.findGameIdentifierByUser(message.author.id);
    if (identifier == null) {
        throw new Error('UserNotFound');
    }
    const targetGame = server.findGameByIdentifier(identifier);
    if (targetGame instanceof ClassicGame) {
        targetGame.playlistId = playlistId;
        const messageText =
`Alteramos a playlist do jogo com sucesso! :)
Agora o jogo está usando a seguinte playlist: ${interfaceUtils.getSpotifyPlaylistLinkFromId(targetGame.playlistId)}
`;
        message.channel.send(messageText);
    }
}