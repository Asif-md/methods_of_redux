import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PleaseWait from 'components/please_wait';
import SearchResult from 'components/search_result';
import NoSearchResult from 'components/no_search_result';
class MerchantSearchFormGroup extends React.Component{
  
  getData = () => {
    return {
      merchant: this.refs.merchant.value
    };
  }

  onSearch = (event) => {
    event.preventDefault();
    const merchantShortId = this.refs.merchant.value;

    this.props.searchAction(
      this.props.index,
      merchantShortId
    );
  }

  onLock = (event) => {
    event.preventDefault();
    this.props.lockAction(this.props.index);
  }

  renderSearchResults = () => {
    const { searching, details, locked, errorMessage } = this.props.searchResult;

    if (searching) {
      return (
        <PleaseWait message="Searching" />
      );
    } else if (errorMessage) {
      return (
        <NoSearchResult
          query={this.refs.merchant.value} />
      );
    } else if (details && !locked) {
      return (
        <SearchResult
          query={this.refs.merchant.value}
          result={details.result}
          subResult={details.subResult}
          onClick={this.onLock}
        />
      );
    } else {
      return null;
    }
  }

  renderSearch = () => {
    if (this.props.searchResult) {
      return this.renderSearchResults();
    } else {
      return null;
    }
  }

  render() {
    const locked = this.props.searchResult && this.props.searchResult.locked;
    const rootClass = classNames({
      'form-group': true,
      'search-success': locked
    });
    const successIconClass = classNames({
      'glyphicon glyphicon-ok success-icon': true,
      'hide': !locked
    });

    return (
      <div>
        <div className={rootClass}>
          <span className={successIconClass}></span>
          <label className="control-label">Merchant:</label>
          <div className="input-group">
            <input
              className="form-control" type="text"
              placeholder="Search Merchant"
              required = {true}
              onChange={this.onSearch}
              ref="merchant"/>
            <a
              href="#"
              onClick={this.onSearch}
              className="input-group-addon btn btn-primary">Search</a>
          </div>
        </div>
        {this.renderSearch()}
      </div>
    );
  }
}

MerchantSearchFormGroup.propTypes = {
  index: PropTypes.number.isRequired,
  searchResult: PropTypes.object,
  searchAction: PropTypes.func.isRequired,
  lockAction: PropTypes.func.isRequired
}

export default MerchantSearchFormGroup;
