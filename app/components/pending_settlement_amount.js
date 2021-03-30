/**
 * Created by ashwin.raghavan on 12/06/17.
 */

import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import PleaseWait from "components/please_wait";

const PendingSettlementAmount = (props) => {
  const { amount, searching } = props.pending;
  const { error } = props;

  if (error  && (error === "something went wrong" || error === "timeout")) {
    if (amount != null && searching == false) {
      return (
        <div className="details">Rs {amount}</div>
      )
    } else {
      return (
        <SomethingWentWrong errorMessage={error}/>
      );
    }
  } else {
    if (amount == null && searching == true) {
        return (
          <PleaseWait message="Loading"/>
        );
      }

    if (amount != null && searching == false) {
      return (
        <div className="details">Rs {amount}</div>
      )
    }
  }
  return null;
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingSettlementAmount);
