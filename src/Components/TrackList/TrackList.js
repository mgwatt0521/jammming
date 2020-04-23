import React from 'react';
import PropTypes from 'prop-types';
import './TrackList.css';

// Components
import { TrackItem } from '../TrackItem/TrackItem';

// Data structure
import { Track } from '../../Classes/Model/Track';


class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map((track, index) => {
            return (
              <TrackItem
                key={/*track.id*/index}
                track={track}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval}/>
            );
          })
        }
      </div>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.instanceOf(Track)),
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  isRemoval: PropTypes.bool
};

export { TrackList };
