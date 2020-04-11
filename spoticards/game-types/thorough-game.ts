import { ClassicGame } from './classic-game';
import { Criterion, allCriteria } from '../game';

export class ThoroughGame extends ClassicGame {

    gameTypeName = 'Minucioso';
    readonly criteria: Criterion[] = allCriteria;

}