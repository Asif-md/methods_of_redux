import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import Form from 'components/form';
import Input from 'components/input';
import ReportTypeFormGroup from 'components/report_type_form_group';
import PartySearchFormGroup from 'components/party_search_form_group';
import { dateStringToISO } from 'utils/helpers';

class CreateReport extends React.Component{
  componentDidMount() {
    this.props.listReportTypes();
  }

  getData = () => {
    const {
      reportType,
      startTime,
      endTime
    } = this.refs;

    const fromParty = this.props.report.fromPartySearchResult;
    const toParty = this.props.report.toPartySearchResult;

    return {
      type: reportType.value(),
      fromPartyId: fromParty.details.id,
      fromPartyType: fromParty.details.entryType,
      toPartyId: toParty.details.id,
      toPartyType: toParty.details.entryType,
      startTime: dateStringToISO(startTime.value),
      endTime: dateStringToISO(endTime.value)
    };
  }

  render() {
    const { report } = this.props;

    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.createReport}>
          <h1 className="page-header">
            <span className="required-message">All fields are required</span>
            Generate Report
          </h1>

          <div className="row">
            <div className="col-md-6">
              <ReportTypeFormGroup
                ref="reportType"
                reportTypes={report.reportTypes} />

              <PartySearchFormGroup
                ref="fromPartySearch"
                forComponent="report"
                required={true}
                searchingFor="FromParty"
                searchResult={report.fromPartySearchResult}
                multiFindInput={this.props.multiFindInput}
                multiFindSearch={this.props.multiFindSearch}
                multiFindLock={this.props.multiFindLock}
                editLock={this.props.editLock}
                multiFindClear={this.props.multiFindClear}
              />

              <PartySearchFormGroup
                ref="toPartySearch"
                forComponent="report"
                required={false}
                searchingFor="ToParty"
                searchResult={report.toPartySearchResult}
                multiFindInput={this.props.multiFindInput}
                multiFindSearch={this.props.multiFindSearch}
                multiFindLock={this.props.multiFindLock}
                editLock={this.props.editLock}
                multiFindClear={this.props.multiFindClear}
              />
            </div>
            <div className="col-md-6 col-md-offset-6"></div>
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label">Start Time:</label>
                <input
                  className="form-control" type="text"
                  placeholder="DD/MM/YYYY 12:00 am"
                  required = {true}
                  ref="startTime"/>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label">End Time:</label>
                <input
                  className="form-control" type="text"
                  placeholder="DD/MM/YYYY 12:00 am"
                  required = {true}
                  ref="endTime"/>
                </div>
            </div>
            <div className="col-md-6 col-md-offset-6"></div>
            <div className="col-md-6">
              <button
                className="btn btn-lg btn-block btn-success">Generate Report</button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReport);
