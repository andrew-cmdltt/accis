import { GET_DEPARTMENT } from '../actions/types.js'

const initialState = {
    department: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DEPARTMENT:
            return {
                ...state,
                department: action.payload
            }
        default:
            return state;

    }
}