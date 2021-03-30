import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import {Link} from "react-router-dom";
import LoadList from "components/load_list";
import { isoToDateString } from "utils/helpers";
import * as routes from "routes";

class ListPgMIds extends React.Component {
  render(){
    const { data, count } = this.props.pgMIds;

    const {
      listPgMIds: loadAction
    } = this.props;

    const customRows = {
      headers: ["MID", "Name", "RateCardId", "Effective from", "Effective to"],
      attributes: (record) => {
        return [
          <Link to={routes.pgMIdPath(record.id)}>{record.mid}</Link>,
          <span data-test-element="merchantName">{record.merchantName}</span>,
          <span data-test-element="rateCardId">{record.rateCardId}</span>,
          <span data-test-element="effectiveFrom">{isoToDateString(record.effectiveFrom)}</span>,
          <span data-test-element="effectiveTo">{isoToDateString(record.effectiveTo)}</span>
        ];
      }
    };

    return (
      <LoadList
        ref="load-list"
        {...this.props}
        title="PgMIds View"
        recordType="pgMId"
        data={data}
        count={count}
        loadAction={loadAction}
        customRows={customRows}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPgMIds);
