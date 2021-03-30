import React from "react";
import PropTypes from "prop-types";
class Form extends React.Component {
  onSubmit = event => {
    event.preventDefault();

    const {
      serializeForm,
      validateForm,
      submitAction,
      invalidForm,
      editStatus,
      id
    } = this.props;
    const data = serializeForm();

    const { validationStatus, errorMessage } = validateForm(data);
    if (validationStatus) {
      if (editStatus) {
        submitAction(data, id);
      } else {
        submitAction(data);
      }
    } else {
      invalidForm(errorMessage);
    }
  };

  render() {
    return <form onSubmit={this.onSubmit}>{this.props.children}</form>;
  }
}

Form.propTypes = {
  serializeForm: PropTypes.func.isRequired,
  submitAction: PropTypes.func.isRequired,
  validateForm: PropTypes.func,
  editStatus: PropTypes.bool,
  id: PropTypes.string
};

Form.defaultProps = {
  validateForm: _ => {
    return {
      validationStatus: true,
      errorMessage: null
    };
  },
  editStatus: false
};

export default Form;
