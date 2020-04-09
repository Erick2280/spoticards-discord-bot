import * as Discord from 'discord.js';
import { environment } from './temp/environment';

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  if (message.content === '#play') {
    message.channel.send('Desejamos boas vindas ao Spoticards!')
  }

  if (message.content.startsWith('#start')) {
    message.channel.send(`Oi, ${message.author}! Você está conectado ao jogo 2931.`);
  }

  if (message.content.startsWith('#join')) {
    message.channel.send(`Oi, ${message.author}! Você está conectado ao jogo 2931.`);
  }

  if (message.content.startsWith('#begin')) {
    // ponteperra
  }

  if (message.content === '#status') {
    message.reply('Os seguintes jogadores estão conectados ao jogo:')
  }
})

client.login(environment.discordToken)