import React from "react";
import PropTypes from "prop-types";

class Boolean extends React.Component {
  renderTrue = () => {
    const { trueStatus, trueText } = this.props;
    return <label className={`label ${trueStatus}`}>{trueText}</label>;
  };

  renderFalse = () => {
    const { falseStatus, falseText } = this.props;
    return <label className={`label ${falseStatus}`}>{falseText}</label>;
  };

  render() {
    const flag = this.props.flag;
    return flag ? this.renderTrue() : this.renderFalse();
  }
}

Boolean.propTypes = {
  flag: PropTypes.bool,
  trueText: PropTypes.string,
  falseText: PropTypes.string,
  trueStatus: PropTypes.string,
  falseStatus: PropTypes.string
};

Boolean.defaultProps = {
  trueText: "true",
  falseText: "false",
  trueStatus: "label-success",
  falseStatus: "label-danger"
};

export default Boolean;
