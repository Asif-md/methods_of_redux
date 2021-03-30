import React, { Component } from 'react'
import * as routes from "routes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LoadList from "components/load_list";
import Boolean from "components/boolean";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';


class ListTaxRules extends Component {
    render() {
        const { props } = this;
        const { data, count } = props.taxRules
        const {
            listTaxRules: loadAction
        } = props;

        const customRows = {
            headers: ["Name ", " Transaction Type", "SAC Code", "Pending Reactivation"],
            attributes: (record) => {
                return [
                    <Link to={routes.taxRulePath(record.id)}>{record.name}</Link>,
                    <span data-test-element="acc-number">{record.transactionType}</span>,
                    <span data-test-element="acc-type">{record.sacCode}</span>,
                    <Boolean flag={record.pendingReactivation} />
                ];
            }
        };

        return (
            <LoadList
                ref="load-list"
                {...props}
                title="Tax Rule View"
                // recordType="taxRule"
                recordType="rules/tax"
                data={data}
                count={count}
                loadAction={loadAction}
                customRows={customRows}
                filterPendingReactivation={true}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTaxRules);
