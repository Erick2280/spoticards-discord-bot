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
};