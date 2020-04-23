import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';

// Components
import { TrackList } from '../TrackList/TrackList';

// Data structure
import { Track } from '../../Classes/Model/Track';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          tracks={this.props.searchResults}
          onAdd={this.props.onAdd}
          isRemoval={false}/>
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.instanceOf(Track)),
  onAdd: PropTypes.func
};

export { SearchResults };
