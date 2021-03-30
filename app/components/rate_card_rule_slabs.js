/**
 * Created by ashwin.raghavan on 08/05/17.
 */

import React from "react";
import RateCardRuleSlab from "components/rate_card_rule_slab";
import CountBasedRateCardRuleSlab from "components/count_based_rate_card_rule_slab";
class RateCardRuleSlabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slabs: [this.getNewSlabRef()]
    };
  }

  getSlabs = () => {
    const slabRefs = this.state.slabs;
    const ruleRefs = this.refs;

    return slabRefs.map(sr => ruleRefs[sr].getData());
  };

  getNewSlabRef = () => {
    const index = Date.now();
    return `slab-${index}`;
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
    let Slab = this.props.type ? CountBasedRateCardRuleSlab : RateCardRuleSlab;
    return (
      <Slab
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

  render() {
    return <div>{this.renderSlabs()}</div>;
  }
}

RateCardRuleSlabs.defaultProps = {
  rate: false
};

export default RateCardRuleSlabs;
