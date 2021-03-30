import { React, mount, expect, spy, stubComponentMethod } from '../test_helpers/setup';
import CreateAccount from '../../app/components/create_account';
import request from '../fixtures/create_account_request.json';

describe('components', () => {
  describe('<CreateAccount />', () => {
    var getDataStub;

    before(() => {
      getDataStub = stubComponentMethod(CreateAccount, 'getData').returns(request);
    });

    after(() => {
      getDataStub.restore();
    });

    it('should dispatch a CREATE_ACCOUNT_ATTEMPT action', () => {
      var { wrapper, props } = setup();
      wrapper.find('form').simulate('submit');

      expect(props.invalidForm).to.not.have.been.called;
      expect(props.attemptCreateAccount).to.have.been.calledWith(
        request
      );
    });

    it('should have a name', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('name');
    });

    it('should have an accountNo', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('accountNo');
    });

    it('should have an accountType', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('accountType');
    });

    it('should have a ifsc', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('ifsc');
    });
  });
});

function setup() {
  const props = {
    invalidForm: spy(),
    attemptCreateAccount: spy()
  };
  const wrapper = mount(<CreateAccount {...props} />);

  return {
    props,
    wrapper
  };
}
