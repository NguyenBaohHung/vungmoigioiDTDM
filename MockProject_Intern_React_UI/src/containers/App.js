import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LineWave } from 'react-loader-spinner';
import jwt from "jsonwebtoken";
import { path } from '../utils/index';
import * as actions from "../store/actions";
import Authentication from './Router/Authentication';
// import PublicRouter from './Router/Public/PublicRouter';
import Login from '../containers/Auth/Login';
import Register from '../containers/Auth/Register';
import Home from './System/Home/Home';
import Favourite from './System/Favourie/Favourite';
import SystemMain from './Router/SystemMain';
import PrivateRouter from './Router/Private/PrivateRouter';
import PublicRouter from './Router/Public/PublicRouter';
import Product from './System/Product/Product';
import DetailProduct from './System/DetailProduct/DetailProduct';
import News from './System/News/News';
import DetailNews from './System/News/DetailNews';
import Utilities from './System/Utilities/Utilities';
import HomePage from './System/HomePage';
import store from '../redux';
import './App.scss';

const AppContent = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const initialPathname = useRef(location.pathname);
    const isLoadingAppProps = useSelector(state => state.user.isLoadingApp);
    const isAuthenticated = useSelector(state => state.user.isLoggedIn);

    useEffect(() => {
        if (location.pathname !== '/login' && location.pathname !== '/register') {
            localStorage.setItem('path', location.pathname);
        }
    }, [location]);

    const fetchAccountFalied = useCallback(
        () => {
            dispatch(actions.fetch_account_failed());
        }, [dispatch]
    );

    const fetchAccount = useCallback(
        (jwtToken, username) => {
            if (jwtToken && username) {
                dispatch(actions.fetch_account_success(jwtToken, username));
            }
        }, [dispatch]
    );

    // componentDidmount
    useEffect(() => {
        if (initialPathname.current !== '/login') {
            const localData = JSON.parse(localStorage.getItem('persist:user'));

            const jwtToken = localData && localData.jwtToken ?
                (localData.jwtToken.replace(/"/g, '')
                    ? localData.jwtToken.replace(/"/g, '')
                    : store.getState().user.jwtToken)
                : store.getState().user.jwtToken;

            if (jwtToken) {
                try {
                    const decoded = jwt.verify(jwtToken, process.env.REACT_APP_JWT_SECRET);
                    fetchAccount(jwtToken, decoded.username, decoded.authorities);
                    // Thực hiện các hành động tiếp theo, ví dụ như truy cập dữ liệu từ decoded token
                } catch (err) {
                    console.error("Token không hợp lệ hoặc đã hết hạn:", err.message);
                    fetchAccountFalied();
                    // Xử lý lỗi khi token không hợp lệ hoặc hết hạn
                }
            }
        }
    }, [fetchAccount, fetchAccountFalied]);

    if (isLoadingAppProps) {
        return (
            <LineWave
                height="300"
                width="300"
                color="#81802a"
                wrapperStyle={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh'
                }}
            />
        );
    } else if (isLoadingAppProps === false) {
        return (
            <Routes>
                {/* <Route path={path.LOGIN} element={
                    <PublicRouter isAuthenticated={isAuthenticated}>
                        <Login />
                    </PublicRouter>}
                /> */}
                <Route index element={<HomePage />} />

                <Route path={path.LOGIN} element={<Login />} />
                <Route path={path.REGISTER} element={<Register />} />

                <Route path={path.SYSTEM}
                    element={
                        <Authentication
                            location={location}
                            isAuthenticated={isAuthenticated}>
                            <SystemMain>
                                <PrivateRouter>
                                </PrivateRouter>
                            </SystemMain>

                            <SystemMain>
                                <PublicRouter>
                                    <Home />
                                    <Favourite />
                                    <News />
                                    <Product />
                                    <DetailProduct />
                                    <DetailNews />
                                    <Utilities />
                                </PublicRouter>
                            </SystemMain>
                        </Authentication>
                    }
                />
            </Routes>
        );
    }
}

const App = () => {
    return (
        <div className="app-container">
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={30000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
