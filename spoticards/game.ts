import { SpotifyService } from './spotify-service';

export type Player = {
    userName: string,
    points: number,
    deck: Card[],
};
export type TableSpace = {
    player: Player,
    card: Card
};
export type Criterion = {
    name: string,
    variableName: string,
    variableType: 'string' | 'number',
    variableComparator: '>' | '<'
};

export type Card = {
    id: string;
    imageUrl: string;

    name: string;
    artist: string;
    album: string;
    popularity: number;
    danceability: number;
    energy: number;
    loudness: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number;
    tempo: number;
    duration: number;

    used: boolean;
};

export class Game {
    identifier: number;
    adminUserName: string;
    players: Player[];
    round: number;
    rounds: number;
    gameIsRunning: boolean;
    table: TableSpace[];
    spotifyService: SpotifyService;

    constructor(identifier: number, adminUserName: string, rounds: number, spotifyService: SpotifyService) {
        this.identifier = identifier;
        this.adminUserName = adminUserName;
        this.players = [];
        this.round = 0;
        this.rounds = rounds;
        this.gameIsRunning = false;
        this.spotifyService = spotifyService;
    }

    addPlayer(userName: string) {
        if (this.gameIsRunning) {
            throw new Error('CannotChangePlayersWhileGameIsRunning');
        }
        if (this.players.find(player => player.userName === userName) != null) {
            throw new Error('PlayerAlreadyInThisGame');
        }
        const newPlayer = {
            userName,
            points: 0,
            deck: [],
        };
        this.players.push(newPlayer);
    }

    removePlayer(userName) {
        if (this.gameIsRunning) {
            throw new Error('CannotChangePlayersWhileGameIsRunning');
        }

        const playerIndex = this.players.findIndex(player => player.userName === userName);
        if (playerIndex !== -1) {
            throw new Error('PlayerIsNotFound');
        }

        this.players.splice(playerIndex, 1);
    }

    sortPlayersByPoints() {
        this.players.sort((a, b) => b.points - a.points);
    }

}