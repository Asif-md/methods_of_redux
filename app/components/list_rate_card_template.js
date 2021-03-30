import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import ExtendedRateCardLoadList from "components/extended_rate_card_load_list";
import * as routes from "routes";

class ListRateCardTemplate extends React.Component {
  render() {
    const { data, count, events } = this.props.rateCardTemplates;

    let eventTypes = data
      ? data.map(eventTypes => {
        return eventTypes.rateCardRules.map(event => (
          <option key={event.id}>{event.type}</option>
        ));
      })
      : "";

    const { listRateCardTemplate: loadAction } = this.props;
    const customRows = {
      headers: ["Short ID", "PG ID", "Merchant", "Provider Name"],
      attributes: record => {
        return [
          this.props.selectable ? (
            <div>
              <input
                type={"checkbox"}
                className="checkbox checkboxCustom"
                checked={record.id === this.props.selected}
                onChange={() => {
                  this.props.onSelection(record.id, record.shortId, record);
                }}
              />
              <button
                className="btn btn-link"
                onClick={() => {
                  this.props.onRulesetClick(record.id);
                }}
              >
                {record.shortId}
              </button>
            </div>
          ) : (
              <Link to={routes.rateCardTemplatePath(record.id)}>
                {record.shortId}
              </Link>
            ),
          <span data-test-element="pgId">{record.pgId || "--"}</span>,
          <span data-test-element="merchant">{record.merchant || "--"}</span>,
          <span data-test-element="providerName">
            {record.providerName || "--"}
          </span>
        ];
      }
    };

    return (
      <ExtendedRateCardLoadList
        ref="load-list"
        {...this.props}
        title="Rate Card Template List"
        recordType="rateCardTemplate"
        data={data}
        count={count}
        events={eventTypes}
        loadAction={loadAction}
        customRows={customRows}
      />
    );
  }
}

ListRateCardTemplate.defaultProps = {
  selectable: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListRateCardTemplate);
