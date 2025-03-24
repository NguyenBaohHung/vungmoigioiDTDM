import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../store/actions";
import { CiUser, CiHeart } from "react-icons/ci";
import { Button, Modal } from 'react-bootstrap';
import './Header.scss'
import Transaction from '../Transaction/Transaction';

const Header = (props) => {
    const { isScrollTop } = props;
    const dispatch = useDispatch();
    const location = useLocation();
    const menuRef = useRef(null);
    const isLogin = useSelector(state => state.user.isLoggedIn);
    const favourites = useSelector(state => state.user.favourites);
    const userName = useSelector(state => state.user.userName);
    const [show, setShow] = useState(false);

    const [highlightStyle, setHighlightStyle] = useState({});

    const handleLogout = () => {
        const isConfirmed = window.confirm("Bạn có chắc muốn đăng xuất khỏi hệ thống không?");
        if (isConfirmed) {
            dispatch(actions.process_Logout());
        }
    }

    const moveHighlight = (option) => {
        const optionRect = option.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        const leftPosition = optionRect.left - menuRect.left;

        setHighlightStyle({
            width: `${optionRect.width}px`,
            left: `${leftPosition}px`,
        });
    }

    useEffect(() => {
        const logWindowSize = () => {
            let arrActive = [];
            document.querySelectorAll('.menu-option').forEach(item => {
                const li = item.querySelector('li');
                li.classList.remove('active');
                if (item.pathname + item.hash === location.pathname + location.hash) {
                    li.classList.add('active');
                    arrActive.push(li);
                    moveHighlight(li);
                }
            });
            if (arrActive.length === 0) {
                setHighlightStyle({
                    left: `100%`,
                });
            }
        };

        window.addEventListener('resize', logWindowSize);

        logWindowSize();

        return () => {
            window.removeEventListener('resize', logWindowSize);
        };
    }, [location]);



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='header-container'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Các bất động sản bạn đã liên hệ với chúng tôi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Transaction
                        handleClose={handleClose}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={
                isScrollTop
                    ? 'header_content scrollTop'
                    : 'header_content unScrollTop'
            }>
                <div className='left-content col-2'>
                    <div className='header_logo'>
                        <Link to='/home' className='image_logo'></Link>
                        <div className='name_page'>
                            <p>Vungmoigioi</p>
                            <span>Start a new life</span>
                        </div>
                    </div>
                </div>

                <div className='center-content col-5'>
                    <div className='layout-not-phone'>
                        <ul className='container' ref={menuRef}>
                            <div className="highlight" style={highlightStyle}></div>
                            <Link to='/home' className="menu-option">
                                <li>
                                    Trang chủ
                                </li>
                            </Link>

                            <Link to='/product' className="menu-option">
                                <li>
                                    Dự án
                                </li>
                            </Link>

                            <Link to='/news' className="menu-option">
                                <li>
                                    Tin tức
                                </li>
                            </Link>

                            {/* <Link to='/about'>
                                <li className={location.pathname + location.hash === '/about' || location.pathname + location.hash === '/home#photos' ? 'active' : ''}>
                                    Giới thiệu
                                </li>
                            </Link> */}
                            <Link to='/home#about' className="menu-option">
                                <li>
                                    Giới thiệu
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>

                <div className='right-content col-5'>
                    <Link to='/favourite'>
                        <div className='favourite'>
                            <CiHeart className={JSON.parse(favourites).length > 0 ? 'icon_heart yes' : 'icon_heart'} />
                            <sup>{JSON.parse(favourites).length > 0 && JSON.parse(favourites).length}</sup>
                        </div>
                    </Link>
                    {isLogin
                        ?
                        <>
                            <div className='profile'
                                onClick={handleShow}
                            >
                                <CiUser className='icon_profile' />
                                <p>{userName}</p>
                            </div>
                            <div className='logout'>
                                <button
                                    onClick={() => { handleLogout() }}
                                    className='btn-logout'
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        </>
                        :
                        <>
                            <div className='login'>
                                <Link to='/login'>
                                    <button
                                        className='btn-login'
                                    >
                                        Đăng nhập
                                    </button>
                                </Link>
                            </div>
                            <div className='register'>
                                <Link to='/register'>
                                    <button
                                        className='btn-register'
                                    >
                                        Đăng ký
                                    </button>
                                </Link>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div >
    );
}


export default Header;