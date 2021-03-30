import { LIST_AGGREGATE_TYPES,LIST_AGGREGATE_TYPES_DONE} from 'actions/action_types';

export default function aggregatorServices(state = [], action) {
  switch (action.type) {
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


