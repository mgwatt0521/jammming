import React from 'react';
import './TrackItem.css';
import PropTypes from 'prop-types';

// Data structure
import { Track } from '../../Classes/Model/Track';

class TrackItem extends React.Component {

  //==========================================================================
  // Initialization
  //==========================================================================
  constructor(props) {
    super(props);

    // Bind `this`
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  //==========================================================================
  // Component lifecycle
  //==========================================================================
  render() {
    const track = this.props.track;
    return (
      <div className="TrackItem">
        <div className="TrackItem-information">
          <h3>{track.name}</h3>
          <p>{`${track.artist} | ${track.album}`}</p>
        </div>
        <button
          className="TrackItem-action"
          onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>{this.renderAction(this.props.isRemoval || false)}</button>
      </div>
    );
  }

  //==========================================================================
  // Actions
  //==========================================================================
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  //==========================================================================
  // Helpers
  //==========================================================================
  renderAction(isRemoval) {
    return isRemoval ? '-' : '+';
  }
}

TrackItem.propTypes = {
  id: PropTypes.string,
  track: PropTypes.instanceOf(Track),
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  isRemoval: PropTypes.bool
};

export { TrackItem };
