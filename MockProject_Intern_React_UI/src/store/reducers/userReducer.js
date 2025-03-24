import actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    isLoggedIn: false,
    isLoadingLogin: false,
    isLoadingApp: false,
    userInfo: null,
    jwtToken: '',
    errMessage: '',
    errCode: '',
    favourites: '[]',
    userName: null,
    role: ''
};



const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.LOGIN_START:
            return {
                ...state,
                isLoadingLogin: true,
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isLoadingLogin: false,
                jwtToken: action.jwtToken,
                userName: action.userName,
                role: action.role
            }
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                isLoadingLogin: false,
                // isLoggedIn: false,
                // jwtToken: '',
                // userName: null
            }


        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userName: null,
                jwtToken: ''
            }





        case actionTypes.FETCH_ACCOUNT_START:
            return {
                ...state,
                isLoadingApp: true,
            }
        case actionTypes.FETCH_ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isLoadingApp: false,
                jwtToken: action.jwtToken,
                userName: action.userName,
                role: action.role
            }
        case actionTypes.FETCH_ACCOUNT_FAILED:
            return {
                ...state,
                isLoadingApp: false,
                isLoggedIn: false,
                jwtToken: '',
                userName: null
            }







        case actionTypes.ADD_FAVOURITE:
            const newFavourites = JSON.parse(state.favourites);
            const exists = newFavourites.some(item => item.buildingId === action.product.buildingId);
            if (!exists) {
                action.product.isFavourite = true;
                newFavourites.push(action.product);
            } else {
                newFavourites.forEach((obj) => {
                    if (obj.buildingId === action.product.buildingId) {
                        let index = newFavourites.indexOf(obj);
                        newFavourites.splice(index, 1);
                    }
                })
            }
            return {
                ...state,
                favourites: JSON.stringify(newFavourites)
            }
        default: return state;
    }
};

export default userReducer;