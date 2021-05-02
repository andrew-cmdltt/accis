import axios from 'axios'

import {ADD_REPORT, DELETE_REPORT, EDIT_REPORT, GENERATE_REPORT, GET_REPORT, GET_REPORTS, IMPORT_REPORT} from "./types";
import {tokenConfig} from "./auth";
const FileDownload = require('js-file-download');

// GET REPORTS
export const getReports = () => (dispatch, getState) => {
    axios.get('/api/reports/', tokenConfig(getState))
        .then(res => {
            console.log("res.data")
            console.log(res.data)
            dispatch({
                type: GET_REPORTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// GET REPORT
export let getReport = (id) => (dispatch, getState) => {
    axios.get(`/api/report/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REPORT,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// DELETE REPORT
export const deleteReport = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/report/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_REPORT,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

// ADD REPORT
export const addReport = (report) => (dispatch, getState) => {
    axios
        .post('/api/reports/', report, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_REPORT,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

// EDIT REPORT
export const editReport = (report, id) => (dispatch, getState) => {
    axios
        .put(`/api/report/${id}/`, report, tokenConfig(getState))
        .then((res) => {
            console.log("it is working")
            dispatch({
                type: EDIT_REPORT,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

// GENERATE REPORT
export let generateReport = (params) => (dispatch, getState) => {
    axios.post(`/api/generate-report/`, params, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GENERATE_REPORT,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// IMPORT REPORT
export let importReport = (form_data) => (dispatch, getState) => {
    axios.post(`/api/import/`, form_data, {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${getState().auth.token}`
        }
    })
        .then(res => {
            dispatch({
                type: IMPORT_REPORT,
                payload: res.data
            })
            console.log(res.data)
        })
        .catch(err => console.log(err))
}
