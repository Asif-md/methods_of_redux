import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import {Link} from "react-router-dom";
import Form from "components/form";
import * as routes from "routes";
import { dateStringToISO, epochToISO } from "utils/helpers";

class EditPgMId extends React.Component{

  componentDidMount() {
    const { params } = this.props.match;
    params && params.pgMId && this.props.showPgMId(params.pgMId);
  }

  getData = () => {
    const { pgMId } =  this.props;
    const {
      effectiveFrom,
      effectiveTo
    } = this.refs;

    return {
      mid: pgMId.mid,
      pgRateCardId: pgMId.rateCardId,
      effectiveFrom: dateStringToISO(effectiveFrom.value),
      effectiveTo: dateStringToISO(effectiveTo.value)
    };
  }

  render() {
    const { pgMId } = this.props;
    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.createPgMId}>
          <h1 className="page-header">
            <span className="required-message">All fields are required</span>
            Edit PG MID
          </h1>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label text-muted">MID:</label>
                <span className="details">{pgMId.mid}</span>
              </div>
              <div className="form-group">
                <label className="control-label text-muted">Merchant Name:</label>
                <span className="details">{pgMId.merchantName}</span>
              </div>
              <div className="form-group">
                <label className="control-label text-muted">Linked Rate Card:</label>
                <span className="details">{pgMId.rateCardId}</span>
              </div>

              <div className="row form-group">
                <div className="col-md-6">
                  <label className="control-label">Effective From:</label>
                  <input
                    className="form-control" type="text"
                    placeholder="DD/MM/YYYY 12:00 am"
                    defaultValue={epochToISO(pgMId.effectiveFrom)}
                    ref="effectiveFrom"/>
                </div>

                <div className="col-md-6">
                  <label className="control-label">Effective To:</label>
                  <input
                    className="form-control" type="text"
                    placeholder="DD/MM/YYYY 12:00 am"
                    defaultValue={epochToISO(pgMId.effectiveTo)}
                    ref="effectiveTo"/>
                </div>
              </div>

              <div className="form-group">
                <button className="btn btn-lg btn-block btn-success">Edit PG MID</button>
              </div>
              <div className="col-md-6 form-group">
                or <Link to={routes.pgMIdPath(pgMId.id)}>cancel</Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPgMId);
