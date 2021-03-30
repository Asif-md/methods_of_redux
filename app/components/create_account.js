import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import Form from "components/form";
import Input from "components/input";

class CreateAccount extends React.Component {

  getData = () => {
    const { name, accountNo, accountType, ifsc } = this.refs;

    return {
      name: name.value(),
      accountNo: accountNo.value(),
      accountType: accountType.value(),
      ifsc: ifsc.value()
    };
  };

  render() {
    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.attemptCreateAccount}
        >
          <h1 className="page-header">
            <span className="required-message">All fields are required</span>
            Create Account
          </h1>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Account Name:</label>
                <Input ref="name" focus={true} maxLength={100} />
              </div>
              <div className="form-group">
                <label className="control-label">Account Number:</label>
                <Input ref="accountNo" maxLength={32} />
              </div>
              <div className="form-group">
                <label className="control-label">Account Type:</label>
                <Input ref="accountType" type="select">
                  <option>NODAL</option>
                  <option>CURRENT</option>
                  <option>ESCROW</option>
                  <option>SAVING</option>
                  <option>USER</option>
                </Input>
              </div>
              <div className="form-group">
                <label className="control-label">IFSC:</label>
                <Input ref="ifsc" />
              </div>
              <div className="form-group">
                <button className="btn btn-lg btn-block btn-success">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccount);
