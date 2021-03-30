import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import Boolean from "components/boolean";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import LoadList from "components/load_list";
import * as routes from "routes";
class ListAccounts extends React.Component {
  render(){
    let { props } = this;
    const { data, count } = props.accounts;

    const {
      listAccounts: loadAction
    } = props;

    const customRows = {
      headers: ["Account ID", "Name", "Pending Reactivation"],
      attributes: (record) => {
        return [
          <Link to={routes.accountPath(record.id)}>{record.accountNo}</Link>,
          <span data-test-element="name">{record.name}</span>,
          <Boolean flag={record.pendingReactivation}/>
        ];
      }
    };
    return (
      <LoadList
        ref="load-list"
        {...props}
        title="Accounts List"
        recordType="account"
        data={data}
        count={count}
        loadAction={loadAction}
        customRows={customRows}
        filterPendingReactivation={true}
      />
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListAccounts);
