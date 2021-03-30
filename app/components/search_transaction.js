import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import TransactionStatus from "components/transaction_status";

/**
 * @author ashwin.raghavan
 */

class SearchTransaction extends React.Component{

  componentDidMount() {
    this.refs.transactionId.focus();
    this.props.clearState();
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.clearTransactionalMessages();

    const transactionId = this.refs.transactionId.value;
    this.props.showTransactionStatus(transactionId);
  }

  render() {
    return (
      <div className="page-container">

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Enter Transaction ID:</label>
            <input className="form-control" ref="transactionId" type="text" required = {true} />
          </div>
          <div className="form-group">
            <button className="btn btn-md btn-primary" type="submit">Find Status</button>
          </div>
        </form>

        <p className="lead clearfix"></p>

        <TransactionStatus transaction={this.props.transaction}/>

      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTransaction);
