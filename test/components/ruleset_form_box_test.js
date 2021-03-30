import { React, mount, expect } from '../test_helpers/setup';
import RulesetFormBox from '../../app/components/ruleset_form_box';

describe('components', () => {
  describe('<RulesetFormBox />', () => {
    it('should have a name', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('name');
    });

    it('should have an eventName', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('eventName');
    });

    it('should have an order', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('order');
    });

    it('should have an effectiveFrom', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('effectiveFrom');
    });

    it('should have an effectiveTo', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('effectiveTo');
    });
  });
});

function setup() {
  const wrapper = mount(<RulesetFormBox />);

  return {
    wrapper
  };
}
