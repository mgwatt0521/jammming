import React from 'react';
import PropTypes from 'prop-types';
import './PlaylistComponent.css';

// Components
import { TrackList } from '../TrackList/TrackList';

// Data structure
import { Playlist  } from '../../Classes/Model/Playlist';

class PlaylistComponent extends React.Component {

  //==========================================================================
  // Initialization
  //==========================================================================

  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  //==========================================================================
  // Component lifecycle
  //==========================================================================

  render() {
    return (
      <div className="PlaylistComponent">
        <input
          defaultValue={this.props.playlist.name}
          onChange={this.handleNameChange} />
        <TrackList
          tracks={this.props.playlist.tracks}
          onRemove={this.props.onRemove}
          isRemoval={true}/>
        <button
          className="PlaylistComponent-save"
          onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }

  //==========================================================================
  // Actions
  //==========================================================================
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }
}

PlaylistComponent.propTypes = {
  playlist:           PropTypes.instanceOf(Playlist),
  onRemove:           PropTypes.func,
  onNameChange:       PropTypes.func,
  onSave:             PropTypes.func
};

export { PlaylistComponent };
