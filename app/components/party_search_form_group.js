import React from "react";
import PropTypes from "prop-types";
import MultiFind from "components/multi_find";
import requiredIf from "react-required-if";

const EXPRESSION = "Expression";
const INTERCHANGE = "Interchange";
class PartySearchFormGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partyType: this.props.beingEdited ? this.props.party.entryType : this.props.searchingFor === "Merchant" || this.props.searchingFor === "User" || this.props.searchingFor === "Interchange" || this.props.searchingFor === "Provider Name" ? "Merchant" : "Interchange",
      expressionPartyType: INTERCHANGE,
      hasExpression: false
    };
  }

  onEntryTypeChange = event => {
    event.preventDefault();
    const { forComponent, searchingFor, editLock, index } = this.props;
    const partyType = event.target.value;


    const { multifind } = this.refs;
    if (multifind.refs.query) {
      multifind.refs.query.value = "";
    }
    if (multifind.refs.input) {
      multifind.refs.input.value = "";
    }


    if (partyType === "User") {
      const result = {
        id: "User",
        entryType: partyType
      };
      this.setState({ partyTypeEntry: result })
      editLock(forComponent, searchingFor, result);
    }
    this.setState({
      partyType: partyType,

    });
    // if (partyType === "Expression") {
    //   const result = {
    //     id: null,
    //     entryType: partyType
    //   }
    //   editLock(forComponent, searchingFor, result)
    // }
    this.props.multiFindClear(forComponent, searchingFor, index);
  };

  onExpressionEntryTypeChange = event => {
    event.preventDefault();

    const expressionPartyType = event.target.value;

    this.setState({
      expressionPartyType
    });
  };

  getData = () => {
    const { multifind } = this.refs;
    const entryType = multifind.refs.entryType.value;
    const expressionEntryType = multifind.refs.expressionEntryType;
    const isExpression = entryType === EXPRESSION;

    return {
      partyType: isExpression ? expressionEntryType.value : entryType,
      isExpression
    };
  };

  render() {



    return (
      <MultiFind
        ref="multifind"
        hasExpression={this.props.hasExpression}
        forComponent={this.props.forComponent}
        searchingFor={this.props.searchingFor}
        index={this.props.index}
        searchResult={this.props.searchResult ? this.props.searchResult : ""}
        entryType={
          this.props.isExpressionType ? EXPRESSION : this.state.partyType
        }
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
        expressionValue={this.props.expressionValue}
      />
    );
  }
}

PartySearchFormGroup.propTypes = {
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
  required: PropTypes.bool.isRequired,
  expressionValue: PropTypes.string,
  isExpressionType: PropTypes.bool
};

PartySearchFormGroup.defaultProps = {
  isExpressionType: false,
  expressionValue: ""
};

export default PartySearchFormGroup;
