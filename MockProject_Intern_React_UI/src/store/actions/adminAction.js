import actionTypes from "./actionTypes";

import {
    getAllUserService
} from "../../services/apiServices";
//                                     GET ALL USER

export const fetch_all_user_start = (idUser) => {
    return async (dispatch, getState) => {
        try {
            await dispatch({ type: actionTypes.FETCH_ALL_USER_START })
            let res = await getAllUserService(idUser);
            if (res && res.EC === 0 && res.DT) {
                dispatch(fetch_all_user_success(res.DT));
            } else {
                dispatch(fetch_all_user_failed());
            }
        } catch (error) {
            dispatch(fetch_all_user_failed());
            console.log('fetch_all_user_failed: ', error);
        }
    }
}

export const fetch_all_user_success = (userData) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: userData
})


export const fetch_all_user_failed = () => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
})

