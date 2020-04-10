import * as Discord from 'discord.js';
import { environment } from './temp/environment';
import { Server, GameType, GameOptions } from './spoticards/server';
import * as interfaceUtils from './interface-utils';

const client = new Discord.Client();
const server = new Server();