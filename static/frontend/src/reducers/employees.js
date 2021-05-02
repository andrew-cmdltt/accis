import {GET_EMPLOYEES,DELETE_EMPLOYEE} from '../actions/types.js'
import {ADD_EMPLOYEE, EDIT_EMPLOYEE} from "../actions/types";
import {editState} from "../utils/editState";

const initialState = {
    employees: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            }
        case ADD_EMPLOYEE:
            return {
                ...state,
                employees: [...state.employees, action.payload],
            }
        case DELETE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.filter((employee) => employee.id !== action.payload)
            };
        case EDIT_EMPLOYEE:
            editState(state.employees, 'id', action.payload.id, action.payload)
            return {
                ...state,
                employees: [...state.employees]
            }
        default:
            return state;

    }
}