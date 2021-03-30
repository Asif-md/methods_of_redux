import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import LoadRuleSetList from "components/load_ruleset_list";
import * as routes from "routes";

class ListRulesets extends React.Component {
  render() {
    const { data, count, events } = this.props.rulesets;

    const { listRulesets: loadAction } = this.props;

    const customRows = {
      headers: ["Name", "For Event"],
      attributes: record => {
        return [
          <Link to={routes.rulesetPath(record.id)}>{record.name}</Link>,
          <span className="overflowwrap" data-test-element="forEvent">
            {record.forEvent ? record.forEvent.split(",").join(", ") : "--"}
          </span>
        ];
      }
    };

    return (
      <LoadRuleSetList
        ref="load-list"
        {...this.props}
        title="Ruleset List"
        recordType="ruleset"
        data={data}
        count={count}
        events={events}
        loadAction={loadAction}
        customRows={customRows}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListRulesets);
