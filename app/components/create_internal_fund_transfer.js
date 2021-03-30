import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import Form from "components/form";
import Input from "components/input";
import AccountSearchFormGroup from "components/account_search_form_group";

class CreateInternalFundTransfer extends React.Component{
  getData = () => {
    const {
      amount,
      remarks,
    } = this.refs;

    const fromParty = this.props.report.fromPartySearchResult;
    const toParty = this.props.report.toPartySearchResult;

    return {
      fromAccountId: fromParty.details.id,
      toAccountId: toParty.details.id,
      amount: amount.value(),
      remarks: remarks.value()
    }
  }

  render() {

    const { report } = this.props;

    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.attemptCreateInternalFundTransfer}>
          <h1 className="page-header">
            <span className="required-message">All fields are required</span>
            Create Internal Fund Transfer
          </h1>

          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <AccountSearchFormGroup
                  ref="fromPartySearch"
                  forComponent="report"
                  required={true}
                  searchingFor="FromParty"
                  searchResult={report.fromPartySearchResult}
                  multiFindInput={this.props.multiFindInput}
                  multiFindSearch={this.props.multiFindSearch}
                  multiFindLock={this.props.multiFindLock}
                  editLock={this.props.editLock}/>
              </div>
              <div className="col-md-6">
                <AccountSearchFormGroup
                  ref="toPartySearch"
                  forComponent="report"
                  required={true}
                  searchingFor="ToParty"
                  searchResult={report.toPartySearchResult}
                  multiFindInput={this.props.multiFindInput}
                  multiFindSearch={this.props.multiFindSearch}
                  multiFindLock={this.props.multiFindLock}
                  editLock={this.props.editLock}/>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <label className="control-label">Amount:</label>
                <Input ref="amount" maxLength={20} />
              </div>
              <div className="col-md-6">
                <label className="control-label">Remarks:</label>
                <Input ref="remarks" maxLength={100} />
              </div>
            </div>
          </div>
          <button className="btn btn-lg btn-block btn-success">Create Internal Fund Transfer</button>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInternalFundTransfer);
