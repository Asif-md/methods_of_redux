import React from "react";
import apiFetch from "utils/api_fetch";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Boolean from "components/boolean";

const Alert = ({ close, message, error, actionMessage }) => (
    <div>
        {message.id && (
            <div className="alert alert-success" role="alert">
                Successfully Added, by default it is disabled, please enable it - it
                would be present @ the bottom of the list!!
        <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={close}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )}
        {error && error.status && (
            <div className="alert alert-danger" role="alert">
                {error.status} : {error.statusText}
                <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={close}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )}

        {actionMessage.updatedBy && (
            <div className="alert alert-success" role="alert">
                Successfully Updated
        <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={close}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )}
    </div>
);

class Add_transaction_type extends React.Component {
    constructor() {
        super();
        this.state = {
            transactionType: "",
            queryStatus: "",
            isLoading: false,
            list: [],
            error: {},
            ResponseMessage: {},
            open: false,
            actionsMessage: ""
        };
    }

    getData = () => {
        this.setState({ isLoading: true });

        apiFetch.get("v1/bankstatement/list/tt").then(res => {
            this.setState({ list: res, isLoading: false });
        });
    };

    handleAlertsOpen = () => {
        this.setState({
            open: true
        });
    };

    handleAlertsClose = () => {
        this.setState({
            open: false,
            error: {},
            ResponseMessage: {},
            actionMessage: ""
        });
    };

    componentDidMount() {
        this.getData();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    };

    onChangeStatus = e => {
        this.setState({ queryStatus: e.currentTarget.value });
    };

    formReset = () => {
        this.setState({
            transactionType: ""
        });
    };

    onSubmitForm = e => {
        e.preventDefault();

        const { queryStatus } = this.state;

        const postData = {
            transactionType: this.state.transactionType
        };

        apiFetch
            .post(`v1/bankstatement/${queryStatus}/tt`, postData)
            .then(Response => {
                this.setState({
                    ResponseMessage: Response
                });
                this.getData();
            })
            .catch(Response => this.setState({ error: Response }));

        this.handleAlertsOpen();
        this.formReset();
    };

    onEnable = eid => {
        const EnableId = {
            id: eid
        };
        apiFetch
            .post(`v1/bankstatement/enable/tt`, EnableId)
            .then(res => {
                this.setState({
                    actionsMessage: res
                });
                this.getData();
            })
            .catch(Response => this.setState({ error: Response }));

        this.handleAlertsOpen();
    };

    onDisable = disableId => {
        const DisableId = {
            id: disableId
        };
        apiFetch
            .post(`v1/bankstatement/disable/tt`, DisableId)
            .then(res => {
                this.setState({
                    actionsMessage: res
                });
                this.getData();
            })
            .catch(Response => this.setState({ error: Response }));
        this.handleAlertsOpen();
    };

    render() {
        const {
            list,
            transactionType,
            error,
            ResponseMessage,
            actionsMessage
        } = this.state;

        const options = [
            { label: "Select Transaction Type", value: "" },
            { label: "ADD", value: "add" }
        ];

        const selectOptions = options.map(option => (
            <option key={option.label} value={option.value}>
                {option.label}
            </option>
        ));

        const listData = list
            ? list.map(listDataItem => (
                <tr key={listDataItem.id}>
                    {/* <td>{listDataItem.id}</td> */}
                    <td>
                        <Link to={`/ui/addTransactionType/${listDataItem.id}`}>
                            {listDataItem.transactionType}
                        </Link>
                    </td>
                    <td>
                        <Moment format="DD/MM/YYYY">{listDataItem.created}</Moment>
                    </td>
                    <td>{listDataItem.createdBy}</td>
                    <td>
                        {listDataItem.activatedBy ? listDataItem.activatedBy : "--"}
                    </td>
                    <td>{listDataItem.updatedBy ? listDataItem.updatedBy : "--"}</td>
                    <td>
                        <Moment format="DD/MM/YYYY">
                            {listDataItem.updated ? listDataItem.updated : "--"}
                        </Moment>
                    </td>
                    <td>
                        <Boolean
                            flag={listDataItem.active}
                            trueText="true"
                            falseText="false"
                            trueStatus="label-success details"
                            falseStatus="label-danger details"
                        />

                    </td>
                    <td className="btn-toolbar">
                        {!listDataItem.active ? (
                            <button
                                className="btn btn-sm btn-success"
                                data-test-element="enable"
                                onClick={() => this.onEnable(listDataItem.id)}
                            >
                                Enable
                </button>
                        ) : (
                                <button
                                    disabled={true}
                                    className="btn btn-sm btn-success"
                                    data-test-element="enable"
                                    onClick={() => this.onEnable(listDataItem.id)}
                                >
                                    Enabled
                </button>
                            )}

                        {!listDataItem.active ? (
                            <button
                                disabled={true}
                                className="btn btn-sm btn-primary"
                                data-test-element="disable"
                                onClick={() => this.onDisable(listDataItem.id)}
                            >
                                Disabled
                </button>
                        ) : (
                                <button
                                    className="btn btn-sm btn-primary"
                                    data-test-element="disable"
                                    onClick={() => this.onDisable(listDataItem.id)}
                                >
                                    Disable
                </button>
                            )}
                    </td>
                </tr>
            ))
            : "Oops! Something went wrong..";

        return (
            <div className="container">
                {this.state.open && (
                    <Alert
                        close={this.handleAlertsClose}
                        message={ResponseMessage}
                        error={error}
                        actionMessage={actionsMessage}
                    />
                )}
                <form onSubmit={this.onSubmitForm}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Transaction Type"
                                name="transactionType"
                                value={transactionType}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <select
                                className="form-control"
                                required
                                disabled={!transactionType}
                                onChange={this.onChangeStatus}
                            >
                                {selectOptions}
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <button
                                disabled={!transactionType}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Submit
              </button>
                        </div>
                    </div>
                </form>
                <br />
                <br />

                <div className="table-responsive" style={{ marginTop: 50 }}>
                    <table className="table table-striped table-hover table-condensed">
                        <tbody>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Transaction Type</th>
                                <th>Created On</th>
                                <th>Created By</th>
                                <th>Activated By</th>
                                <th>Updated By</th>
                                <th>Updated On</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                            {listData}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Add_transaction_type;
