import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import LoadList from "components/load_list";
import Boolean from "components/boolean";
import * as routes from "routes";

class ListMerchants extends React.Component {
  render(){
    let { props } = this;
    const { data, count } = props.merchants;
    const {
      listMerchants,
      attemptDeactivateMerchant
    } = props;

    const customRows = {
      headers: ["Merchant ID", "Name", "Address Verified", "Pending Reactivation"],
      attributes: (record) => {
        return [
          <Link to={routes.merchantPath(record.id)}>{record.merchantId}</Link>,
          <span data-test-element="name">{record.name}</span>,
          <Boolean
            flag={record.address.verified}
            falseStatus="label-default"
            trueText="Address Verified"
            falseText="Verification Pending"/>,
            <Boolean flag={record.pendingReactivation}/>
        ];
      }
    };
  
    return (
      <LoadList
        ref="load-list"
        {...props}
        title="Merchants View"
        recordType="merchant"
        data={data}
        count={count}
        loadAction={listMerchants}
        attemptDeactivateAction={attemptDeactivateMerchant}
        customRows={customRows}
        filterAddress={true}
        filterPendingReactivation={true}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMerchants);
