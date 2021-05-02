import {GET_DEPARTMENTS, GET_DEPARTMENT, DELETE_DEPARTMENT} from '../actions/types.js'
import {ADD_DEPARTMENT, EDIT_DEPARTMENT} from "../actions/types";
import {editState} from "../utils/editState";

const initialState = {
    departments: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload
            }
        case ADD_DEPARTMENT:
            return {
                ...state,
                departments: [...state.departments, action.payload],
            }
        case DELETE_DEPARTMENT:
            return {
                ...state,
                departments: state.departments.filter((department) => department.id !== action.payload)
            };
        case EDIT_DEPARTMENT:
            editState(state.departments, 'id', action.payload.id, action.payload)
            return {
                ...state,
                departments: [...state.departments]
            }
        default:
            return state;

    }
}