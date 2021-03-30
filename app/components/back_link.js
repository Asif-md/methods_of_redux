import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

class BackLink extends React.Component{

  render() {
    const { to } = this.props;

    return (
      <Link className="btn btn-link" to={to}>
        <span className="glyphicon glyphicon-menu-left"></span>
        Go Back
      </Link>
    );
  }
}

BackLink.propTypes = {
  to: PropTypes.string.isRequired
}
export default BackLink;
