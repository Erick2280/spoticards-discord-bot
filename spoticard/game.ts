import { SpotifyService } from './spotify-service';
import { Card } from './card';

enum GameTypes { Classic, Hidden, CustomDeck }
type User = {
    user: string,
    points: number,
    deck: Card[],
};
type TableSpace = {
    user: User,
    card: Card
};

export class Game {
    identifier: number;
    admin: string;
    users: User[];
    cardSet: string;
    round: number;
    rounds: number;
    table: TableSpace[];
    spotifyService: SpotifyService;

    constructor(identifier: number, admin: string, cardSet: string, rounds: number, spotifyService: SpotifyService) {
        this.identifier = identifier;
        this.admin = admin;
        this.users = [];
        this.joinUser(admin);
        this.round = 0;
        this.cardSet = cardSet;
        this.rounds = rounds;
        this.spotifyService = spotifyService;

        // TODO: Checar se a playlist pode comportar o número de rounds
    }

    joinUser(user) {
        const newUser = {
            user,
            points: 0,
            deck: [],
        };
        this.users.push(newUser);
    }

    distributeDeck() {
        if (this.round === 0) {
            // montar o deck
            // ir para o round 1
        } else {
            throw new Error('DeckAlreadyDistributed');
        }
    }

    runRound() {
        // limpa a mesa
        // define um critério
    }

    finishRound() {
        // checa se todo mundo já jogou
        // calcula o maior ponto (e se empatar?)
        // finaliza o round e vai pro próximo, ou termina o jogo
    }

    disposeCard(user, card) {
        // verifica se o usuário pode disposar a carta
        // se sim, coloca null no deck dele e joga a carta na mesa.

        this.finishRound();
    }
}