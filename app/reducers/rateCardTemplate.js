import {
    SHOW_RATE_CARD_TEMPLATE,
    SHOW_RATE_CARD_TEMPLATE_DONE
  } from 'actions/action_types';
  
  export default function rateCardTemplate(state = {}, action) {
    switch(action.type) {
      case SHOW_RATE_CARD_TEMPLATE:
        return {};
      case SHOW_RATE_CARD_TEMPLATE_DONE:
        return action.rateCardTemplate;
      default:
        return state;
    }
  }
  