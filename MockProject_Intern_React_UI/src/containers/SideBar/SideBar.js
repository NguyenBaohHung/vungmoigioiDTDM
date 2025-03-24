import { useState } from 'react';
import './css/style.css';
import './SideBar.scss';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";


const SideBar = () => {

    const [isOpenSideBar, setIsOpenSideBar] = useState(true);

    const handleCloseSideBar = () => {
        setIsOpenSideBar(!isOpenSideBar);
    }

    return (
        <nav id="sidebar" className={isOpenSideBar ? 'main_sideBar' : 'main_sideBar close_main'}>
            <div className="custom-menu">
                <button onClick={() => handleCloseSideBar()} type="button" id="sidebarCollapse" className="btn btn-primary">
                    {isOpenSideBar
                        ? (<FaArrowLeft className='bars arrow' />)
                        : (<FaBars className='bars' />)
                    }
                </button>
            </div>
            <div className="p-4">
                <h1>
                    <Link to="/home" className="logo">
                        OngLei
                        <span>Korea Food</span>
                    </Link>
                </h1>
                <ul className="list-unstyled components mb-5">
                    <li className="active">
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/#">Works</Link>
                    </li>
                    <li>
                        <Link to="/#">Blog</Link>
                    </li>
                    <li>
                        <Link to="/#">Gallery</Link>
                    </li>
                </ul>

                <div className="footer">
                    <p>Copyright &copy; 2024 - Bản quyền của nhà hàng OngLei.</p>
                    <p>Được thiết kế và cung cấp bởi <a target="_blank" href="https://www.facebook.com/profile.php?id=100089328951211" rel="noreferrer">N_Crafters</a></p>
                </div>

            </div>
        </nav>
    )
}


export default SideBar;