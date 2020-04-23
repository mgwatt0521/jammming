class Track {
  constructor(name, artist, album, id, uri) {
    this._name = name;
    this._artist = artist;
    this._album = album;
    this._id = id;
    this._uri = uri;
  }

  get name() {
    return this._name;
  }

  get artist() {
    return this._artist;
  }

  get album() {
    return this._album;
  }

  get id() {
    return this._id;
  }

  get uri() {
    return this._uri;
  }
}

export { Track };
