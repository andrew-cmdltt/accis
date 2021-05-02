import {GET_NOTIFICATIONS, DELETE_NOTIFICATION} from '../actions/types.js'

const initialState = {
    notifications: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }
        case DELETE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter((notification) => notification.id !== action.payload)
            };
        default:
            return state;

    }
}