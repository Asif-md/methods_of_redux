import React, { Component } from "react";
import apiFetch from "utils/api_fetch";
import { Link } from "react-router-dom";
import * as routes from "routes";

import Boolean from "components/boolean";
import { isoToDateString, dateStringToISO, epochToISO } from "utils/helpers";

class BankStatementDetails extends Component {
    constructor() {
        super();
        this.state = {
            details: {},
            isLoading: false
        };
    }

    getData = () => {
        const { id } = this.props.match.params;


        apiFetch.get(`v1/bankstatement/detail/tt/${id}`).then(res => {
            this.setState({ details: res, isLoading: false });
        });
    };
    componentDidMount() {
        this.getData();
    }

    render() {
        const { details } = this.state;


        return (

            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <fieldset>
                            <legend data-toggle="collapse">
                                <div className="btn-toolbar pull-right">
                                    <Link exact to={routes.ADD_TRANSACTION_PATH}>
                                        <button className="btn btn-primary">Go Back</button>
                                    </Link>
                                </div>
                                Transaction Type Details &nbsp;
              </legend>
                        </fieldset>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label text-muted">ID:</label>
                                    <span className="details">{details.id}</span>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label text-muted">
                                        Transaction Type:
                  </label>
                                    <span className="details">{details.transactionType}</span>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label text-muted">Active:</label>
                                    <span className="details">
                                        <Boolean
                                            flag={details.active}
                                            trueText="true"
                                            falseText="false"
                                            trueStatus="label-success details"
                                            falseStatus="label-danger details"
                                        />
                                    </span>

                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label text-muted">
                                        Created By:
                  </label>
                                    <span className="details">{details.createdBy}</span>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label text-muted">
                                        Activated By:
                  </label>
                                    <span className="details">
                                        {details.activatedBy ? details.activatedBy : "--"}
                                    </span>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label text-muted">
                                        Updated By:
                  </label>
                                    <span className="details">
                                        {details.updatedBy ? details.updatedBy : "--"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="control-label text-muted">
                                        Created On:
                  </label>
                                    <span className="details">
                                        {details.created ? epochToISO(details.created) : "--"}

                                    </span>
                                </div>
                                <div className="col-md-4">
                                    <label className="control-label text-muted">
                                        Updated On:
                  </label>
                                    <span className="details">
                                        {details.updated ? epochToISO(details.updated) : "--"}

                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BankStatementDetails;
