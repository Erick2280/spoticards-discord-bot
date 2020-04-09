import { Game } from './game'

export class Server {
    runningGames: Game[];

    constructor() {
        this.runningGames = [];
    }

    startGame(admin, cardSet, rounds) {
        let gameIdentifier;
        while (gameIdentifier == null || this.runningGames.find(x => x.identifier === gameIdentifier)) {
            gameIdentifier = Math.floor(Math.random() * 65536);
        }
        const game = new Game(gameIdentifier, admin, cardSet, rounds)
        this.runningGames.push(game)
        return game;
    }

    stopGame() {

    }
}