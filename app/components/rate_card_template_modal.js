import React from "react";
import RouteComponents from "../routeComponents";
class RateTemplateModal extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        rulesetId: '',
        onRulesetClickEnabled: false
    }
    RouteComponents.ListRateCardTemplate.preload();
    RouteComponents.ShowRateCardTemplate.preload();
  }

  onRulesetClick = (id) => {
    this.setState({onRulesetClickEnabled: true, rulesetId: id});
  }

  onRulesetBackClick = () => {
    this.setState({onRulesetClickEnabled: false, rulesetId: ''});
}

  renderModal = () => {
      const match = { params: {
            id: this.state.rulesetId
      }}
      return(
        <div id="myModal" className="modal">
            <div className="modal-content">
                {this.state.onRulesetClickEnabled 
                    ?
                        <div>
                            <span className="close2" onClick={this.onRulesetBackClick}>&larr;</span>
                            <RouteComponents.ShowRateCardTemplate  fromModal={true} match={match}/>
                        </div>
                    :
                        <div>
                            <span className="close1" onClick={()=>{this.props.onSelection("")}}>&times;</span>
                            <RouteComponents.ListRateCardTemplate  
                                selectable={true} 
                                selected={this.props.rateCardTemplateId} 
                                onSelection={this.props.onSelection}
                                onRulesetClick={this.onRulesetClick}
                            />
                        </div>   
                }
            </div>
        </div>
      )
  }

  render() {
    return(
        <div>
            {this.renderModal()}
        </div>
    )
  }
}

export default RateTemplateModal;
