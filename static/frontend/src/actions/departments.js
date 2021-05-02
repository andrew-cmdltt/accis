import axios from 'axios'

import {ADD_DEPARTMENT, DELETE_DEPARTMENT, EDIT_DEPARTMENT, GET_DEPARTMENT, GET_DEPARTMENTS} from "./types";
import {tokenConfig} from "./auth";

// GET DEPARTMENTS
export const getDepartments = () => (dispatch, getState) => {
    axios.get('/api/departments/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_DEPARTMENTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// GET DEPARTMENT
export let getDepartment = (id) => (dispatch, getState) => {
    axios.get(`/api/department/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_DEPARTMENT,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// DELETE DEPARTMENT
export const deleteDepartment = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/department/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_DEPARTMENT,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

// ADD DEPARTMENT
export const addDepartment = (department) => (dispatch, getState) => {
    axios
        .post('/api/departments/', department, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_DEPARTMENT,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

// EDIT DEPARTMENT
export const editDepartment = (department, id) => (dispatch, getState) => {
    axios
        .put(`/api/department/${id}/`, department, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_DEPARTMENT,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

