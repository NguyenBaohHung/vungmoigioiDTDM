import React from 'react';
import './About.scss';

const About = () => {
    return (
        <React.Fragment>
            <div className='container_about'>
            <div className='contact'>
                    <div className='main_content'>
                        {/* <p className='title_contact'>Liên Hệ Với Chúng Tôi</p> */}
                        <p className='text'>Liên hệ với chúng tôi ngay hôm nay để nhận tư vấn miễn phí và thông tin chi tiết về các bất động sản tại Đà Nẵng.</p>
                        <div className='icon_map'>
                            <div className='list_icon'>
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
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245382.10791505923!2d108.04706283136477!3d16.06053663754015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142183a597c954d%3A0x27d2bd48ecfbd0f1!2zVHJ1bmcgdMOibSBIw6BuaCBjaMOtbmggVGjDoG5oIHBo4buRIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1723562137941!5m2!1svi!2s"
                                allowFullScreen="" loading="lazy"
                                className='pin_map'
                                title="Vungmoigioi"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>

                    </div>
                </div>
                <div className='background_about'>
                    <div className='text_about'>
                        <div className='introduce'>
                            <p className='title_introduce'>Về Chúng Tôi</p>
                            <div className='quotes_1'><i className="fa-solid fa-quote-left"></i></div>
                            <div>
                                <p>
                                    Trang web Vungmoigioi là nền tảng hàng đầu chuyên cung cấp dịch vụ môi giới bất động sản tại Đà Nẵng.
                                    Với sự hiểu biết sâu sắc về thị trường địa phương và đội ngũ chuyên viên tư vấn giàu kinh nghiệm,
                                    chúng tôi cam kết mang đến cho khách hàng những giải pháp bất động sản tốt nhất. Từ việc mua bán nhà đất,
                                    cho thuê căn hộ, đến các dự án đầu tư, Vungmoigioi luôn đồng hành cùng bạn trên hành trình tìm kiếm tổ ấm lý tưởng hay cơ hội đầu tư sinh lời.
                                </p>
                                <br />
                                <p>
                                    Chúng tôi tự hào là đối tác tin cậy của hàng nghìn khách hàng và nhà đầu tư tại Đà Nẵng.
                                    Vungmoigioi không chỉ đơn thuần là một trang web môi giới bất động sản, mà còn là cầu nối giữa người mua
                                    và người bán, giúp mọi giao dịch diễn ra suôn sẻ và hiệu quả. Với hệ thống thông tin minh bạch,
                                    cập nhật liên tục, và dịch vụ chăm sóc khách hàng tận tâm, chúng tôi không ngừng nỗ lực để trở thành sự lựa
                                    chọn số một trong lĩnh vực bất động sản tại Đà Nẵng.
                                </p>
                            </div>
                            <div className='quotes_2'><i className="fa-solid fa-quote-right"></i></div>
                        </div>
                    </div>
                </div>
               
            </div>
        </React.Fragment>
    )
}


export default About;
