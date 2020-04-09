import { environment } from '../temp/environment';
import { Card } from './game';
import SpotifyWebApi from 'spotify-web-api-node';

export type PlaylistDeck = {
    deckTitle: string,
    cards: Card[]
};
export class SpotifyService {

    spotifyApi: SpotifyWebApi;

    constructor() {
        this.spotifyApi = new SpotifyWebApi({
            clientId: environment.spotifyClientId,
            clientSecret: environment.spotifyClientSecret
        });
    }

    async fetchToken() {
        try {
            const data = await this.spotifyApi.clientCredentialsGrant();
            this.spotifyApi.setAccessToken(data.body['access_token']);
        } catch (error) {
            throw error;
        }
    }

    async getDeckFromPlaylist(playlistId: string, amountOfCards: number = null) {
        let playlist;
        let audioFeatures;
        const trackIds = [];
        const cards: Card[] = [];

        try {
            await this.fetchToken();

            // TODO: Não funciona para playlists maiores que 100.
            playlist = await this.spotifyApi.getPlaylist(playlistId);

            // TODO: Talvez randomizar para pegar o valor máximo.
            if (amountOfCards != null && playlist.body.track.items.length !== amountOfCards) {
                throw new Error('PlaylistLengthDoesNotMatch');
            }

            for (const item of playlist.body.tracks.items) {
                trackIds.push(item.track.id);
            }

            audioFeatures = await this.spotifyApi.getAudioFeaturesForTracks(trackIds);

            for (const item of playlist.body.tracks.items) {
                const audioFeature = audioFeatures.body['audio_features'].find(x => x.id === item.track.id);

                cards.push({
                    id: item.track.id,
                    imageUrl: item.track.album.images[0].url,
                    name: item.track.name,
                    artist: item.track.artists[0].name,
                    album: item.track.album.name,
                    popularity: item.track.popularity,
                    danceability: audioFeature.danceability,
                    energy: audioFeature.energy,
                    loudness: audioFeature.loudness,
                    speechiness: audioFeature.speechiness,
                    acousticness: audioFeature.acousticness,
                    instrumentalness: audioFeature.instrumentalness,
                    liveness: audioFeature.liveness,
                    valence: audioFeature.valence,
                    tempo: audioFeature.tempo,
                    duration: item.track.duration_ms / 1000,
                    used: true
                });
            }
        } catch (error) {
            throw error;
        }
        const playlistDeck: PlaylistDeck = {
            deckTitle: playlist.body.name,
            cards
        };
        return playlistDeck;
    }

}