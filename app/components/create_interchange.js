import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import Form from "components/form";
import Input from "components/input";

class CreateInterchange extends React.Component {



  getData = () => {
    const {
      name,
      interchangeId,
      pan,
      serviceTaxNo,
      tin,
      cin,
      gstin,
      gstStateCode,
      accountNo,
      accountType,
      ifsc
    } = this.refs;

    return {
      name: name.value(),
      interchangeId: interchangeId.value(),
      pan: pan.value(),
      serviceTaxNo: serviceTaxNo.value(),
      tin: tin.value(),
      cin: cin.value(),
      gstin: gstin.value(),
      gstStateCode: gstStateCode.value(),
      accountNo: accountNo.value(),
      accountType: accountType.value(),
      ifsc: ifsc.value()
    };
  }

  render() {
    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.attemptCreateInterchange}>
          <h1 className="page-header">
            <span className="required-message">All fields are required</span>
            Create Interchange
          </h1>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Interchange Name:</label>
                <Input ref="name" focus={true} maxLength={100} />
              </div>
              <div className="form-group">
                <label className="control-label">Interchange ID:</label>
                <Input ref="interchangeId" />
              </div>
              <div className="form-group">
                <label className="control-label">PAN:</label>
                <Input ref="pan" />
              </div>
              <div className="form-group">
                <label className="control-label">Service Tax No:</label>
                <Input ref="serviceTaxNo" />
              </div>
              <div className="form-group">
                <label className="control-label">TIN:</label>
                <Input ref="tin" />
              </div>
              <div className="form-group">
                <label className="control-label">CIN:</label>
                <Input ref="cin" maxLength={32} />
              </div>
              <div className="form-group">
                <label className="control-label">GSTIN:</label>
                <Input ref="gstin" />
              </div>
              <div className="form-group">
                <label className="control-label">GST State Code:</label>
                <Input ref="gstStateCode" />
              </div>
              <div className="form-group">
                <label className="control-label">Account No:</label>
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
                <button className="btn btn-lg btn-block btn-success">Create Interchange</button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInterchange);
