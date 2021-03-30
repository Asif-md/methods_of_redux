import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import PropTypes from 'prop-types';
import AccountFind from 'components/account_find';
import requiredIf from 'react-required-if';

const EXPRESSION = "Expression";

class AccountSearchFormGroup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      partyType: this.props.beingEdited ? this.props.party.entryType : "Interchange",
      expressionPartyType: "Interchange",
      hasExpression: false
    }
  }
  
  onEntryTypeChange = (event) => {
    event.preventDefault();

    const partyType = event.target.value;

    this.setState({
      partyType
    });

    if (partyType === "User") {
      const { forComponent, searchingFor, editLock } = this.props;
      const result = {
        id: null,
        entryType: partyType
      }
      editLock(forComponent, searchingFor, result);
    }
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
      <AccountFind
        ref="multifind"
        hasExpression={this.props.hasExpression}
        forComponent={this.props.forComponent}
        searchingFor={this.props.searchingFor}
        index={this.props.index}
        searchResult={this.props.searchResult}
        entryType={this.state.partyType}
        expressionEntryType={this.state.expressionPartyType}
        onEntryTypeChange={this.onEntryTypeChange}
        onExpressionEntryTypeChange={this.onExpressionEntryTypeChange}
        inputAction={this.props.multiFindInput}
        searchAction={this.props.multiFindSearch}
        lockAction={this.props.multiFindLock}
        editLock={this.props.editLock}
        beingEdited={this.props.beingEdited}
        party={this.props.party}
        required={this.props.required}
      />
    );
  }
}


AccountSearchFormGroup.propTypes = {
  index: PropTypes.number,
  forComponent: PropTypes.string.isRequired,
  searchingFor: PropTypes.string.isRequired,
  searchResult: PropTypes.object,
  multiFindInput: PropTypes.func.isRequired,
  multiFindSearch: PropTypes.func.isRequired,
  multiFindLock: PropTypes.func.isRequired,
  editLock: PropTypes.func,
  hasExpression: PropTypes.bool,
  beingEdited: PropTypes.bool,
  party: requiredIf(PropTypes.object, props => props.beingEdited),
  required: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSearchFormGroup);
