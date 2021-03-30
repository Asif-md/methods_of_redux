import React from "react";
import * as routes from "routes";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import LoadList from "components/load_list";
import Boolean from "components/boolean";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';

class ListInterchanges extends React.Component {
  render(){
    let { props } = this;
    const { data, count } = props.interchanges;

    const {
      listInterchanges: loadAction
    } = props;

    const customRows = {
      headers: ["Interchange ID", "Account No", "Account Type", "Pending Reactivation"],
      attributes: (record) => {
        return [
          <Link to={routes.interchangePath(record.id)}>{record.interchangeId}</Link>,
          <span data-test-element="acc-number">{record.accountNo}</span>,
          <span data-test-element="acc-type">{record.accountType}</span>,
          <Boolean flag={record.pendingReactivation}/>
        ];
      }
    };

    return (
      <LoadList
        ref="load-list"
        {...props}
        title="Interchange View"
        recordType="interchange"
        data={data}
        count={count}
        loadAction={loadAction}
        customRows={customRows}
        filterPendingReactivation={true}
      />
    ); 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListInterchanges);
