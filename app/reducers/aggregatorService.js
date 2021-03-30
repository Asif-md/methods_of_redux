import { CREATE_AGGREGATOR_SERVICE_TYPE, CREATE_AGGREGATOR_SERVICE_TYPE_DONE ,LIST_AGGREGATE_TYPES,LIST_AGGREGATE_TYPES_DONE} from 'actions/action_types';

export default function aggregatorService(state = [], action) {
  switch (action.type) {
    case CREATE_AGGREGATOR_SERVICE_TYPE:
      return [];
    case CREATE_AGGREGATOR_SERVICE_TYPE_DONE:
      return action.list;
    case LIST_AGGREGATE_TYPES:
      return {
        ...state,
        data: []
      };
      case LIST_AGGREGATE_TYPES_DONE:
        return {
          data: action.aggregatetypes,
        };
    default:
      return state;
  }
}


