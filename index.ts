import * as Discord from 'discord.js';
import { environment } from './temp/environment';
import { Server } from './spoticards/server';
import * as interfaceUtils from './spoticards-bot/interface-utils';
import { returnUserFriendlyErrorMessage, returnExpectedCommandUsage } from './spoticards-bot/error-handling';
import fs from 'fs';

// Inicializa o cliente do Discord e o servidor do Spoticards
const client = new Discord.Client();
const server = new Server();
const prefix = '.';

// Carrega os comandos
const commands = new Discord.Collection<string, any>();
const commandsFolder = __dirname + '/spoticards-bot/commands';
const commandFiles = fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`${commandsFolder}/${file}`);
	commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`Fez login como ${client.user.tag}!`);
    client.user.setActivity('Spoticards');
});

client.on('message', async message => {
    if (message.channel instanceof Discord.DMChannel && !message.author.bot) {
        message.channel.send(interfaceUtils.createWarningFromDmMessage(message.author));
    }

    if (message.channel instanceof Discord.TextChannel && message.content.startsWith(prefix) && !message.author.bot) {
        const args: string[] = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = commands.get(commandName) ||
                        commands.find(cmd => cmd.data.aliases && cmd.data.aliases.includes(commandName));

        if (command == null) {
            message.reply('não reconheço esse comando :/ você pode ver uma lista de todos usando **.help**.');
            return;
        }

        if (command.data.args && args.length === 0) {
            returnExpectedCommandUsage(prefix, commandName, command.data.usage, message);
            return;
        }

        if (command.data.restricted && !environment.usersAllowedToExecuteRestrictedCommands.includes(message.author.id)) {
            message.reply('tá bonito você querendo usar comando restrito, né? 😒');
            return;
        }

        try {
            await command.execute(message, args, server, client);
        } catch (error) {
            returnUserFriendlyErrorMessage(error, message, server, client);
        }
    }
});

client.login(environment.discordToken);