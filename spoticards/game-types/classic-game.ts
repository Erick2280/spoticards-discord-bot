import { SpotifyService, PlaylistDeck } from '../spotify-service';
import { Game, Criterion } from '../game';
import { shuffleArray, generateRandomInteger } from '../utils';

export class ClassicGame extends Game {

    playlistId: string;
    globalDeck: PlaylistDeck;
    deckIsBeingMounted: boolean;
    selectedCriterion: number;
    gameTypeName = 'Clássico';

    readonly criteria: Criterion[] = [{
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
        }
    ];

    constructor(identifier: number, adminUserName: string, rounds: number, spotifyService: SpotifyService, playlistId: string) {
        super(identifier, adminUserName, rounds, spotifyService);
        this.playlistId = playlistId;
        this.deckIsBeingMounted = false;
        this.addPlayer(adminUserName);
    }

    async distributeDeck() {
        if (this.round !== 0) {
            throw new Error('DeckAlreadyDistributed');
        }

        // if (this.players.length < 2) {
        //     throw new Error('NotEnoughPlayersToStartGame');
        // }

        this.deckIsBeingMounted = true;

        try {
            this.globalDeck = await this.spotifyService.getDeckFromPlaylist(this.playlistId);
            const cardsUsedFromDeck = this.rounds * this.players.length;

            if (this.globalDeck.cards.length < cardsUsedFromDeck) {
                throw new Error('GlobalDeckTooSmall');
            }

            // Primeiro, sorteia o deck global
            shuffleArray(this.globalDeck.cards);

            // Depois, distribui as cartas para cada jogador.
            for (const player of this.players) {
                player.deck = this.globalDeck.cards.splice(0, this.rounds);
            }

        } catch (error) {
            throw error;
        } finally {
            this.deckIsBeingMounted = false;
        }

        // Por fim, inicia a primeira rodada.
        this.gameIsRunning = true;
        this.runRound();

    }

    runRound() {
        if (this.deckIsBeingMounted) {
            throw new Error('DeckIsBeingMounted');
        }
        this.round += 1;

        // Limpa a mesa
        this.table = [];

        // Define um critério
        this.selectedCriterion = generateRandomInteger(0, this.criteria.length - 1);
    }

    finishRound() {
        // Verifica se todos os jogadores jogaram
        if (this.table.length !== this.players.length) {
            return null;
        }

        // Carrega e organiza a mesa pelo critério
        const criterion = this.criteria[this.selectedCriterion];

        if (criterion.variableType === 'string') {
            if (criterion.variableComparator === '>') {
                this.table.sort((a, b) => b.card[criterion.variableName].length - a.card[criterion.variableName].length);
            }
            if (criterion.variableComparator === '<') {
                this.table.sort((a, b) => a.card[criterion.variableName].length - b.card[criterion.variableName].length);
            }

            const winnerValue = this.table[0].card[criterion.variableName].length;
            for (const tableSpace of this.table) {
                if (tableSpace.card[criterion.variableName].length === winnerValue) {
                    tableSpace.player.points += 1;
                } else {
                    break;
                }
            }
        }

        if (criterion.variableType === 'number') {
            if (criterion.variableComparator === '>') {
                this.table.sort((a, b) => b.card[criterion.variableName] - a.card[criterion.variableName]);
            }
            if (criterion.variableComparator === '<') {
                this.table.sort((a, b) => a.card[criterion.variableName] - b.card[criterion.variableName]);
            }

            const winnerValue = this.table[0].card[criterion.variableName];
            for (const tableSpace of this.table) {
                if (tableSpace.card[criterion.variableName] === winnerValue) {
                    tableSpace.player.points += 1;
                } else {
                    break;
                }
            }
        }

        const roundFinishData = {
            round: this.round,
            selectedCriterion: this.selectedCriterion,
            table: this.table,
        };

        // Continua o jogo se não for a úlitma rodada.
        if (this.round < this.rounds) {
            this.runRound();
        } else {
            this.gameIsRunning = false;
            this.round = 0;
        }
        return roundFinishData;

    }

    disposeCard(userName: string, cardIndex: number) {

        if (!this.gameIsRunning || this.deckIsBeingMounted) {
            throw new Error('GameIsNotRunning');
        }

        if (this.table.find(tableSpace => tableSpace.player.userName === userName)) {
            throw new Error('PlayerAlreadyDisposedCardInThisRound');
        }

        const player = this.players.find(x => x.userName === userName);
        if (player === null) {
            throw new Error('PlayerIsNotFound');
        }

        const card = player.deck[cardIndex];
        if (card.used) {
            throw new Error('PlayerCardAlreadyUsed');
        }

        card.used = true;
        const newTableSpace = {
            player,
            card
        };
        this.table.push(newTableSpace);
        return this.finishRound();
    }

}