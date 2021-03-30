import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import ListPgRateCards from 'components/list_pg_rate_cards'

class PgRateCard extends React.Component{  

  onSubmit = (event) => {
    event.preventDefault();

    const {
      pgRCId,
      pgRCName
    } = this.refs;

    const payload = {
      rateCardId: pgRCId.value,
      name: pgRCName.value
    }

    this.props.createPgRateCard(payload);
  }

  render() {
    return (
      <div className="page-container">

        <form onSubmit={this.onSubmit}>
          <h1 className="page-header">
            Create Pg Rate Card ID
          </h1>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Enter PG Rate Card ID:</label>
                <input className="form-control" ref="pgRCId" type="text" required = {true} />
              </div>
              <div className="form-group">
                <label>Enter PG Rate Card Name:</label>
                <input className="form-control" ref="pgRCName" type="text" required = {true} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <button className="btn btn-md btn-success" type="submit">Create</button>
              </div>
            </div>
          </div>
        </form>

        <p className="lead clearfix"></p>

        <ListPgRateCards {...this.props}/>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PgRateCard);