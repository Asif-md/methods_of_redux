import { React, mount, expect, spy, stubComponentMethod } from '../test_helpers/setup';
import CreateInterchange from '../../app/components/create_interchange';
import request from '../fixtures/create_interchange_request.json';

describe('components', () => {
  describe('<CreateInterchange />', () => {
    var getDataStub;

    before(() => {
      getDataStub = stubComponentMethod(CreateInterchange, 'getData').returns(request);
    });

    after(() => {
      getDataStub.restore();
    });

    it('should dispatch a CREATE_INTERCHANGE_ATTEMPT action', () => {
      var { wrapper, props } = setup();
      wrapper.find('form').simulate('submit');

      expect(props.invalidForm).to.not.have.been.called;
      expect(props.attemptCreateInterchange).to.have.been.calledWith(
        request
      );
    });

    it('should have a name', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('name');
    });

    it('should have an interchangeId', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('interchangeId');
    });

    it('should have a pan', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('pan');
    });

    it('should have a serviceTaxNo', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('serviceTaxNo');
    });

    it('should have a tin', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('tin');
    });

    it('should have a cin', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('cin');
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
    attemptCreateInterchange: spy()
  };
  const wrapper = mount(<CreateInterchange {...props} />);

  return {
    props,
    wrapper
  };
}
