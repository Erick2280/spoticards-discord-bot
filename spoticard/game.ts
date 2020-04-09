enum GameTypes { Classic, Hidden, CustomDeck }
type User = {
    user: string,
    points: number,
    deck: Card[],
    spotifyToken: string
}
type Card = {};
type TableSpace = {
    user: User,
    card: Card
}

export class Game {
    identifier: number;
    admin: string;
    users: User[];
    cardSet: string;
    round: number;
    rounds: number;
    table: TableSpace[];

    constructor(identifier: number, admin: string, cardSet: string, rounds: number) {
        this.identifier = identifier
        this.admin = admin
        this.users = []
        this.users.push(this.newUser(admin))
        this.round = 0;
        this.cardSet = cardSet
        this.rounds = rounds;
    }

    newUser(user): User {
        return {
            user,
            points: 0,
            deck: [],
            spotifyToken: '',
        }
    }

    distributeDeck() {
        if (this.round === 0) {
            // montar o deck
            // ir para o round 1
        } else {
            throw new Error('deckAlreadyDistributed')
        }
    }

    runRound() {
        // limpa a mesa
    }

    finishRound() {
        // checa se todo mundo já jogou
        // calcula o maior ponto
        // finaliza o round e vai pro próximo, ou termina o jogo
    }

    disposeCard(user, card) {
        // verifica se o usuário pode disposar a carta
        // se sim, coloca null no deck dele e joga a carta na mesa.

        this.finishRound()
    }
}