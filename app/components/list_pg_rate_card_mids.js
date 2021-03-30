import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import {Link} from "react-router-dom";
import LoadList from "components/load_list";
import { isoToDateString } from "utils/helpers";
import * as routes from "routes";

class ListPgRateCardMIds extends React.Component {
  render(){
    let { props } = this;
    const { data, count } = props.pgMIds;

    const {
      listPgRateCardMIds: loadAction
    } = props;

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
        {...props}
        title="PG Rate Card MID Mapping"
        recordType="pgMId"
        data={data}
        count={count}
        loadAction={loadAction}
        customRows={customRows}
        rateCardId={props.params.pgRCId}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPgRateCardMIds);
