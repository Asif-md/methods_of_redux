/**
 * Created by ashwin.raghavan on 08/05/17.
 */

import React from "react";
import StaticSlab from "components/static_slab";

class StaticSlabs extends React.Component{

  getSlabs = () => {
    const slabRefs = this.props.data.slabs.map(slab => slab.id)
    const ruleRefs = this.refs;

    return slabRefs.map((sr) => ruleRefs[sr].getData());
  }

  renderSlab = (rate, slab, index) => {
    return (
      <div className="form-group">
        <StaticSlab
          ref={slab.id}
          key={slab.id}
          index={slab.id}
          data={slab}
          rate={rate}/>
      </div>
    );
  }

  renderSlabs = (data) => {
    return data.slabs.map(this.renderSlab.bind(null, data.rate));
  }

  render() {
    const { data } = this.props;
    return(
      <div>
        {this.renderSlabs(data)}
      </div>
    )
  }
}

export default StaticSlabs;
