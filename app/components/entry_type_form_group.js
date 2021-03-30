import React from 'react';

class EntryTypeFormGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  getData = () => {
    const { entryType } = this.refs;
    return {
      entryType: entryType.value
    };
  }
  onChange = (event) => {
    this.setState({
      value: event.target.value
    })
    this.props.onChange();
  }

  render() {
    return (
      <div className="form-group">
        <label className="control-label">Entry Type:</label>
        <select
          className="form-control"
          value={this.state.value ? this.state.value : this.props.defaultValue}
          required={this.props.required || false}
          onChange={this.onChange}
          ref="entryType">
          <option value="">Select Entry Type</option>
          <option value="AP">AP</option>
          <option value="AR">AR</option>
        </select>
      </div>
    );
  }
}
EntryTypeFormGroup.defaultProps = {
  defaultValue: ''
}


export default EntryTypeFormGroup;
