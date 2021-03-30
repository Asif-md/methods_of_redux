import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import requiredIf from "react-required-if";
import PleaseWait from "components/please_wait";
import SearchResult from "components/search_result";
import NoSearchResult from "components/no_search_result";

const USER = "User";
const EXPRESSION = "Expression";

const entryTypes = ["Interchange", "Merchant", "Account"];

class MultiFind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasExpression: false,
      inputValue: ""
    };
  }

  componentDidMount() {
    if (this.props.beingEdited) {
      const { party, editLock, forComponent, searchingFor } = this.props;

      if (party.entryType && party.result) {
        if (party.entryType === "User") {
          const result = {
            id: "User",
            entryType: party.entryType
          };
          editLock(forComponent, searchingFor, result);
        } else if (party.entryType === "Expression") {
          const result = {
            id: null,
            entryType: party.entryType
          }
          editLock(forComponent, searchingFor, result);
        } else {
          const query = party.result;
          this.refs.query.value = party.result;
          const result = {
            id: party.id,
            entryType: party.entryType
          };
          editLock(forComponent, searchingFor, result);
        }
      }
    }
  }

  onSearch = event => {
    event.preventDefault();
    const { forComponent, searchAction, searchingFor, index } = this.props;
    const entryType = this.refs.entryType.value;
    const query = this.refs.query.value;

    searchAction(forComponent, searchingFor, entryType, query, { index });
  };

  onInput = event => {
    event.preventDefault();
    const { forComponent, inputAction, searchingFor, index } = this.props;
    const entryType = this.refs.entryType.value;

    const expressionEntryType =
      entryType === "Expression" ? this.refs.expressionEntryType.value : null;
    const input = this.refs.input.value;

    inputAction(
      forComponent,
      searchingFor,
      entryType,
      input,
      expressionEntryType,
      { index }
    );
  };

  onLock = (event, searchIndex, ruleIndex) => {
    event.preventDefault();
    const entryType = this.refs.entryType.value;
    const { forComponent, lockAction, searchingFor } = this.props;
    lockAction(forComponent, searchingFor, entryType, searchIndex, ruleIndex);
  };

  renderSearchResults = () => {
    if (this.props.searchResult) {
      const {
        searching,
        details,
        locked,
        errorMessage
      } = this.props.searchResult;

      if (searching) {
        return <PleaseWait message="Searching" />;
      } else if (errorMessage) {
        return <NoSearchResult query={this.refs.query.value} />;
      } else if (details && !locked) {
        if (!Array.isArray(details)) {
          return (
            <SearchResult
              searchIndex={0}
              index={this.props.index}
              query={this.refs.query && this.refs.query.value ? this.refs.query && this.refs.query.value : ""}
              result={details.result}
              subResult={details.subResult}
              onClick={this.onLock}
            />
          );
        } else {
          let searchResult =
            details && details.length > 10 ? details.slice(0, 9) : [...details];
          return searchResult.map((item, index) => {
            return (
              <SearchResult
                key={item.result}
                searchIndex={index}
                index={this.props.index}
                query={this.refs.query && this.refs.query.value}
                result={item.result}
                subResult={item.subResult}
                onClick={this.onLock}
              />
            );
          });
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  renderSearchInput = () => {
    const { searchingFor, searchResult } = this.props;
    const locked = searchResult && searchResult.locked;
    const rootClass = classNames({
      "form-group": true,
      "search-success": locked
    });
    const successIconClass = classNames({
      "glyphicon glyphicon-ok success-icon": true,
      hide: !locked
    });

    return (
      <div>
        <div className={rootClass}>
          <span className={successIconClass} />
          <label className="control-label">{searchingFor}:</label>
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder={`Search ${this.props.entryType}`}
              required={this.props.required}
              onChange={this.onSearch}
              value={
                locked &&
                  searchResult &&
                  searchResult.hasOwnProperty("details") &&
                  searchResult.details &&
                  searchResult.details[searchResult.index]
                  ? searchResult.details[searchResult.index].result
                  : this.refs.query
                    ? this.refs.query.value
                    : ""
              }
              ref="query"
            />
            <a
              href="#"
              onClick={this.onSearch}
              className="input-group-addon btn btn-primary"
            >
              Search
            </a>
          </div>
        </div>
        {this.renderSearchResults()}
      </div>
    );
  };

  renderExpression = () => {
    const { searchingFor } = this.props;
    let mainEntryTypes = [...entryTypes, USER];
    if (searchingFor === "interchange") {
      mainEntryTypes = ["Interchange"];
    } else if (searchingFor === "merchant") {
      mainEntryTypes = ["Merchant"]
    } else if (searchingFor === "user") {
      mainEntryTypes = ["User"]
    }
    return (
      <div className="well">
        <div className="form-group">
          <label className="control-label">{searchingFor}:</label>
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder={`Enter ${this.props.entryType}`}
              required={this.props.required}
              defaultValue={this.props.expressionValue}
              onChange={this.onInput}
              ref="input"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">{searchingFor} Type:</label>
          <select
            className="form-control"
            required={this.props.required}
            onChange={this.props.onExpressionEntryTypeChange}
            ref="expressionEntryType"
            value={this.props.expressionEntryType}
          >
            {mainEntryTypes.map(entryType => {
              return (
                <option key={`sub-option1-${entryType}`}>{entryType}</option>
              );
            })}
          </select>
        </div>
      </div>
    );
  };

  renderSearchOrInput = () => {
    const entryType = this.props.entryType;

    if (entryType === USER) {
      return null;
    } else if (entryType === EXPRESSION) {
      return this.renderExpression();
    } else {
      return this.renderSearchInput();
    }
  };

  render() {

    const { searchingFor, hasExpression } = this.props;
    let mainEntryTypes = [...entryTypes, USER]; //(searchingFor === "FromParty") ? [...entryTypes, USER] :
    if (hasExpression) {
      mainEntryTypes.push(EXPRESSION);
    }
    if (searchingFor === "Merchant" || searchingFor === "Provider Name") {
      mainEntryTypes = ["Merchant"];
    } else if (searchingFor === "Interchange") {
      mainEntryTypes = ["Interchange"]
    } else if (searchingFor === "Pg Id") {
      mainEntryTypes = ["Interchange"];
    } else if (searchingFor === "User") {
      mainEntryTypes = ["User"]
    }
    return (
      <div>
        <div className="form-group">
          <label className="control-label">{searchingFor} Type:</label>
          <select
            className="form-control"
            required={this.props.required}
            onChange={this.props.onEntryTypeChange}
            ref="entryType"
            value={
              mainEntryTypes.length === 1
                ? mainEntryTypes[0]
                : this.props.entryType
            }
          >
            {mainEntryTypes.map(entryType => {
              return <option key={`option-${entryType}`}>{entryType}</option>;
            })}
          </select>
        </div>
        {this.renderSearchOrInput()}
      </div>
    );
  }
}

MultiFind.propTypes = {
  index: PropTypes.number,
  forComponent: PropTypes.string.isRequired,
  searchingFor: PropTypes.string.isRequired,
  searchResult: PropTypes.object,
  searchAction: PropTypes.func.isRequired,
  inputAction: PropTypes.func.isRequired,
  lockAction: PropTypes.func.isRequired,
  editLock: PropTypes.func,
  entryType: PropTypes.string.isRequired,
  hasExpression: PropTypes.bool,
  onEntryTypeChange: PropTypes.func.isRequired,
  expressionEntryType: requiredIf(
    PropTypes.string,
    props => props.hasExpression
  ),
  onExpressionEntryTypeChange: requiredIf(
    PropTypes.func,
    props => props.hasExpression
  ),
  beingEdited: PropTypes.bool,
  party: requiredIf(PropTypes.object, props => props.beingEdited),
  required: PropTypes.bool.isRequired,
  expressionValue: PropTypes.string
};

MultiFind.defaultProps = {
  expressionValue: ""
};

export default MultiFind;
