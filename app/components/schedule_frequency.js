/**
 * @author ashwin.raghavan
 */
import React, { PropTypes } from "react";

const entryTypes = ["MINUTES", "HOURS", "DAYS", "MONTHS"];
class ScheduleFrequency extends React.Component {
  getData = () => {
    const { entryType } = this.refs;
    return entryType.value;
  };

  render() {
    return (
      <div className="form-group">
        <label className="control-label">Unit</label>
        <select
          className="form-control"
          defaultValue={this.props.defaultValue}
          disabled={this.props.disabled}
          ref="entryType"
        >
          {entryTypes.map(entryType => {
            return (
              <option key={`sub-option-${entryType}`} value={entryType}>
                {entryType}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default ScheduleFrequency;
