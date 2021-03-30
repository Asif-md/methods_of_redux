import React from 'react';
import PropTypes from 'prop-types';

const SearchResult = (props) => {
  const {
    query,
    result,
    subResult,
    onClick,
    searchIndex,
    index
  } = props;

  return (
    <div className="well form-group">
      <p><b>Search result for "{query}":</b></p>
      <p className="lead">
        {result},<br/>
        {subResult}
      </p>
      <button
        onClick={(event) => onClick(event,searchIndex,index)}
        className="btn btn-block btn-primary">OK</button>
    </div>
  );
}

SearchResult.propTypes = {
  query: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  subResult: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SearchResult;
