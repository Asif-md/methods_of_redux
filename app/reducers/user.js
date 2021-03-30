import {
  LOGIN_ATTEMPT,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  SET_LOGOUT
} from '../actions/action_types';

export default function user(state = {}, action) {
  switch(action.type) {
    case LOGIN_ATTEMPT:
      return {
        ...state,
        loggedIn: false
      };
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        loggedIn: true,
        name: action.login,
        expiryDate: action.expiryDate
        // password: action.password
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loggedIn: false,
        name: null
      };
    case SET_LOGOUT:
      return {
        ...state,
        loggedIn: false,
        name: null
      };
    default:
      return state;
  }
}
