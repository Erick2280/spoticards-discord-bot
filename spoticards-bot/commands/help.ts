import { Message } from 'discord.js';
import { environment } from '../../temp/environment';
import fs from 'fs';

export const data = {
    name: 'help',
    description: 'Mostra a ajuda ao usuário.',
    args: false
};

export function execute(message: Message, args: string[], server, client) {

    // TODO: Adicionar imagens :)

    let messageText =
`__**O que é o Spoticards?**__
O Spoticards é um jogo digital de cartas onde as suas músicas do Spotify são a chave para vencer!
A cada rodada, é escolhido um critério (por exemplo, música mais popular ou mais longe). Vence a rodada quem jogar na mesa a carta que alcançar esse objetivo!
Dê uma olhada nos tipos de jogo! Cada um tem regras diferentes ;)

__**Comandos**__`;
    const commandsFolder = __dirname;
    const commandFiles = fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`${commandsFolder}/${file}`);
        if (!command.data.restricted) {
            messageText += `\n**${environment.botPrefix}${command.data.name}**`;
            if (command.data.usage) {
                messageText += ` _${command.data.usage}_`;
            }
            if (command.data.aliases) {
                messageText += `\n_também pode ser chamado usando `;
                let index = 0;
                for (const alias of command.data.aliases) {
                    messageText +=`**${environment.botPrefix}${alias}**`;
                    if (index !== command.data.aliases.length - 1) {
                        messageText += ', ';
                    }

                    index++;
                }
                messageText += `_`;
            }
            messageText += `\n• ${command.data.description}\n`;
        }
    }
    message.channel.send(messageText);
}