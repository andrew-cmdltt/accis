import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log("successfully")
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                state: null,
                token: null,
                isAuthenticated: false,
            };
        case LOGIN_FAIL:
            console.log(action.payload)
            return state
        default:
            return state;
    }
}
