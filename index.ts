import * as Discord from 'discord.js';
import { environment } from './temp/environment';
import { Server } from './spoticard/server';
import { Game } from './spoticard/game';
import { SpotifyService } from './spoticard/spotify-service';

const client = new Discord.Client();

const server = new Server();

client.on('ready', () => {
  console.log(`Fez login como ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.content === '#play') {
    message.channel.send(`**Desejamos boas vindas ao Spoticards!** \n Para criar um novo jogo, envie **#create** com as opções de jogo. \n Para ver estilos e opções de jogo, envie **#typehelp**.`);
  }

  if (message.content === '#typehelp') {
    message.channel.send(`# Tipos de jogo \n
    ## Clássico \n
    #create classic {id-da-playlist} {rounds} \n
    - É o Spoticards clássico. A playlist passada servirá como deck de cartas. As cartas serão distribuída
    aleatoriamente entre os participantes. Os critérios da rodada serão selecionados aleatoriamente, usando
    nome, artista, álbum, popularidade, duração e tempo. \n
    ## Avançado \n
    #create advanced {id-da-playlist} {rounds} \n
    - A playlist passada servirá como deck de cartas. As cartas serão distribuída
    aleatoriamente entre os participantes. Os critérios da rodada serão selecionados aleatoriamente,
    dentre todos disponíveis. \n
    ## Deck personalizado \n
    #create customdeck {rounds} \n
    - Cada jogador seleciona o seu próprio deck. A playlist fornecida pelo jogador precisa ter a quantidade
    de músicas igual à quantidade de rounds. Os critérios da rodada serão selecionados aleatoriamente. \n
    `);
  }


  if (message.content === '#create') {
    message.channel.send(`Oi, ${message.author}! Você está conectado ao jogo 2931.`);
  }

  if (message.content.startsWith('#join')) {
    message.channel.send(`Oi, ${message.author}! Você está conectado ao jogo 2931.`);
  }

  if (message.content.startsWith('#samplecard')) {
    let object = await server.spotifyService.getDataFromPlaylist('35lYni6txjJG6y23ZKc0ht');
    message.channel.send({embed: server.createCardEmbed(object.cards[1], 1)});
  }

  if (message.content.startsWith('#begin')) {
    // ponteperra
  }

  if (message.content === '#status') {
    message.reply('Os seguintes jogadores estão conectados ao jogo:');
  }
});

client.login(environment.discordToken);