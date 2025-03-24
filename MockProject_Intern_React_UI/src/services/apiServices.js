import axios from '../axios';


const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const handleLogout = () => {
    return axios.post('/api/logout');
}

const getUserAccount = () => {
    return axios.get(`/api/account`);
}

const getAllUserService = (idUser) => {
    return axios.get(`/api/get-all-user?id=${idUser}`)
}

export {
    handleLoginApi, handleLogout, getUserAccount,
    getAllUserService,
}