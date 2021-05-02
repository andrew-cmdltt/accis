import {GET_POSITIONS, DELETE_POSITION} from '../actions/types.js'
import {ADD_POSITION, EDIT_POSITION} from "../actions/types";
import {editState} from "../utils/editState";

const initialState = {
    positions: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSITIONS:
            return {
                ...state,
                positions: action.payload
            }
        case ADD_POSITION:
            return {
                ...state,
                positions: [...state.positions, action.payload],
            }
        case DELETE_POSITION:
            return {
                ...state,
                positions: state.positions.filter((position) => position.id !== action.payload)
            };
        case EDIT_POSITION:
            editState(state.positions, 'id', action.payload.id, action.payload)
            return {
                ...state,
                positions: [...state.positions]
            }
        default:
            return state;

    }
}