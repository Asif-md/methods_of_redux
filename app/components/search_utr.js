/**
 * Created by ashwin.raghavan on 12/01/17.
 */

import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import UtrLookup from "components/utr_lookup";

class SearchUtr extends React.Component{

  componentDidMount() {
    this.refs.utr.focus();
    this.props.clearState();
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.clearTransactionalMessages();
    const utr = this.refs.utr.value;
    this.props.utrLookup(utr);
  }

  render() {
    return (
      <div className="page-container">

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Enter UTR:</label>
            <input className="form-control" ref="utr" type="text" required = {true} />
          </div>
          <div className="form-group">
            <button className="btn btn-md btn-primary" type="submit">Search</button>
          </div>
        </form>

        <p className="lead clearfix"></p>

        <UtrLookup
          utrLookupResult={this.props.utrLookupResult}/>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUtr);

