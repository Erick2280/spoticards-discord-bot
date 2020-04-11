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
    variableComparator: '>' | '<' | '.'
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
    gameType = 'n/a';

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
        if (playerIndex === -1) {
            throw new Error('PlayerIsNotFound');
        }

        this.players.splice(playerIndex, 1);
    }

    sortPlayersByPoints() {
        this.players.sort((a, b) => b.points - a.points);
    }

}

export const allCriteria: Criterion[] = [{
        name: 'Música com maior nome',
        variableName: 'name',
        variableType: 'string',
        variableComparator: '>'
    },
    {
        name: 'Música com menor nome',
        variableName: 'name',
        variableType: 'string',
        variableComparator: '<'
    },
    {
        name: 'Artista com maior nome',
        variableName: 'artist',
        variableType: 'string',
        variableComparator: '>'
    },
    {
        name: 'Artista com menor nome',
        variableName: 'artist',
        variableType: 'string',
        variableComparator: '<'
    },
    {
        name: 'Álbum com maior nome',
        variableName: 'album',
        variableType: 'string',
        variableComparator: '>'
    },
    {
        name: 'Álbum com menor nome',
        variableName: 'album',
        variableType: 'string',
        variableComparator: '<'
    },
    {
        name: 'Música mais popular',
        variableName: 'popularity',
        variableType: 'number',
        variableComparator: '>'
    },
    {
        name: 'Música menos popular',
        variableName: 'popularity',
        variableType: 'number',
        variableComparator: '<'
    },
    {
        name: 'Música mais longa',
        variableName: 'duration',
        variableType: 'number',
        variableComparator: '>'
    },
    {
        name: 'Música mais curta',
        variableName: 'duration',
        variableType: 'number',
        variableComparator: '<'
    },
    {
        name: 'Música com maior tempo (BPM)',
        variableName: 'tempo',
        variableType: 'number',
        variableComparator: '>'
    },
    {
        name: 'Música com menor tempo (BPM)',
        variableName: 'tempo',
        variableType: 'number',
        variableComparator: '<'
    },
    {
        name: 'Música com maior danceabilidade',
        variableName: 'danceability',
        variableType: 'number',
        variableComparator: '>'
    },
    {
        name: 'Música com menor danceabilidade',
        variableName: 'danceability',
        variableType: 'number',
        variableComparator: '<'
    },
    {
        name: 'Música com maior sonoridade',
        variableName: 'loudness',
        variableType: 'number',
        variableComparator: '>'
    },
    {
        name: 'Música com menor sonoridade',
        variableName: 'loudness',
        variableType: 'number',
        variableComparator: '<'
    },
    {
        name: 'Música com maior proporção de fala',
        variableName: 'speechiness',
        variableType: 'number',
        variableComparator: '>'
    },
    {
        name: 'Música com menor proporção de fala',
        variableName: 'speechiness',
        variableType: 'number',
        variableComparator: '<'
    },
    {
        name: 'Música com maior nível de acústica',
        variableName: 'acousticness',
        variableType: 'number',
        variableComparator: '>'
    },
    {
        name: 'Música com menor nível de acústica',
        variableName: 'acousticness',
        variableType: 'number',
        variableComparator: '<'
    },
    {
        name: 'Música com maior instrumentalidade',
        variableName: 'instrumentalness',
        variableType: 'number',
        variableComparator: '>'
    },
    {
        name: 'Música com menor instrumentalidade',
        variableName: 'instrumentalness',
        variableType: 'number',
        variableComparator: '<'
    },
    {
        name: 'Música com maior vivacidade',
        variableName: 'liveness',
        variableType: 'number',
        variableComparator: '>'
    },
    {
        name: 'Música com menor vivacidade',
        variableName: 'liveness',
        variableType: 'number',
        variableComparator: '<'
    },
    {
        name: 'Música com maior nível de valência',
        variableName: 'valence',
        variableType: 'number',
        variableComparator: '>'
    },
    {
        name: 'Música com menor nível de valência',
        variableName: 'valence',
        variableType: 'number',
        variableComparator: '<'
    },
    ];