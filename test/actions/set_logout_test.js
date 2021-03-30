import { expect }   from 'chai';
import { setLogout } from '../../app/actions/action_creators';
import { SET_LOGOUT } from '../../app/actions/action_types';

describe('actions', () => {
  describe('#setLogout()', () => {
    it('should create an action to set logout', () => {
      const expectedAction = {
        type: SET_LOGOUT
      };

      const action = setLogout();
      expect(action).to.deep.equal(expectedAction);
    });
  });
});
