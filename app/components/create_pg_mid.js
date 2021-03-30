import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import Form from "components/form";
import Input from "components/input";
import { getDefaultEffectiveFrom, getDefaultEffectiveTo, dateStringToISO } from "utils/helpers";

class CreatePgMId extends React.Component{
  getData = () => {
    const {
      mid,
      merchantName,
      pgRateCardId,
      effectiveFrom,
      effectiveTo
    } = this.refs;

    return {
      mid: mid.value(),
      merchantName: merchantName.value(),
      pgRateCardId: pgRateCardId.value(),
      effectiveFrom: dateStringToISO(effectiveFrom.value),
      effectiveTo: dateStringToISO(effectiveTo.value)
    };
  }

  render() {
    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.createPgMId}>
          <h1 className="page-header">
            <span className="required-message">All fields are required</span>
            Create PG MID
          </h1>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">PG MID:</label>
                <Input ref="mid" focus={true} maxLength={100} />
              </div>
              <div className="form-group">
                <label className="control-label">PG MID Name:</label>
                <Input ref="merchantName" focus={true} maxLength={100} />
              </div>
              <div className="form-group">
                <label className="control-label">Master Rate Card ID:</label>
                <Input ref="pgRateCardId"/>
              </div>

              <div className="row form-group">
                <div className="col-md-6">
                  <label className="control-label">Effective From:</label>
                  <input
                    className="form-control" type="text"
                    placeholder="DD/MM/YYYY 12:00 am"
                    defaultValue={getDefaultEffectiveFrom()}
                    ref="effectiveFrom"/>
                </div>

                <div className="col-md-6">
                  <label className="control-label">Effective To:</label>
                  <input
                    className="form-control" type="text"
                    placeholder="DD/MM/YYYY 12:00 am"
                    defaultValue={getDefaultEffectiveTo()}
                    ref="effectiveTo"/>
                </div>
              </div>

              <div className="form-group">
                <button className="btn btn-lg btn-block btn-success">Create PG MID</button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePgMId);
