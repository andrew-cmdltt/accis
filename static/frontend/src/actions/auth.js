import axios from 'axios';

import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS} from './types';

// LOGIN USER
export const login = (login, password) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({login, password});
    console.log(body)
    axios
        .post('/api/auth/login/', body, config)
        .then((res) => {
            if (res.data.token) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: res.data,
                });
            }
        })
        .catch((err) => console.log(err));
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios
        .get('/api/auth/logout/', tokenConfig(getState))
        .then((res) => {
            dispatch({type: 'CLEAR_LEADS'});
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};


