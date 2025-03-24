import axios from 'axios';
import { toast } from 'react-toastify';
// import store from './redux';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});


instance.interceptors.request.use(function (config) {
    // const localData = JSON.parse(localStorage.getItem('persist:user'));

    // const jwtToken = localData ?
    //     (localData.jwtToken.replace(/"/g, '')
    //         ? localData.jwtToken.replace(/"/g, '')
    //         : store.getState().user.jwtToken)
    //     : store.getState().user.jwtToken;

    // config.headers.Authorization = `Bearer ${jwtToken}`;

    return config;
}, function (error) {
    return Promise.reject(error);
});



instance.interceptors.response.use(function (response) {
    // console.log(response);
    return response.data;
}, function (err) {
    // console.log(err);
    const status = (err && err.response && err.response.status) || 500
    switch (status) {
        // authentication (token related issues)
        case 401: {
            // toast.error('Unauthorized the user. Please Login');
            // window.location = '/login';
            return err.response.data;
        }

        // forbidden (permission related issues)
        case 403: {
            toast.error(`You don't permission to access this resource`);
            return Promise.reject(err);
        }

        // bad request
        case 400: {
            return err.response.data;
        }

        // not found
        case 404: {
            return Promise.reject(err);
        }

        // conflict
        case 409: {
            return Promise.reject(err);
        }

        // unprocessable
        case 422: {
            return Promise.reject(err);
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(err);
        }
    }

});

export default instance;
