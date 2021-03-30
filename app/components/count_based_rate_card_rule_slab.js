import React from "react";
import RateCardRuleSlab from "components/rate_card_rule_slab";
class CountBasedRateCardRuleSlab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: 0,
      to: 0,
      value: null,
      rate: null,
      slabbedFee: false,
      slabs: [this.getNewSlabRef()]
    };
  }

  handleCheckBoxChange = event => {
    this.setState({ [event.target.id]: !this.state[event.target.id] });
  };

  getData = () => {
    const { from, to, value, rate } = this.refs;

    let slabbedFees = this.state.slabbedFee ? this.getSlabs() : [];
    return {
      fromCount: Number(from.value),
      //toCount: Number(to.value),
      toCount: Number(to.value),
      value: Number(value.value),
      rate: rate.checked,
      slabbedFee: this.state.slabbedFee,
      slabbedFees
    };
  };

  getSlabs = () => {
    const slabRefs = this.state.slabs;
    const ruleRefs = this.refs;

    return slabRefs.map(sr => ruleRefs[sr].getData());
  };

  getNewSlabRef = () => {
    const index = Date.now();
    return `count-slab-${index}`;
  };

  onAddSlab = event => {
    event.preventDefault();

    this.setState({ slabs: [...this.state.slabs, this.getNewSlabRef()] });
  };

  removeSlab = slabIndex => {
    const oldSlabs = this.state.slabs;
    if (oldSlabs.length === 1) {
      return;
    }
    const index = oldSlabs.indexOf(slabIndex);

    this.setState({
      slabs: [
        ...this.state.slabs.slice(0, index),
        ...this.state.slabs.slice(index + 1)
      ]
    });
  };

  renderSlab = (slab, index) => {
    return (
      <RateCardRuleSlab
        ref={slab}
        key={slab}
        index={slab}
        onAddSlab={this.onAddSlab}
        removeSlab={this.removeSlab}
        rate={this.props.rate}
      />
    );
  };

  renderSlabs = () => {
    return this.state.slabs.map(this.renderSlab);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="borderForm">
        <div className="row">
          <div className="col-md-3">
            <label>
              From Count:
              <input
                className="form-control"
                type="number"
                min="0"
                defaultValue={0}
                required={false}
                onChange={this.props.onRuleChange}
                //onChange={this.onChange}
                //name="from"
                ref="from"
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              To Count:
              <input
                className="form-control"
                type="number"
                min="0"
                defaultValue={0}
                required={false}
                onChange={this.props.onRuleChange}
                //onChange={this.onChange}
                ref="to"
                //name="to"
              />
            </label>
          </div>
          <div className="col-md-3">
            <label>
              Value:
              <input
                className="form-control"
                type="number"
                min="0"
                step="any"
                defaultValue={0}
                required={false}
                // onChange={this.onChange}
                // name="value"
                onChange={this.props.onRuleChange}
                ref="value"
              />
            </label>
          </div>
          <div className="btn-toolbar col-md-3">
            <button
              className="btn btn-danger btn-xs"
              onClick={() => {
                this.props.removeSlab(this.props.index);
              }}
            >
              <span className="glyphicon glyphicon-minus" />
            </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={this.props.onAddSlab}
            >
              <span className="glyphicon glyphicon-plus" />
            </button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-3">
            <label>
              <input
                ref="rate"
                // name="rate"
                type="checkbox"
              />
              Rate
            </label>
          </div>
          <div className="col-md-3">
            <label>
              <input
                id="slabbedFee"
                onChange={this.handleCheckBoxChange}
                type="checkbox"
              />
              Slabbed Fee
            </label>
          </div>
        </div>
        <br />

        {this.state.slabbedFee && (
          <div>
            <div className="row">
              <div className="col-md-3">
                <label className="control-label">From (paisa)</label>
              </div>
              <div className="col-md-3">
                <label className="control-label">To (paisa)</label>
              </div>
              <div className="col-md-3">
                <label className="control-label">Fee (In %)</label>
              </div>
              <div className="col-md-1">
                <label className="control-label">Rate </label>
              </div>
              <div className="col-md-3" />
            </div>
            {this.renderSlabs()}
          </div>
        )}
      </div>
    );
  }
}

export default CountBasedRateCardRuleSlab;
