import { React, shallow, expect } from '../test_helpers/setup';
import LandingPage from '../../app/components/landing_page';
import Card from '../../app/components/card';

describe('components', () => {
  describe('<LandingPage />', () => {
    it('should have a card to create merchant', () => {
      var { wrapper } = setup();
      expect(wrapper).to.contain(<Card to="/ui/merchant/new">Create Merchant</Card>);
    });

    it('should have a card to list merchants', () => {
      var { wrapper } = setup();
      expect(wrapper).to.contain(<Card to="/ui/merchants">List Merchants</Card>);
    });

    it('should have a card to create ruleset', () => {
      var { wrapper } = setup();
      expect(wrapper).to.contain(<Card to="/ui/ruleset/new">Create Ruleset</Card>);
    });

    it('should have a card to list rulesets', () => {
      var { wrapper } = setup();
      expect(wrapper).to.contain(<Card to="/ui/rulesets">List Rulesets</Card>);
    });

    it('should have a card to create account', () => {
      var { wrapper } = setup();
      expect(wrapper).to.contain(<Card to="/ui/account/new">Create Account</Card>);
    });

    it('should have a card to list accounts', () => {
      var { wrapper } = setup();
      expect(wrapper).to.contain(<Card to="/ui/accounts">List Accounts</Card>);
    });

    it('should have a card to create interchange', () => {
      var { wrapper } = setup();
      expect(wrapper).to.contain(<Card to="/ui/interchange/new">Create Interchange</Card>);
    });

    it('should have a card to list interchanges', () => {
      var { wrapper } = setup();
      expect(wrapper).to.contain(<Card to="/ui/interchanges">List Interchange</Card>);
    });
  });
});

function setup() {
  const wrapper = shallow(<LandingPage />);

  return {
    wrapper
  };
}
