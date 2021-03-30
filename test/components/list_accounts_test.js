import { React, mount, expect, stub } from '../test_helpers/setup';
import { Link } from 'react-router';
import ListAccounts from '../../app/components/list_accounts';
import LoadList from '../../app/components/load_list';
import accounts from '../fixtures/accounts.json';

describe('components', () => {
  describe('<ListAccounts />', () => {
    const account = accounts[0];

    it('should link to account id', () => {
      const { wrapper } = setup();
      expect(wrapper).to.contain(<Link to={`/ui/account/${account.id}`}>{account.accountNo}</Link>);
    });

    it('should list account name', () => {
      const { wrapper } = setup();
      expect(wrapper).to.contain(<span data-test-element="name">{account.name}</span>);
    });

    it('should have a LoadList component', () => {
      var { wrapper } = setup();
      expect(wrapper).to.have.descendants(LoadList);

      const loadList = wrapper.ref('load-list');
      expect(loadList.prop("title")).to.equal("Accounts List");
      expect(loadList.prop("recordType")).to.equal("account");
    });
  });
});

function setup() {
  const props = {
    listAccounts: stub(),
    accounts
  };

  const wrapper = mount(<ListAccounts {...props} />);

  return {
    props,
    wrapper
  };
}
