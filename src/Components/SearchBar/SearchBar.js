import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends React.Component {
  //==========================================================================
  // Initialization
  //==========================================================================
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      term: ''
    };

    // Bind `this`
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  //==========================================================================
  // Component lifecycle
  //==========================================================================
  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange} />
        <button
          className="SearchButton"
          onClick={this.search}>SEARCH</button>
      </div>
    );
  }

  //==========================================================================
  // Actions
  //==========================================================================
  handleTermChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
};

export { SearchBar };
