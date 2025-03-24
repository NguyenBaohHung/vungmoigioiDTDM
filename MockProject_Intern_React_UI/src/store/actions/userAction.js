import actionTypes from "./actionTypes";

//                                     LOGIN

export const login_success = (jwtToken, userName, role) => ({
    type: actionTypes.LOGIN_SUCCESS,
    jwtToken: jwtToken,
    userName: userName,
    role: role
})

export const login_failed = () => ({
    type: actionTypes.LOGIN_FAILED
})


//                                LOGOUT
export const process_Logout = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.PROCESS_LOGOUT })
        } catch (error) {
            console.log("logout failed: ", error);
        }
    }
}





//                                     FETCH ACCOUNT

export const fetch_account_success = (jwtToken, userName, role) => ({
    type: actionTypes.FETCH_ACCOUNT_SUCCESS,
    jwtToken: jwtToken,
    userName: userName,
    role: role
})

export const fetch_account_failed = () => ({
    type: actionTypes.FETCH_ACCOUNT_FAILED,
})



//                                      UPDATE FAVOURITE
export const add_favourite = (product) => (
    {
        type: actionTypes.ADD_FAVOURITE,
        product: product,
    }
)
