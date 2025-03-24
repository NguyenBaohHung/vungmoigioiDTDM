import actionTypes from "../actions/actionTypes";


const INITIAL_STATE = {
    language: 'en',
    isLoadingApp: true,
    errMessage: '',
    nameApp: 'OngLei'
};

const appReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language,
            }
        default: return state;
    }
};

export default appReducer;