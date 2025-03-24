import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import { Route, Routes } from 'react-router-dom';
// import Alert from 'react-bootstrap/Alert';
import './SystemMain.scss';


const UserRouter = (props) => {

    const [isScrollTop, setIsScrollTop] = useState(true);

    useEffect(() => {
        handleScroll();
        // Thêm sự kiện scroll vào cửa sổ khi component được mount
        window.addEventListener("scroll", handleScroll);
        // Cleanup: remove event listener khi component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY === 0) {
            setIsScrollTop(true);
        } else {
            setIsScrollTop(false);
        }
    };


    return (
        <React.Fragment >
            <div className='container-system'>
                <div className='content-header'>
                    <Header
                        isScrollTop={isScrollTop}
                    />
                </div>
                <div className='content-main'>
                    {props.children}
                </div>
                <div className='content-footer'>
                    <Footer />
                </div>
            </div>
        </React.Fragment >
    )
}


export default UserRouter;
