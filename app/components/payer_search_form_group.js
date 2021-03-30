import React from 'react';
import PropTypes from 'prop-types';
import MultiFind from 'components/multi_find';

const SEARCHING_FOR = "Payer";
const EXPRESSION = "Expression";

class PayerSearchFormGroup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      payerType: "Interchange",
      expressionPartyType: "Interchange",
      hasExpression: false
    }
  }
  
  onEntryTypeChange = (event) => {
    event.preventDefault();
    const { forComponent, searchingFor, index } = this.props;
    const { multifind } = this.refs;
    if(multifind.refs.query){
      multifind.refs.query.value = '';
    }
    if(multifind.refs.input){
      multifind.refs.input.value = '';
    }
    const payerType = event.target.value;

    this.setState({
      payerType
    });
    this.props.multiFindClear(forComponent, searchingFor, index);
  }

  onExpressionEntryTypeChange = (event) => {
    event.preventDefault();

    const expressionPartyType = event.target.value;

    this.setState({
      expressionPartyType
    });
  }

  getData = () => {
    const { multifind } = this.refs;
    const entryType = multifind.refs.entryType.value;
    const expressionEntryType = multifind.refs.expressionEntryType;
    const isExpression = (entryType === EXPRESSION);

    return {
      partyType: (isExpression ? expressionEntryType.value : entryType),
      isExpression
    };
  }

  render() {
    return (
      <MultiFind
        ref="multifind"
        required={true}
        hasExpression={this.props.hasExpression}
        forComponent={this.props.forComponent}
        searchingFor={this.props.searchingFor||SEARCHING_FOR}
        index={this.props.index}
        searchResult={this.props.payerSearchResult}
        entryType={this.state.payerType}
        expressionEntryType={this.state.expressionPartyType}
        onEntryTypeChange={this.onEntryTypeChange}
        onExpressionEntryTypeChange={this.onExpressionEntryTypeChange}
        inputAction={this.props.multiFindInput}
        searchAction={this.props.multiFindSearch}
        lockAction={this.props.multiFindLock}
      />
    );
  }
}

PayerSearchFormGroup.propTypes = {
  index: PropTypes.number.isRequired,
  forComponent: PropTypes.string.isRequired,
  payerSearchResult: PropTypes.object,
  multiFindInput: PropTypes.func.isRequired,
  multiFindSearch: PropTypes.func.isRequired,
  multiFindLock: PropTypes.func.isRequired,
  hasExpression: PropTypes.bool
}

export default PayerSearchFormGroup;
