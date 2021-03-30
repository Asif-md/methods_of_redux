import { React, mount, expect, stub } from '../test_helpers/setup';
import { Link } from 'react-router';
import ListInterchanges from '../../app/components/list_interchanges';
import LoadList from '../../app/components/load_list';
import interchanges from '../fixtures/interchanges.json';

describe('components', () => {
  describe('<ListInterchanges />', () => {
    const interchange = interchanges[0];

    it('should link to interchange id', () => {
      const { wrapper } = setup();
      expect(wrapper).to.contain(<Link to={`/ui/interchange/${interchange.id}`}>{interchange.interchangeId}</Link>);
    });

    it('should list account number', () => {
      const { wrapper } = setup();
      expect(wrapper).to.contain(<span data-test-element="acc-number">{interchange.accountNo}</span>);
    });

    it('should list account type', () => {
      const { wrapper } = setup();
      expect(wrapper).to.contain(<span data-test-element="acc-type">{interchange.accountType}</span>);
    });

    it('should have a LoadList component', () => {
      var { wrapper } = setup();
      expect(wrapper).to.have.descendants(LoadList);

      const loadList = wrapper.ref('load-list');
      expect(loadList.prop("title")).to.equal("Interchange View");
      expect(loadList.prop("recordType")).to.equal("interchange");
    });
  });
});

function setup() {
  const props = {
    listInterchanges: stub(),
    interchanges
  };

  const wrapper = mount(<ListInterchanges {...props} />);

  return {
    props,
    wrapper
  };
}
