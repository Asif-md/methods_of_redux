import React from 'react';
import CommonRuleBox from 'components/common_rule_box';
import EntryTypeFormGroup from 'components/entry_type_form_group';
import MerchantSearchFormGroup from 'components/merchant_search_form_group';

class FixedCommissionRule extends React.Component{
  getData = () => {
    const {
      commonRule,
      entryType,
      merchantSearch,
      commission
    } = this.refs;

    return {
      commission: commission.value,
      ...merchantSearch.getData(),
      ...entryType.getData(),
      ...commonRule.getData()
    };
  }

  render() {
    return (
      <div className="row">
        <CommonRuleBox
          ref="commonRule"
          {...this.props} />
        <div className="col-md-6">
          <EntryTypeFormGroup
            ref="entryType"
            onChange={this.props.onRuleChange}/>

          <MerchantSearchFormGroup
            ref="merchantSearch"
            index={this.props.index}
            searchResult={this.props.rule.merchantSearchResult}
            searchAction={this.props.searchMerchant}
            lockAction={this.props.lockMerchantSearch} />

          <div className="form-group">
            <label className="control-label">Commission:</label>
            <input
              className="form-control" type="number" min="0" step="any" 
              required={true}
              onChange={this.props.onRuleChange}
              ref="commission"/>
          </div>

        </div>
      </div>
    );
  }
}

export default FixedCommissionRule;
