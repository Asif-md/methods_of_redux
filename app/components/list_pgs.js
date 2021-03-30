import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import {Link} from "react-router-dom";
import LoadList from "components/load_list";
import * as routes from "routes";

class ListPGs extends React.Component {
  render(){
    const { data, count } = this.props.pgs;

    const {
      listPGs: loadAction
    } = this.props;

    const customRows = {
      headers: ["PG ID", "Name"],
      attributes: (record) => {
        return [
          <Link to={routes.accountPath(record.id)}>{record.accountNo}</Link>,
          <span data-test-element="name">{record.name}</span>
        ];
      }
    };

    return (
      <LoadList
        ref="load-list"
        {...this.props}
        title="PGs List"
        recordType="pg"
        data={data}
        count={count}
        loadAction={loadAction}
        customRows={customRows}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPGs);
