import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class NavLink extends React.Component{

  render() {
    let { staticContext, ...rest } = this.props;
    const isActive = this.props.location.pathname === this.props.to;
    let className = isActive ? "active" : "";
    return (
      <li className={className}>
        <Link to={rest.to}>
          {this.props.children}
        </Link>
      </li>
    );
  }
}

export default withRouter(NavLink);
