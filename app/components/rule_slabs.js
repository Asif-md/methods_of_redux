/**
 * Created by ashwin.raghavan on 08/05/17.
 */

import React from "react";
import RuleSlab from "components/rule_slab";

class RuleSlabs extends React.Component {
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
      <RuleSlab
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

RuleSlabs.defaultProps = {
  rate: false
};

export default RuleSlabs;
