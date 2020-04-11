import { SpotifyService } from './spotify-service';

import { Game, Criterion } from './game';
import { ClassicGame } from './game-types/classic-game';
import { ThoroughGame } from './game-types/thorough-game';
import { CustomCriteriaGame } from './game-types/custom-criteria-game';
// import { CustomDeckGame } from './game-types/custom-deck-game';
// import { SelectACriteriaGame } from './game-types/select-a-criteria-game';
// import { RightInTheMiddleGame } from './game-types/right-in-the-middle-game';
// import { ChooseTheCards } from './game-types/right-in-the-middle-game';

import { generateRandomInteger } from './utils';

type User = {
    userName: string,
    identifier: number
};

export type GameOptions = {
    playlistId?: string,
    rounds: number,
    criteria?: Criterion[]
};

export enum GameType { Classic, Thorough, CustomCriteria }

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
            throw new Error('UserAlreadyInAGame');
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
            this.addUserOnUsersList(adminUserName, newGame.identifier);
            return newGame;
        }
        if (gameType === GameType.Thorough) {
            if (!('playlistId' in gameOptions)) {
                throw new Error('MissingPlaylistId');
            }
            const newGame = new ThoroughGame(identifier, adminUserName, gameOptions.rounds, this.spotifyService, gameOptions.playlistId);
            this.runningGames.push(newGame);
            this.addUserOnUsersList(adminUserName, newGame.identifier);
            return newGame;
        }
        if (gameType === GameType.CustomCriteria) {
            if (!('playlistId' in gameOptions)) {
                throw new Error('MissingPlaylistId');
            }
            if (!('criteria' in gameOptions)) {
                throw new Error('MissingCriteria');
            }
            const newGame = new CustomCriteriaGame(identifier, adminUserName, gameOptions.rounds,
                this.spotifyService, gameOptions.playlistId, gameOptions.criteria);
            this.runningGames.push(newGame);
            this.addUserOnUsersList(adminUserName, newGame.identifier);
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
            throw new Error('UserAlreadyInAGame');
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
        if (targetGame.adminUserName === userName) {
            this.stopGame(targetGame.identifier, userName);
            return true;
        }
        targetGame.removePlayer(userName);
        this.removeUserFromUsersLists(userName);
        return false;
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