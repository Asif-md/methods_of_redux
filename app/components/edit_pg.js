/**
 * @author ashwin.raghavan
 */

import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import Form from "components/form";
import Input from "components/input";
import {Link} from "react-router-dom";
import * as routes from "routes";

class EditPG extends React.Component{

  componentDidMount() {
    const { params } = this.props.match;
    params && params.accountId && this.props.showAccount(params.accountId);
  }

  getData = () => {
    const {
      name,
      accountNo,
      accountType,
      ifsc
    } = this.refs;

    return {
      name: name.value(),
      accountNo: accountNo.value(),
      accountType: accountType.value(),
      ifsc: ifsc.value()
    };
  }

  render() {
    const { account } = this.props;

    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.attemptEditAccount}
          editStatus={true}
          id={account.id}>
          <h1 className="page-header">
            <span className="required-message">All fields are required</span>
            Edit Account
          </h1>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Account Name:</label>
                <Input ref="name" defaultValue={account.name} focus={true} maxLength={100}/>
              </div>
              <div className="form-group">
                <label className="control-label">Account Number:</label>
                <Input ref="accountNo" defaultValue={account.accountNo} />
              </div>
              <div className="form-group">
                <label className="control-label">Account Type:</label>
                <Input ref="accountType" defaultValue={account.accountType} type="select">
                  <option>NODAL</option>
                  <option>CURRENT</option>
                  <option>SAVING</option>
                  <option>USER</option>
                </Input>
              </div>
              <div className="form-group">
                <label className="control-label">IFSC:</label>
                <Input ref="ifsc" defaultValue={account.ifsc} />
              </div>
              <div className="form-group">
                <button className="btn btn-lg btn-block btn-success" type="submit">Edit Account</button>
              </div>
              <div className="form-group">
                or <Link to={routes.LIST_ACCOUNTS_PATH}>cancel</Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPG);
