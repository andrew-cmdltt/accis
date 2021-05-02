import {GET_REPORTS, DELETE_REPORT, GENERATE_REPORT} from '../actions/types.js'
import {ADD_REPORT, EDIT_REPORT} from "../actions/types";
import {editState} from "../utils/editState";

const initialState = {
    reports: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REPORTS:
        case GENERATE_REPORT:
            return {
                ...state,
                reports: action.payload
            }
        case ADD_REPORT:
            return {
                ...state,
                reports: [...state.reports, action.payload],
            }
        case DELETE_REPORT:
            return {
                ...state,
                reports: state.reports.filter((report) => report.id !== action.payload)
            };
        case EDIT_REPORT:
            editState(state.reports, 'id', action.payload.id, action.payload)
            return {
                ...state,
                reports: [...state.reports]
            }
        default:
            return state;

    }
}