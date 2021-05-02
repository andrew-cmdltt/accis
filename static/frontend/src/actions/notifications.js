import axios from 'axios'

import {DELETE_NOTIFICATION, GET_NOTIFICATIONS} from "./types";
import {tokenConfig} from "./auth";

// GET NOTIFICATIONS
export const getNotifications = () => (dispatch, getState) => {
    axios.get('/api/notifications/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_NOTIFICATIONS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// DELETE NOTIFICATION
export const deleteNotification = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/notification/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_NOTIFICATION,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};


