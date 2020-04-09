import * as Discord from 'discord.js';
import { environment } from './temp/environment';
import { Server, GameType, GameOptions } from './spoticard/server';
import * as interfaceUtils from './interface-utils';

const client = new Discord.Client();
const server = new Server();

client.on('ready', () => {
  console.log(`Fez login como ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.content === '.play') {
    message.channel.send(interfaceUtils.createWelcomeMessage(message.author));
  }

  if (message.content === '.typehelp') {
    message.channel.send(`# Tipos de jogo \n
    ## Clássico \n
    .create classic {id-da-playlist} {rounds} \n
    - É o Spoticards clássico. A playlist passada servirá como deck de cartas. As cartas serão distribuída
    aleatoriamente entre os participantes. Os critérios da rodada serão selecionados aleatoriamente, usando
    nome, artista, álbum, popularidade, duração e tempo. \n
    ## Avançado \n
    .create advanced {id-da-playlist} {rounds} \n
    - A playlist passada servirá como deck de cartas. As cartas serão distribuída
    aleatoriamente entre os participantes. Os critérios da rodada serão selecionados aleatoriamente,
    dentre todos disponíveis. \n
    ## Deck personalizado \n
    .create customdeck {rounds} \n
    - Cada jogador seleciona o seu próprio deck. A playlist fornecida pelo jogador precisa ter a quantidade
    de músicas igual à quantidade de rounds. Os critérios da rodada serão selecionados aleatoriamente. \n
    `);
  }


  if (message.content === '.create') {
    const targetGame = server.startGame(message.author.tag, GameType.Classic, {playlistId: '6oQGnbXbkV69oR0xIGQ9Nv', rounds: 5});
    message.channel.send(`Oi, ${message.author}! Você está conectado ao jogo ${targetGame.identifier}. Para distribuir as cartas, digite **.distribute**.`);
  }

  if (message.content === '.distribute') {
    const targetGame = server.startGame(message.author.username, GameType.Classic, {playlistId: 'https://open.spotify.com/playlist/6oQGnbXbkV69oR0xIGQ9Nv?si=U0tIy_-RQryVSCFCkFxYLg', rounds: 5});
    // server.joinGame('testeForeverAlone', targetGame.identifier);
    console.log(targetGame);
    message.channel.send(`Oi, ${message.author}! Você está conectado ao jogo ${targetGame.identifier}. Um momento enquanto distribuímos as cartas.`);
    try {
      await targetGame.distributeDeck();
    } catch (error) {
      if (error.message === 'NotEnoughPlayersToStartGame') {
        console.log('empurra');
        message.channel.send(`Não há pessoas suficientes para começar o jogo. Convide seus amigos! Eles podem entrar com **.join ${targetGame.identifier}**.`)
      }
      console.log(error);
    }
  }

  if (message.content.startsWith('.join')) {
    message.channel.send(`Oi, ${message.author}! Você está conectado ao jogo 2931.`);
  }

  if (message.content.startsWith('.samplecard')) {
    let object = await server.spotifyService.getDeckFromPlaylist('6oQGnbXbkV69oR0xIGQ9Nv');
    message.channel.send({embed: interfaceUtils.createCardEmbed(object.cards[1], 1)});
  }

  if (message.content.startsWith('.begin')) {
    // ponteperra
  }

  if (message.content === '.status') {
    message.reply('Os seguintes jogadores estão conectados ao jogo:');
  }
});

client.login(environment.discordToken);

// return users from game (with/out leaderboard)

// return table card from game

// return deck of user

// return rounds