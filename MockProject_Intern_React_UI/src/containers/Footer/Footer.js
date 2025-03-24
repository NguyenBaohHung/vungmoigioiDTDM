import React from "react";
import { Link } from 'react-router-dom';
import './Footer.scss';


const Footer = (props) => {
    return (
        <React.Fragment>
            <div className="footer-container">
                <footer
                    className="text-center text-lg-start text-dark"
                    style={{ backgroundColor: '#ECEFF1' }}
                >
                    <section
                        className="d-flex justify-content-between p-4 section_me"
                    >
                        <div className="me-5">
                            <span>Get connected with us on social networks:</span>
                        </div>

                        <div>
                            <a href="/home" className="me-4">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="/home" className="me-4">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="/home" className="me-4">
                                <i className="fab fa-google"></i>
                            </a>
                        </div>
                    </section>

                    <section className="main_section">
                        <div className="container_main_section mt-5">
                            <div className="row mt-3">
                                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                                    <div className='header_logo'>
                                        <Link to='/home' className='image_logo'></Link>
                                        <div className='name_page'>
                                            <p>Vungmoigioi</p>
                                            <span>Start a new life</span>
                                        </div>
                                    </div>
                                    <hr
                                        className="mb-4 mt-0 d-inline-block mx-auto"
                                    />
                                    <p>
                                        Khám phá thị trường bất động sản Đà Nẵng với Vungmoigioi,
                                        nơi bạn không chỉ tìm thấy ngôi nhà mơ ước mà còn nắm bắt được
                                        những cơ hội đầu tư vàng, đảm bảo giá trị và tiềm năng phát triển
                                        vượt bậc trong tương lai.
                                    </p>
                                </div>

                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <div className="title_main"><h6 className="text-uppercase fw-bold">Giới Thiệu</h6></div>
                                    <hr
                                        className="mb-4 mt-0 d-inline-block mx-auto"
                                    />
                                    <p>
                                        <a href="#!" className="text-dark">BĐS Bán</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-dark">BĐS Cho Thuê</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-dark">Tin tức</a>
                                    </p>
                                </div>

                                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <div className="title_main"><h6 className="text-uppercase fw-bold">BĐS Theo Địa Điểm</h6></div>

                                    <hr
                                        className="mb-4 mt-0 d-inline-block mx-auto"
                                    />
                                    <p>
                                        <a href="#!" className="text-dark">Quận Hải Châu</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-dark">Quận Sơn Trà</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-dark">Quận Liên Chiểu</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-dark">Quận Thanh Khê</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-dark">Quận Ngũ Hành Sơn</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-dark">Huyện Hòa Vang</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-dark">Huyện Hoàng Sa</a>
                                    </p>
                                </div>

                                <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mb-md-0 mb-4 contact_footer">
                                    <div className="title_main"><h6 className="text-uppercase fw-bold">Liên Lạc</h6></div>

                                    <hr
                                        className="mb-4 mt-0 d-inline-block mx-auto"
                                    />
                                    <p><i className="fas fa-home mr-3"></i> HaiChau - DaNang</p>
                                    <p><i className="fas fa-envelope mr-3"></i> vungmoigioi@gmail.com</p>
                                    <p><i className="fas fa-phone mr-3"></i> 0121 738 362</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="p-3 copyright"
                        style={{ backgroundColor: 'gba(0, 0, 0, 0.2)' }}

                    >
                        © 2020 Copyright:
                        <a className="text-dark" href="https://mdbootstrap.com/"> vungmoigioi.com.dn</a>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
}

export default Footer;