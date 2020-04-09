import { SpotifyService } from './spotify-service';

import { Game } from './game';
import { ClassicGame } from './game-types/classic-game';
// import { AdvancedGame } from './game-types/advanced-game';
// import { CustomDeckGame } from './game-types/custom-deck-game';

import { generateRandomInteger } from './utils';

type User = {
    userName: string,
    identifier: number
};

export type GameOptions = {
    playlistId?: string,
    rounds: number
};

export enum GameType { Classic, Advanced, CustomDeck }

export class Server {
    runningGames: Game[];
    users: User[];
    spotifyService: SpotifyService;

    constructor() {
        this.runningGames = [];
        this.users = [];
        this.spotifyService = new SpotifyService();
    }

    startGame(adminUserName: string, gameType: GameType, gameOptions: GameOptions) {

        if (this.findGameIdentifierByUser(adminUserName) != null) {
            throw new Error('UserAlreadyInGame');
        }

        let identifier: number;
        while (identifier == null || this.findGameByIdentifier(identifier)) {
            identifier = generateRandomInteger(1, 65535);
        }

        if (gameType === GameType.Classic) {
            if (!('playlistId' in gameOptions)) {
                throw new Error('MissingPlaylistId');
            }
            const newGame = new ClassicGame(identifier, adminUserName, gameOptions.rounds, this.spotifyService, gameOptions.playlistId);
            this.runningGames.push(newGame);
            return newGame;
        }
    }

    stopGame(identifier: number, adminUserName: string) {
        const gameIndex = this.findGameIndexByIdentifier(identifier);
        if (gameIndex === -1) {
            throw new Error('GameNotFound');
        }
        if (this.runningGames[gameIndex].adminUserName !== adminUserName) {
            throw new Error('PlayerIsNotGameAdmin');
        }

        for (const player of this.runningGames[gameIndex].players) {
            this.removeUserFromUsersLists(player.userName);
        }
        this.runningGames.splice(gameIndex, 1);

        // TODO: Finalizar um jogo após um determinado tempo sem execução.
    }

    joinGame(userName: string, identifier: number) {
        const targetGame = this.findGameByIdentifier(identifier);

        if (targetGame == null) {
            throw new Error('GameNotFound');
        }

        if (this.findGameIdentifierByUser(userName) != null) {
            throw new Error('PlayerAlreadyInAGame');
        }

        targetGame.addPlayer(userName);
        this.addUserOnUsersList(userName, identifier);
        return targetGame;
    }

    unjoinGame(userName) {
        const identifier = this.findGameIdentifierByUser(userName);
        if (identifier == null ) {
            throw new Error('UserNotFound');
        }
        const targetGame = this.findGameByIdentifier(identifier);
        targetGame.removePlayer(userName);
        this.removeUserFromUsersLists(userName);
    }

    findGameIdentifierByUser(userName: string) {
        const foundUser = this.users.find(user => user.userName === userName);
        if (foundUser == null) {
            return null;
        }
        return foundUser.identifier;
    }

    findGameByIdentifier(identifier: number) {
        return this.runningGames.find(game => game.identifier === identifier);
    }

    findGameIndexByIdentifier(identifier: number) {
        return this.runningGames.findIndex(game => game.identifier === identifier);
    }

    private addUserOnUsersList(userName: string, identifier: number) {
        this.users.push({
            userName,
            identifier
        });
    }

    private removeUserFromUsersLists(userName: string) {
        const userIndex = this.users.findIndex(user => user.userName === userName);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        }
    }

}