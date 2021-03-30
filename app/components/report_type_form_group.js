import React  from 'react';
import PropTypes from 'prop-types';
import PleaseWait from 'components/please_wait';

class ReportTypeFormGroup extends React.Component{
  
  value = () => {
    return this._input ? this._input.value : null;
  }
  renderReportTypes = () => {
    const { reportTypes } = this.props;

    return (
      <select
        ref={(c) => this._input = c}
        className="form-control"
        required = {true}>
        <option value="">Select Report Type</option>
        {
          reportTypes.map((reportType) => {
            return (
              <option
                key={`report-type-${reportType}`}
                value={reportType}>
                {reportType}
              </option>
            );
          })
        }
      </select>
    );
  }

  renderData = () => {
    const { reportTypes } = this.props;

    if (reportTypes.length === 0) {
      return (<PleaseWait style="inline" />);
    } else {
      return this.renderReportTypes();
    }
  }

  render() {
    return (
      <div className="form-group">
        <label className="control-label">Report Type:</label>
        {this.renderData()}
      </div>
    );
  }
}

ReportTypeFormGroup.propTypes = {
  reportTypes: PropTypes.array
}

ReportTypeFormGroup.defaultProps = {
  reportTypes: []
}

export default ReportTypeFormGroup;
