import axios from 'axios'

import {ADD_POSITION, DELETE_POSITION, EDIT_POSITION, GET_POSITION, GET_POSITIONS} from "./types";
import {tokenConfig} from "./auth";

// GET POSITIONS
export const getPositions = () => (dispatch, getState) => {
    axios.get('/api/positions/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_POSITIONS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// GET POSITION
export let getPosition = (id) => (dispatch, getState) => {
    axios.get(`/api/position/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_POSITION,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// DELETE POSITION
export const deletePosition = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/position/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_POSITION,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

// ADD POSITION
export const addPosition = (position) => (dispatch, getState) => {
    axios
        .post('/api/positions/', position, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_POSITION,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

// EDIT POSITION
export const editPosition = (department, id) => (dispatch, getState) => {
    axios
        .put(`/api/position/${id}/`, department, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_POSITION,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

