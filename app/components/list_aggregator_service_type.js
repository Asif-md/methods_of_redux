import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import LoadList from "components/load_aggregator_list";
import Boolean from "components/boolean";
import * as routes from "routes";

class ListAggregatorServiceType extends React.Component {
  render(){
    let { props } = this;
    const { data } = props.aggregatorServices;

    const {
      listAggegrateTypes,
    } = props;
  


    const customRows = {
      headers: ["ID", "Description"],
      attributes: (record) => {
        return [
          <span  data-test-element="id">{record.id}</span>,
          <span data-test-element="description">{record.description}</span>,
     
        ];
      }
    };
  
    return (
      <LoadList
        ref="load-list"
        {...props}
        title="Aggregator Service Types"
        recordType="aggregator"
        data={data}
        loadAction={listAggegrateTypes}
        attemptDeactivateAction=""
        customRows={customRows}
        
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAggregatorServiceType);

