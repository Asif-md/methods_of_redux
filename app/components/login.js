import React from "react";
import { connect } from "react-redux";
import { forwardToRootPath } from "routes";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";

class Login extends React.Component {
  componentDidMount() {
    if (this.props.user.loggedIn) {
      forwardToRootPath();
    } else {
      this.refs.login.focus();
    }
  }

  resetForm = () => {
    const form = this.refs.loginForm;
    form.reset();
  };

  onCancel = event => {
    event.preventDefault();
    this.resetForm();
  };

  onSubmit = event => {
    event.preventDefault();
    const login = this.refs.login.value;
    const password = this.refs.password.value;
    this.props.attemptLogin(login, password);
    this.resetForm();
  };

  render() {
    return (
      <form
        className="form"
        id="login-form"
        ref="loginForm"
        onSubmit={this.onSubmit}
      >
        <div className="form-group">
          <input
            className="form-control"
            ref="login"
            id="login"
            type="text"
            placeholder="Login"
            required={true}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            ref="password"
            id="password"
            type="password"
            placeholder="Password"
            required={true}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Login
          </button>
        </div>
        <div className="form-group">
          or{" "}
          <a href="#" onClick={this.onCancel}>
            cancel
          </a>
        </div>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
