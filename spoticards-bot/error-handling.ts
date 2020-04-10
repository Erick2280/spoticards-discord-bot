import { Server } from '../spoticards/server';
import { Client, Message } from 'discord.js';
import { environment } from '../temp/environment';

export function returnUserFriendlyErrorMessage(error: Error, message: Message, server: Server, client: Client) {
    switch (error.message) {
        case 'Not Found':
            message.reply(`não consegui criar um deck. Você tem certeza de que inseriu uma playlist válida do Spotify? Para trocar a playlist, use o comando **${environment.botPrefix}changeplaylist <playlist>**.`);
            break;
        case 'CannotChangePlayersWhileGameIsRunning':
            message.reply('não é possível alterar os jogadores enquanto o jogo está em andamento. Peça ao anfitrião do jogo para finalizá-lo.');
            break;
        case 'PlayerAlreadyInThisGame':
            message.reply('você já está nesse jogo.');
            break;
        case 'PlayerIsNotFound':
            message.reply('você não está nesse jogo. :/');
            break;
        case 'UserAlreadyInAGame':
            message.reply('você já está em um jogo. Não dá pra participar de mais de um ao mesmo tempo :/');
            break;
        case 'MissingPlaylistId':
            message.reply('você esqueceu de colocar a playlist :/');
            break;
        case 'GameNotFound':
            message.reply('não foi possível encontrar um jogo com esse identificador. Tem certeza que está certo?');
            break;
        case 'UserNotFound':
            message.reply('você não está em jogo. Então, não fiz nada :)');
            break;
        case 'PlaylistLengthDoesNotMatch':
            message.reply('nessa modalidade, você precisa adicionar uma playlist com o tamanho exato do deck. Nada mais, nada menos :)');
            break;
        case 'DeckAlreadyDistributed':
            message.reply('o deck já foi distribuído.');
            break;
        case 'NotEnoughPlayersToStartGame':
            message.reply(`não há jogadores suficientes para começar o jogo. Outras pessoas podem entrar nele usando **${environment.botPrefix}join** ${server.findGameIdentifierByUser(message.author.id)}.`);
            break;
        case 'GlobalDeckTooSmall':
            const game = server.findGameByIdentifier(server.findGameIdentifierByUser(message.author.id));
            message.reply(`a playlist fornecida é muito pequena para este jogo. Por favor, forneça uma playlist com pelo menos ${game.rounds * game.players.length} músicas (arquivos locais não são suportados) ou jogue com menos rodadas ou jogadores.`);
            break;
        case 'DeckIsBeingMounted':
            message.reply('o deck está sendo montado. Assim que estiver tudo pronto, você o receberá nas suas DMs e jogo vai começar :)');
            break;
        case 'PlayerAlreadyDisposedCardInThisRound':
            message.reply('você já jogou uma carta na mesa nessa rodada. Espere até a próxima :)');
            break;
        case 'PlayerCardAlreadyUsed':
            message.reply(`você já jogou essa carta. Jogue uma que não tenha jogado antes :) Para ver suas cartas na mão, envie **${environment.botPrefix}sendcard filterused**`);
            break;
        case 'SpotifyPlaylistStringNotProvided':
            message.reply('parece que você não inseriu nenhuma playlist :/');
            break;
        case 'CannotExtractSpotifyId':
            message.reply('isso que você colocou não parece uma playlist do Spotify. Você pode conferir?');
            break;
        case 'RoundStringIsNotAValidNumber':
            message.reply('você precisa colocar a quantidade de rodadas, que deve ser um número maior que zero.');
            break;
        case 'GameIdentifierStringIsNotAValidNumber':
            message.reply('você precisa colocar o identificador do jogo, que deve ser um número maior que zero e menor que 65536.');
            break;
        case 'IndexStringIsNotAValidNumber':
            message.reply('o número enviado é inválido.');
            break;
        case 'GameIsNotRunning':
            message.reply('o jogo não está em andamento.');
            break;
        default:
            console.log(error);
            message.reply('aconteceu um erro e eu não sei o que é. Beep, bop, desculpe :/');
            break;
    }
}

export function returnExpectedCommandUsage(commandName: string, usage: string, message: Message) {
    message.reply(`para usar este comando, você precisa enviar uma mensagem assim: **${environment.botPrefix + commandName + ' ' + usage}**.`);
}