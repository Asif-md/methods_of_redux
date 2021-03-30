import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeFirst } from 'utils/helpers';

const SomethingWentWrong = (props) => {
  const { errorMessage } = props;
  return (
    <p className="text-center lead">
      {capitalizeFirst(errorMessage)}.
      <a href="#" onClick={()=>{window.location.reload()}}>Click Here</a> to refresh
    </p>
  ) 
};

SomethingWentWrong.propTypes = {
  errorMessage: PropTypes.string.isRequired
}


export default SomethingWentWrong;
