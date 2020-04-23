// Models
import { Track  } from '../Model/Track';
import { Errors } from '../Model/Errors';

// Constants
const clientId = '35fb3a2e867940aab4dbea12a4e86949';
const redirectUri = 'http://localhost:3000';

class SpotifyService {

  //==========================================================================
  // Initialization
  //==========================================================================
  constructor() {
    this._accessToken = '';
  }

  //==========================================================================
  // Public API
  //==========================================================================

  async search(term) {
    const accessToken = this.getAccessToken();
    let response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term || ''}`,
      {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
    );

    let json;
    try {
      json = await response.json();
    } catch(e) {
      return Promise.reject(e);
    }

    if (json && json['tracks'] && json['tracks']['items']) {
      return Promise.all(
        json.tracks.items.map(track => {
          return new Track(
            track.name,
            track.artists[0].name,
            track.album.name,
            track.id,
            track.uri
          );
        })
      );
    } else {
      return Promise.resolve([]);
    }
  }

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris) {
      return Promise.reject(Errors.missingParams);
    }

    const token = this.getAccessToken();

    // get userID
    let userId;
    const getUserResponse = await fetch(
      'https://api.spotify.com/v1/me',
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );

    const getUserJson = await getUserResponse.json();
    userId = getUserJson.id;

    // Create a playlist
    const createPlaylistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: 'POST',
        headers:
        {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
      }
    );
    const createPlaylistJson = await createPlaylistResponse.json();
    const playlistID = createPlaylistJson.id;

    // Add tracks
    const addTracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      {
        method: 'POST',
        headers:
        {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: trackUris })
      }
    );

    return addTracksResponse.json();
  }

  getAccessToken() {
    if (this._accessToken) {
      return this._accessToken;
    }

    let accessTokenFound = window.location.href.match(/access_token=([^&]*)/);
    let expiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenFound && expiresIn) {
      this._accessToken = accessTokenFound[1];
      const expiresInNum = Number(expiresIn[1]);

      window.setTimeout(() => { this._accessToken = '' }, expiresInNum * 1000);
      window.history.pushState('Access Token', null, '/');
      return this._accessToken;
    } else {
      window.location = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectUri;
    }
  }
}

const sharedInstance = new SpotifyService();

export { sharedInstance as spotifyService };
