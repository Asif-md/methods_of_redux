import { expect }   from 'chai';
import { attemptLogin } from '../../app/actions/action_creators';
import { LOGIN_ATTEMPT } from '../../app/actions/action_types';

describe('actions', () => {
  describe('#attemptLogin()', () => {
    it('should create an action to attempt login', () => {
      const login = 'test',
        password = 'password';
      const expectedAction = {
        type: LOGIN_ATTEMPT,
        login,
        password
      };

      const action = attemptLogin(login, password);
      expect(action).to.deep.equal(expectedAction);
    });
  });
});
