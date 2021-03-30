import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import classNames from "classnames";

import NavLink from "components/nav_link";
import logo from "images/logo.png";

import * as routes from "routes";

class Header extends React.Component {
  onCloseMessage = event => {
    event.preventDefault();
    this.props.clearTransactionalMessages();
  };

  renderAuthLinks = () => {
    const loggedIn = this.props.user.loggedIn;
    if (loggedIn) {
      return <NavLink to={routes.LOGOUT_PATH}>Logout</NavLink>;
    } else {
      return <NavLink to={routes.LOGIN_PATH}>Login</NavLink>;
    }
  };

  renderHeaderNav = () => {
    return (
      <div>
        <div className="container">
          <div className="navbar-header">
            <Link to={routes.ROOT_PATH} className="navbar-brand">
              <img src={logo} alt="logo" />
              PhonePe
            </Link>
          </div>
          <nav id="bs-navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className="welcome-note">{this.renderSessionMessage()}</li>
              <li className="divider" role="separator" />
              <NavLink to={routes.ROOT_PATH}>Dashboard</NavLink>
              <li className="divider" role="separator" />
              {this.renderAuthLinks()}
            </ul>
          </nav>
        </div>
      </div>
    );
  };

  renderSessionMessage = () => {
    const message = this.props.message.loginSuccess;

    if (message) {
      return <p>{message}</p>;
    } else {
      return null;
    }
  };

  renderMessage = () => {
    const successMessage = this.props.message.success;
    const errorMessage = this.props.message.error;
    const infoMessage = this.props.message.info;
    const message = successMessage || errorMessage || infoMessage;
    var jumbotronClass = classNames({
      "text-center alert alert-fixed-top": true,
      "alert-danger": errorMessage,
      "alert-success": successMessage,
      "alert-info": infoMessage
    });

    if (message) {
      return (
        <div className={jumbotronClass}>
          <button type="button" onClick={this.onCloseMessage} className="close">
            &times;
          </button>
          {message}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const successMessage = this.props.message.success;
    const errorMessage = this.props.message.error;
    const infoMessage = this.props.message.info;

    return (
      <div>
        <header
          className="navbar navbar-default navbar-fixed-top"
          role="banner"
        >
          {this.renderHeaderNav()}
        </header>
        {this.renderMessage()}
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
