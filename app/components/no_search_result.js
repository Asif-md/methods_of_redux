import React from 'react';
import PropTypes from  'prop-types';

const NoSearchResult = (props) => {
  const { query } = props;
  return (
    <div className="form-group search-error">
      <p>Your Search - <b>"{query}"</b> - did not match</p>
      <p><b>Suggestions:</b></p>
      <ul>
        <li>Make sure that all words are spelled correctly.</li>
        <li>Try a different search.</li>
      </ul>
    </div>
  );
}

NoSearchResult.propTypes = {
  query: PropTypes.string.isRequired
};

export default NoSearchResult;
