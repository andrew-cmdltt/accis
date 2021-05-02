import axios from 'axios'

import {ADD_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE, GET_EMPLOYEE, GET_EMPLOYEES} from "./types";
import {tokenConfig} from "./auth";

// GET EMPLOYEES
export const getEmployees = () => (dispatch, getState) => {
    axios.get('/api/employees/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_EMPLOYEES,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// GET EMPLOYEE
export let getEmployee = (id) => (dispatch, getState) => {
    axios.get(`/api/employee/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// DELETE EMPLOYEE
export const deleteEmployee = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/employee/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_EMPLOYEE,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

// ADD EMPLOYEE
export const addEmployee = (employee) => (dispatch, getState) => {
    axios
        .post('/api/employees/', employee, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_EMPLOYEE,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

// EDIT EMPLOYEE
export const editEmployee = (employee, id) => (dispatch, getState) => {
    axios
        .put(`/api/employee/${id}/`, employee, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_EMPLOYEE,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

