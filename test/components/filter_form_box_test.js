import { React, mount, expect, spy } from '../test_helpers/setup';
import FilterFormBox from '../../app/components/filter_form_box';
import FilterExpression from '../../app/components/filter_expression';
import newRuleset from '../fixtures/new_ruleset_initial_state.json';

describe('components', () => {
  describe('<FilterFormBox />', () => {
    it('should have a name', () => {
      const { wrapper, props } = setup();
      expect(wrapper).to.have.ref('name');
    });

    it('should have a FilterExpression component', (done) => {
      const { wrapper } = setup();
      expect(wrapper).to.have.descendants(FilterExpression);
      done();
    });

    it('should trigger onChange event for name', (done) => {
      const { wrapper, props } = setup();
      const input = wrapper.ref('name');
      input.simulate('change');
      expect(props.changeFilterName).to.have.been.called;
      done();
    });
  });
});

function setup() {
  const props = {
    changeFilterName: spy(),
    newRuleset
  };
  const wrapper = mount(<FilterFormBox {...props} />);

  return {
    props,
    wrapper
  };
}
