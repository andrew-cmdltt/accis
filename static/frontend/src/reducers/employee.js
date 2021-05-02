import {GET_EMPLOYEE} from '../actions/types.js'

const initialState = {
    employee: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEE:
            return {
                ...state,
                employee: action.payload
            }
        default:
            return state;

    }
}