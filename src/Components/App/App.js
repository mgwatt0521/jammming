import React from 'react';
import './App.css';

// Components
import { SearchBar         } from '../SearchBar/SearchBar';
import { SearchResults     } from '../SearchResults/SearchResults';
import { PlaylistComponent } from '../PlaylistComponent/PlaylistComponent';

// Data structure
import { Playlist } from '../../Classes/Model/Playlist';

// Services
import { spotifyService } from '../../Classes/Services/Spotify';

class App extends React.Component {
  //==========================================================================
  // Initialization
  //==========================================================================
  constructor(props) {
    super(props);

    let playlist = new Playlist();
    this.state = {
      searchResults: [],
      playlist: playlist
    };

    // Bind `this`
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //==========================================================================
  // Component lifecycle
  //==========================================================================
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}/>
            <PlaylistComponent
              playlist={this.state.playlist}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }

  //==========================================================================
  // Actions
  //==========================================================================

  search(term) {
    spotifyService.search(term).then((tracks) => {
      this.setState({
        searchResults: tracks
      });
    });
  }

  savePlaylist() {
    const trackUris = this.state.playlist.tracks.map((track) => {
      return `spotify:track:${track.id}`;
    });

    spotifyService.savePlaylist(this.state.playlist.name, trackUris).then((json) => {
        console.log('Playlist created! snapshot_id = ' + json.snapshot_id);
        let playlist = this.state.playlist;
        playlist.reset();
        this.setState({
          playlist: playlist
        });
    }).catch((error) => {
      let playlist = this.state.playlist;
      playlist.reset();
      this.setState({
        playlist: playlist
      });
      console.log('An error occurred while trying to save the playlist!');
    });
  }

  addTrack(track) {
    let playlist = this.state.playlist;
    // TODO - could move the inclusion check into the playlist obj itself
    if (!playlist.tracks.includes(track)) {
      playlist.addTrack(track);
      this.setState({
        playlist: playlist
      });
    }
  }

  removeTrack(track) {
    let playlist = this.state.playlist;
    playlist.removeTrack(track);
    this.setState({
      playlist: playlist
    });
  }

  updatePlaylistName(name) {
    let playlist = this.state.playlist;
    playlist.name = name;
    this.setState({
      playlist: playlist
    });
  }
}

export { App };
