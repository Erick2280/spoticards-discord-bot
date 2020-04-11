import { ClassicGame } from './classic-game';
import { Criterion } from '../game';
import { SpotifyService } from '../spotify-service';

export class CustomCriteriaGame extends ClassicGame {

    gameTypeName = 'Critérios Personalizados';
    criteria = [];

    constructor(identifier: number,adminUserName: string, rounds: number, spotifyService: SpotifyService,
        playlistId: string, criteria: Criterion[]) {
        super(identifier, adminUserName, rounds, spotifyService, playlistId);

        if (criteria.length === 0) {
            throw new Error('MissingCriteria');
        }
        this.criteria = criteria;
    }
}