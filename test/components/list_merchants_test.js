import { React, mount, expect, stub } from '../test_helpers/setup';
import { Link } from 'react-router';
import ListMerchants from '../../app/components/list_merchants';
import Boolean from '../../app/components/boolean';
import LoadList from '../../app/components/load_list';
import merchants from '../fixtures/merchants.json';

describe('components', () => {
  describe('<ListMerchants />', () => {
    const merchant = merchants[0];

    it('should link to merchant id', () => {
      const { wrapper } = setup();
      expect(wrapper).to.contain(<Link to={`/ui/merchant/${merchant.id}`}>{merchant.merchantId}</Link>);
    });

    it('should list merchant name', () => {
      const { wrapper } = setup();
      expect(wrapper).to.contain(<span data-test-element="name">{merchant.name}</span>);
    });

    it('should list address verification status', () => {
      const { wrapper } = setup();
      expect(wrapper).to.contain(<Boolean flag={merchant.address.verified} falseStatus="label-default" trueText="Address Verified" falseText="Verification Pending"/>);
    });

    it('should have a LoadList component', () => {
      var { wrapper } = setup();
      expect(wrapper).to.have.descendants(LoadList);

      const loadList = wrapper.ref('load-list');
      expect(loadList.prop("title")).to.equal("Merchants View");
      expect(loadList.prop("recordType")).to.equal("merchant");
    });
  });
});

function setup() {
  const props = {
    listMerchants: stub(),
    merchants: {
      data: merchants,
      count: merchants.length
    }
  };

  const wrapper = mount(<ListMerchants {...props} />);

  return {
    props,
    wrapper
  };
}
