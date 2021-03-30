import { GET_SAC_CODE, GET_SAC_CODE_DONE } from 'actions/action_types';

export default function SacCodeTypes(state = [], action) {
    switch (action.type) {
        case GET_SAC_CODE:
            return [];
        case GET_SAC_CODE_DONE:
            return action.list;
        default:
            return state;
    }
}
