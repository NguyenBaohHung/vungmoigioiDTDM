import actionTypes from "../actions/actionTypes";


const INITIAL_STATE = {
    isLoadingUser: false,
    users: []
};



const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.FETCH_ALL_USER_START:
            state.isLoadingUser = true;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.isLoadingUser = false;
            state.users = action.users;

            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USER_FAILED:
            state.isLoadingUser = false;
            state.users = [];
            return {
                ...state
            }

        default: return state;
    }
};

export default userReducer;