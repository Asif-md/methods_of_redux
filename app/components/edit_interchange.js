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

class EditInterchange extends React.Component{

  componentDidMount(){
    const { params } = this.props.match;
    params && params.interchangeId && this.props.showInterchange(params.interchangeId);
  }

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
    const { interchange } = this.props;

    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.attemptEditInterchange}
          editStatus={true}
          id={interchange.id}>
          <h1 className="page-header">
            <span className="required-message">All fields are required</span>
            Create Interchange
          </h1>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Interchange Name:</label>
                <Input ref="name" defaultValue={interchange.name}
                       focus={true} maxLength={100} />
              </div>
              <div className="form-group">
                <label className="control-label">Interchange ID:</label>
                <Input ref="interchangeId" defaultValue={interchange.interchangeId}/>
              </div>
              <div className="form-group">
                <label className="control-label">PAN:</label>
                <Input ref="pan" defaultValue={interchange.pan}/>
              </div>
              <div className="form-group">
                <label className="control-label">Service Tax No:</label>
                <Input ref="serviceTaxNo" defaultValue={interchange.serviceTaxNo}/>
              </div>
              <div className="form-group">
                <label className="control-label">TIN:</label>
                <Input ref="tin" defaultValue={interchange.tin}/>
              </div>
              <div className="form-group">
                <label className="control-label">CIN:</label>
                <Input ref="cin" defaultValue={interchange.cin} maxLength={32} />
              </div>
              <div className="form-group">
                <label className="control-label">GSTIN:</label>
                <Input ref="gstin" defaultValue={interchange.gstin} />
              </div>
              <div className="form-group">
                <label className="control-label">GST State Code:</label>
                <Input ref="gstStateCode" defaultValue={interchange.gstStateCode} />
              </div>
              <div className="form-group">
                <label className="control-label">Account No:</label>
                <Input ref="accountNo" defaultValue={interchange.accountNo} maxLength={32} />
              </div>
              <div className="form-group">
                <label className="control-label">Account Type:</label>
                <Input ref="accountType" defaultValue={interchange.accountType} type="select">
                  <option>NODAL</option>
                  <option>CURRENT</option>
                  <option>ESCROW</option>
                  <option>SAVING</option>
                  <option>USER</option>
                </Input>
              </div>
              <div className="form-group">
                <label className="control-label">IFSC:</label>
                <Input ref="ifsc" defaultValue={interchange.ifsc} />
              </div>
              <div className="form-group">
                <button className="btn btn-lg btn-block btn-success">Create Interchange</button>
              </div>
              <div className="form-group">
                or <Link to={routes.LIST_INTERCHANGES_PATH}>cancel</Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInterchange);

