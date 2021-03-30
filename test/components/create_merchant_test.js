import { React, mount, expect, spy, stubComponentMethod } from '../test_helpers/setup';
import CreateMerchant from '../../app/components/create_merchant';
import request from '../fixtures/create_merchant_request.json';

describe('components', () => {
  describe('<CreateMerchant />', () => {
    var getDataStub, phoneStub;

    before(() => {
      getDataStub = stubComponentMethod(CreateMerchant, 'getData').returns(request);
      phoneStub = stubComponentMethod(CreateMerchant, 'phone').returns(request.phone);
    });

    after(() => {
      getDataStub.restore();
      phoneStub.restore();
    });

    it('should dispatch a CREATE_MERCHANT_ATTEMPT action', (done) => {
      var { wrapper, props } = setup();
      wrapper.find('form').simulate('submit');

      expect(props.invalidForm).to.not.have.been.called;
      expect(props.attemptCreateMerchant).to.have.been.calledWith(
        request
      );

      done();
    });

    it('should have a name', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('name');
    });

    it('should have a merchantId', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('merchantId');
    });

    it('should have a pan', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('pan');
    });

    it('should have a serviceTax', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('serviceTax');
    });

    it('should have a tin', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('tin');
    });

    it('should have a cin', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('cin');
    });

    it('should have a phone', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('phone');
    });

    it('should have a email', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('email');
    });

    it('should have an accountNumber', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('accountNumber');
    });

    it('should have an accountType', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('accountType');
    });

    it('should have an ifsc', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('ifsc');
    });

    it('should have a building', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('building');
    });

    it('should have a street', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('street');
    });

    it('should have an area', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('area');
    });

    it('should have a locality', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('locality');
    });

    it('should have a city', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('city');
    });

    it('should have a state', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('state');
    });

    it('should have a country', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('country');
    });

    it('should have a postalCode', () => {
      const { wrapper } = setup();
      expect(wrapper).to.have.ref('postalCode');
    });

  });
});

function setup() {
  const props = {
    invalidForm: spy(),
    attemptCreateMerchant: spy()
  };

  const wrapper = mount(<CreateMerchant {...props} />);

  return {
    props,
    wrapper
  };
}
