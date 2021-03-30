import React from "react";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";

class PleaseWait extends React.Component {
  renderLoading = props => {
    const message = this.props.message;
    return (
      <CircularProgress disableShrink />
      //   <p className="text-center lead">
      //   ... Please wait
      // </p>
    );
  };

  renderInline = () => {
    return (
      <span className="help-block">Options will be fetched form backend</span>
    );
  };

  render() {
    const style = this.props.style;
    if (style === "loading") {
      return this.renderLoading();
    } else {
      return this.renderInline();
    }
  }
}

PleaseWait.propTypes = {
  message: PropTypes.string,
  style: PropTypes.string
};

PleaseWait.defaultProps = {
  message: "Loading",
  style: "loading"
};

export default PleaseWait;
