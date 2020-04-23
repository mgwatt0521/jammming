class Playlist {
  constructor() {
    this._name = 'New Playlist';
    this._tracks = [];
  }

  //==========================================================================
  // Getters / setters
  //==========================================================================

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get tracks() {
    return this._tracks;
  }

  //==========================================================================
  // Helpers
  //==========================================================================
  addTrack(track) {
    this._tracks.push(track);
  }

  addTracks(tracks) {
    this._tracks = this._tracks.concat(tracks);
  }

  removeTrack(track) {
    let indexToRemove = this._tracks.indexOf(track);
    if (indexToRemove !== -1) {
      this._tracks.splice(indexToRemove, 1);
    }
  }

  reset() {
    this._name = 'New Playlist';
    this._tracks = [];
  }
}

export { Playlist };
