import { ClassicGame } from './classic-game';
import { Criterion } from '../game';

export class ThoroughGame extends ClassicGame {

    gameTypeName = 'Minucioso';
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
        variableName: 'artist',
        variableType: 'string',
        variableComparator: '>'
    },
    {
        name: 'Álbum com menor nome',
        variableName: 'artist',
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

}