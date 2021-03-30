import { React, mount, expect, spy, stubComponentMethod } from '../test_helpers/setup';
import CreateRuleset from '../../app/components/create_ruleset';
import RulesetFormBox from '../../app/components/ruleset_form_box';
import FilterFormBox from '../../app/components/filter_form_box';
import RulesFormBox from '../../app/components/rules_form_box';
import interchanges from '../fixtures/interchanges.json';
import taxAccounts from '../fixtures/tax_accounts.json';
import newRuleset from '../fixtures/new_ruleset_initial_state.json';
import request from '../fixtures/create_ruleset_request.json';
import taxes from '../fixtures/taxes.json';
import cesses from '../fixtures/cesses.json';

describe('components', () => {
  describe('<CreateRuleset />', () => {
    var getRulesetStub, getFilterStub, getRulesStub;

    before(() => {
      getRulesetStub = stubComponentMethod(CreateRuleset, 'getRuleset').returns(request.ruleset);
      getFilterStub = stubComponentMethod(CreateRuleset, 'getFilter').returns(request.filter);
      getRulesStub = stubComponentMethod(CreateRuleset, 'getRules').returns(request.rules);
    });

    after(() => {
      getRulesetStub.restore();
      getFilterStub.restore();
      getRulesStub.restore();
    });

    it('should dispatch a CREATE_RULESET action', () => {
      var { wrapper, props } = setup();
      wrapper.find('form').simulate('submit');

      expect(props.invalidForm).to.not.have.been.called;
      expect(props.createRuleset).to.have.been.calledWith(request);
    });

    it('should have a RulesetFormBox component', () => {
      var { wrapper, props } = setup();
      expect(wrapper).to.have.descendants(RulesetFormBox);
    });

    it('should have a FilterFormBox component', () => {
      var { wrapper, props } = setup();
      expect(wrapper).to.have.descendants(FilterFormBox);
    });

    it('should have a RulesFormBox component', () => {
      var { wrapper, props } = setup();
      expect(wrapper).to.have.descendants(RulesFormBox);
    });
  });
});

function setup() {
  const props = {
    invalidForm: spy(),
    createRuleset: spy(),
    listInterchanges: spy(),
    listTaxAccounts: spy(),
    listTaxes: spy(),
    listCesses: spy(),
    newRuleset,
    interchanges,
    taxAccounts,
    taxes,
    cesses
  };

  const wrapper = mount(<CreateRuleset {...props} />);

  return {
    props,
    wrapper
  };
}
