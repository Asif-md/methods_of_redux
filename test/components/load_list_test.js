import { React, shallow, expect, spy, stub } from '../test_helpers/setup';
import LoadList from '../../app/components/load_list';
import Boolean from '../../app/components/boolean';
import accounts from '../fixtures/accounts.json';

const clickEvent = { preventDefault: stub() };

describe('components', () => {
  describe('<LoadList />', () => {
    const record = accounts[0];

    it('should have a header', () => {
      const { wrapper, props } = setup();
      expect(wrapper).to.contain(<h1 className="page-header" data-test-element="header">{props.title}</h1>);
    });

    it('should list approved status', () => {
      const { wrapper } = setup();
      expect(wrapper).to.contain(<Boolean flag={record.approved} />);
    });

    it('should list active status', () => {
      const { wrapper } = setup();
      expect(wrapper).to.contain(<Boolean flag={record.active} />);
    });

    it('should dispatch a APPROVE_ATTEMPT action', () => {
      var { wrapper, props } = setup();
      wrapper.find('a[data-test-element="approve"]').first().simulate('click', clickEvent);
      // wrapper.find('a[data-test-element="approve"]').first().simulate('click');

      expect(props.attemptApprove).to.have.been.called;
    });

    it('should dispatch a ACTIVATE_ATTEMPT action', () => {
      var { wrapper, props } = setup();
      wrapper.find('a[data-test-element="activate"]').first().simulate('click', clickEvent);

      expect(props.attemptActivate).to.have.been.called;
    });

    it('should dispatch a DEACTIVATE_ATTEMPT action', () => {
      var { wrapper, props } = setup();
      wrapper.find('a[data-test-element="deactivate"]').first().simulate('click', clickEvent);

      expect(props.attemptDeactivate).to.have.been.called;
    });
  });
});

function setup() {
  const props = {
    loadAction: spy(),
    attemptApprove: spy(),
    attemptActivate: spy(),
    attemptDeactivate: spy(),
    title: "Hello List",
    recordType: "hello",
    data: accounts
  };

  const wrapper = shallow(<LoadList {...props} />);

  return {
    props,
    wrapper
  };
}
