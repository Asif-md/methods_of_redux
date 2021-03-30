/**
 * Created by ashwin.raghavan on 10/01/17.
 */

import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import LoadNormalList from "components/load_normal_list";
import { epochToISO } from 'utils/helpers';

class ListMerchantSettlements extends React.Component {
  render(){
    let { props } = this;
    const { settlementType, data, count } = props.merchantSettlement;
    const { interchange, merchant } = props;
    if (settlementType === "DISBURSEMENT") {
      const {
        merchantSettlementStatus: loadAction
      } = props;

      const customRows = {
        headers: ["From", "To", "Amount", "URN", "UTR", "AccNo", "IFSC", "Status", "Error", "Tag", "Created", "Updated"],
        attributes: (record) => {
          return [
            <span data-test-element="fromParty">{record.fromParty}</span>,
            <span data-test-element="toParty">{record.toParty}</span>,
            <span data-test-element="amount">{record.amount}</span>,
            <span data-test-element="refNo">{record.refNo}</span>,
            <span data-test-element="utrCode">{record.utrCode}</span>,
            <span data-test-element="toAccountNo">{record.toAccountNo}</span>,
            <span data-test-element="toIFSC">{record.toIFSC}</span>,
            <span data-test-element="status">{record.status}</span>,
            <span data-test-element="failReason">{record.failReason}</span>,
            <span data-test-element="settlementTag">{record.tag}</span>,
            <span data-test-element="created">{epochToISO(record.created)}</span>,
            <span data-test-element="updated">{epochToISO(record.updated)}</span>
          ];
        }
      };

      return (
        <LoadNormalList
          ref="load-list"
          {...props}
          title="Disbursements"
          recordType="disbursement"
          data={data}
          count={count}
          customRows={customRows}
        />
      );
    }else if (settlementType === "INVOICE") {
      const {
        merchantSettlementStatus: loadAction
      } = props;

      const customRows = {
        headers: ["From Party", "To Party", "Invoice No", "Amount", "Status", "Tag"],
        attributes: (record) => {
          return [
            <span data-test-element="fromParty">{record.fromParty}</span>,
            <span data-test-element="toParty">{record.toParty}</span>,
            <span data-test-element="invoiceNo">{record.invoiceNo}</span>,
            <span data-test-element="amount">{record.amount}</span>,
            <span data-test-element="status">{record.status}</span>,
            <span data-test-element="tag">{record.tag}</span>
          ];
        }
      };

      return (
        <LoadNormalList
          ref="load-list"
          {...props}
          title="Invoices"
          recordType="invoice"
          data={data}
          count={count}
          customRows={customRows}
        />
      );
    }else {
      return null;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMerchantSettlements);
