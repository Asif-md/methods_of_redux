import { React, mount, expect, stub } from '../test_helpers/setup';
import { Link } from 'react-router';
import ListRulesets from '../../app/components/list_rulesets';
import LoadList from '../../app/components/load_list';
import rulesets from '../fixtures/rulesets.json';

describe('components', () => {
  describe('<ListRulesets />', () => {
    const ruleset = rulesets[0];

    it('should link to ruleset id', () => {
      const { wrapper } = setup();
      expect(wrapper).to.contain(<Link to={`/ui/ruleset/${ruleset.id}`}>{ruleset.name}</Link>);
    });

    it('should list ruleset forEvent', () => {
      const { wrapper } = setup();
      expect(wrapper).to.contain(<span data-test-element="forEvent">{ruleset.forEvent}</span>);
    });

    it('should have a LoadList component', () => {
      var { wrapper } = setup();
      expect(wrapper).to.have.descendants(LoadList);

      const loadList = wrapper.ref('load-list');
      expect(loadList.prop("title")).to.equal("Ruleset List");
      expect(loadList.prop("recordType")).to.equal("ruleset");
    });
  });
});

function setup() {
  const props = {
    listRulesets: stub(),
    rulesets: {
      data: rulesets,
      count: rulesets.length
    }
  };

  const wrapper = mount(<ListRulesets {...props} />);

  return {
    props,
    wrapper
  };
}
