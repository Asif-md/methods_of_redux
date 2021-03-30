import React from "react";
import PropTypes from 'prop-types';
import * as validators from "utils/validations";

const EMAIL_TYPE = "email";
const SELECT_TYPE = "select";

class Input extends React.Component{ 

  componentDidMount() {
    if (this.props.focus) {
      this._input.focus();
    }
  }

  value = () =>  {
    return this._input.value;
  }

  pattern = () => {
    const { maxLength, requiredLength, type ,pattern } = this.props;
    if (type === EMAIL_TYPE) {
      return validators.EMAIL_REGEX;
    } 
    else if (type === 'text' && pattern){
      return `^[_A-z/\s/ ]*((-|\\S)*[_A-z])*$`
    }
    else if(type ==='tel'){
      return '[0-9]{10}'
    }
    else if (maxLength)  {
      return `.{1,${maxLength}}`;
    } else if (requiredLength) {
      return `.{${requiredLength},${requiredLength}}`;
    } else {
      return null;
    }
  }

  customValidationMessage = () => {
    const { maxLength, requiredLength, type ,pattern } = this.props;
    if (type === EMAIL_TYPE) {
      return 'Require a valid email';
    } 
    else if (type === 'text' && pattern)  {
      return `Require valid Name `;
    }
    else if(type==='tel') {
      return `Enter a 10 Digits Mobile Number`;
    }
    else if (maxLength)  {
      return `Maximum ${maxLength} chars`;
    } else if (requiredLength) {
      return `Require ${requiredLength} chars`;
    } else {
      return null;
    }
  
}

  onInvalidHook = (validator) => {
    const { maxLength, requiredLength, type } = this.props;

    if (maxLength || requiredLength || type === EMAIL_TYPE)  {
      return validator;
    } else {
      return null;
    }
  }

  renderSelect = () => {
    const { required, defaultValue } = this.props;

    return (
      <select
        ref={(c) => this._input = c}
        className="form-control"
        defaultValue={defaultValue}
        required={required}>
        {this.props.children}
      </select>
    );
  }

  renderInput = () => {
    const { type, required, maxLength, defaultValue ,disabled} = this.props;

    return (
      <input
        ref={(c) => this._input = c}
        className="form-control" type={type}
        required={required}
        defaultValue={defaultValue}
        pattern={this.pattern()}
        data-custom-validation-message={this.customValidationMessage()}
        onInvalid={this.onInvalidHook(validators.setCustomValidationMessage)}
        onInput={this.onInvalidHook(validators.resetCustomValidationMessage)}
        disabled={disabled}
      />
    );
  }

  render() {
    const { type } = this.props;

    if (type === SELECT_TYPE) {
      return this.renderSelect();
    } else {
      return this.renderInput();
    }
  }
}

Input.propTypes = {
  focus: PropTypes.bool,
  type: PropTypes.string,
  required: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  selected: PropTypes.string,
  maxLength: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  requiredLength: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ])
}

Input.defaultProps = {
  type: "text",
  focus: false,
  required: true,
  maxLength: false,
  requiredLength: false,

}

export default Input;
