/**
 * @author ashwin.raghavan
 */

import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import { Link } from "react-router-dom";
import Boolean from "components/boolean";
import LoadList from "components/load_list";
import * as routes from "routes";

class ListSettlements extends React.Component {
  render() {
    let { props } = this;
    const { data, count } = props.settlements;
    const {
      listSettlements: loadAction
    } = props;


    const customRows = {
      headers: ["Rule Name", "Settlement Tag", "Pending Reactivation"],
      attributes: (record) => {
        return [
          <Link to={routes.settlementPath(record.id)}>{record.name}</Link>,
          <span data-test-element="acc-type">{record.settlementTag}</span>,
          <Boolean flag={record.pendingReactivation} />
        ];
      }
    };

    return (
      <LoadList
        ref="load-list"
        {...props}
        title="Settlement Rule View"
        recordType="settlement"
        data={data}
        count={count}
        loadAction={loadAction}
        customRows={customRows}
        filterPendingReactivation={true}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSettlements);