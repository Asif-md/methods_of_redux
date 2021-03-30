/**
 * @author ashwin.raghavan
 */
import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import Form from "components/form";
import {Link} from "react-router-dom";
import * as routes from "routes";

const statuses = ["SUCCESS", "FAIL"];

class ChangeTransactionStatus extends React.Component{

  getData = () => {
    const {
      transactionId,
      status
    } = this.refs;

    return {
      transactionId: transactionId.value,
      status: status.value
    }
  }

  render() {
    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.changeTransactionStatus}>
          <h1 className="page-header">
            <span className="required-message">All fields are required</span>
            Change Transaction Status
          </h1>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Transaction ID:</label>
                <input ref="transactionId" className="form-control" type="text" required = {true} autoFocus="true" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Status:</label>
                <select
                  className="form-control"
                  required = {true}
                  ref="status">
                  {
                    statuses.map((status) => {
                      return (<option key={`sub-option-${status}`} value={status.toLowerCase()}>{status}</option>);
                    })
                  }
                </select>
              </div>
            </div>
          </div>

          <br/>

          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-md btn-block btn-success"
                type="submit">Submit</button>

              <div className="col-md-6 form-group">
                or <Link to={routes.ROOT_PATH}>cancel</Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTransactionStatus);
