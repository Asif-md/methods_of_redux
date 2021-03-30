import { React, mount, expect, spy } from '../test_helpers/setup';
import FilterExpression from '../../app/components/filter_expression';

describe('components', () => {
  describe('<FilterExpression />', () => {
    it('should have a left operand', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('leftOperand');
    });

    it('should have a operation', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('operation');
    });

    it('should have a rightOperand', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('rightOperand');
    });

    it('should trigger onChange event for left operand', (done) => {
      expectChangeFilterForRef('leftOperand');
      done();
    });

    it('should trigger onChange event for operation', (done) => {
      expectChangeFilterForRef('operation');
      done();
    });

    it('should trigger onChange event for right operand', (done) => {
      expectChangeFilterForRef('rightOperand');
      done();
    });

    it('should be able to add filter', (done) => {
      const { wrapper, props } = setup();
      const input = wrapper.find('button[data-test-element="add-filter"]');
      input.simulate('click');
      expect(props.addFilter).to.have.been.called;
      done();
    });

    it('should be able to remove filter', (done) => {
      const { wrapper, props } = setup();
      const input = wrapper.find('button[data-test-element="remove-filter"]');
      input.simulate('click');
      expect(props.removeFilter).to.have.been.called;
      done();
    });
  });
});

function setup() {
  const props = {
    changeFilter: spy(),
    addFilter: spy(),
    removeFilter: spy()
  };
  const wrapper = mount(<FilterExpression {...props} />);

  return {
    props,
    wrapper
  };
}

function expectChangeFilterForRef(refName) {
  const { wrapper, props } = setup();
  const input = wrapper.ref(refName);
  input.simulate('change');
  expect(props.changeFilter).to.have.been.called;
}
