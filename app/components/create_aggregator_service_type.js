import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import Form from "components/form";
import Input from "components/input";

import * as routes from "routes";

class CreateAggregatorServiceType extends React.Component {
 
    getData = () => {
        const {
            ag_id,
            ag_desc
        } = this.refs;
        return {
            id: ag_id.value(),
            description: ag_desc.value(),
         };
    }


  render() {
    return (
        <div className="page-container">
            <Form
                {...this.props}
                serializeForm={this.getData}
                submitAction={this.props.aggregatorService}>
                <h1 className="page-header">
                    <span className="required-message">All fields are required</span>
                    Create Aggregator Service Type
                </h1>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="control-label">Id:</label>
                            <Input ref="ag_id" focus={true} maxLength={100} />
                        </div>
                        <div className="col-md-6">
                            <label className="control-label">Description:</label>
                            <Input ref="ag_desc" />
                        </div>
                    </div>
                </div>

                <br />
                <button
                    className="btn btn-lg btn-block btn-success">Create Aggregate Service Type
                </button>
            </Form>
        </div>
    );

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAggregatorServiceType);

