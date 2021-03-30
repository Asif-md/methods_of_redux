import { GET_AGGREGATOR_SERVICE_TYPE, GET_AGGREGATOR_SERVICE_TYPE_DONE } from 'actions/action_types';

export default function aggregatorServiceTypes(state = [], action) {
  switch (action.type) {
    case GET_AGGREGATOR_SERVICE_TYPE:
      return [];
    case GET_AGGREGATOR_SERVICE_TYPE_DONE:
      return action.list;
    default:
      return state;
  }
}
