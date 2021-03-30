import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import LoadMinimalList from "components/load_minimal_list";
import * as routes from "routes";
import { epochToISO } from 'utils/helpers';

class ListInternalFundTransfers extends React.Component {
  render(){
    let { props } = this;
    const { data, count } = props.internalFundTransfers;

    const {
      listInternalFundTransfers: loadAction
    } = props;

    const customRows = {
      headers: ["Created Date", "From Account", "To Account", "Amount", "Remarks", "Status"],
      attributes: (record) => {
        return [
          <Link to={routes.internalFundTransferPath(record.id)}>{epochToISO(record.createdDate)}</Link>,
          <span data-test-element="fromAccountNo">{record.payeeName}</span>,
          <span data-test-element="toAccountNo">{record.beneficiaryName}</span>,
          <span data-test-element="amount">{record.amount}</span>,
          <span data-test-element="remarks">{record.remarks}</span>,
          <span data-test-element="status">{record.status}</span>
        ];
      }
    };

    return (
      <LoadMinimalList
        ref="load-list"
        {...props}
        title="Internal Fund Transfers List"
        recordType="internalFundTransfer"
        data={data}
        count={count}
        loadAction={loadAction}
        customRows={customRows}
      />
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListInternalFundTransfers);
