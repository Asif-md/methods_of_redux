import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import {Link} from "react-router-dom";
import LoadNormalList from "components/load_normal_list";
import * as routes from "routes";

class ListPgRateCards extends React.Component{

  componentDidMount() {
    this.props.clearState();
  }

  render() {
    const { data, count } = this.props.pgRateCards;

    const {
      listPgRateCards: loadAction
    } = this.props;

    const customRows = {
      headers: ["Rate Card ID", "Rate Card Name"],
      attributes: (record) => {
        return [
          <Link to={routes.pgRateCardPath(record.rateCardId)}>{record.rateCardId}</Link>,
          <span data-test-element="name">{record.rateCardName}</span>
        ];
      }
    };

    return (
      <LoadNormalList
        ref="load-list"
        {...this.props}
        title="Rate Card View"
        recordType="pgRateCard"
        data={data}
        count={count}
        loadAction={loadAction}
        customRows={customRows}
        loadFromServer={true}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPgRateCards);