import {GET_POSITION} from '../actions/types.js'

const initialState = {
    position: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSITION:
            return {
                ...state,
                position: action.payload
            }
        default:
            return state;

    }
}