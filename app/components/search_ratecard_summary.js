/**
 * Created by ashwin.raghavan on 13/02/17.
 */

import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import RateCards from "components/show_ratecard_summary";

class ShowRatecard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      merchantId: null
    }
  }

  componentDidMount() {
    this.props.clearTransactionalMessages();
    this.props.clearState();
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.clearTransactionalMessages();

    const searchTerm = this.refs.searchTerm.value;

    this.setState({
      merchantId: searchTerm
    })

    this.props.showRatecards(searchTerm);
  }

  render() {
    return (
      <div className="page-container">

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Enter Merchant:</label>
            <input className="form-control" ref="searchTerm" type="text" required = {true} />
          </div>
          <div className="form-group">
            <button className="btn btn-md btn-primary" type="submit">Search</button>
          </div>
        </form>

        <p className="lead clearfix"></p>

        <RateCards
          ratecards={this.props.ratecards}
          merchantId={this.state.merchantId}
          attemptApprove = {this.props.attemptRateCardApprove}
          attemptActivate = {this.props.attemptRateCardActivate}
          attemptDeactivate = {this.props.attemptRateCardDeactivate}
        />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowRatecard);