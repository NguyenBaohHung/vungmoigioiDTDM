import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";
import { MdAccessTime } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import Select from 'react-select';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToHash from '../ScrollToHash';
import './Home.scss';
import { pathPublic } from '../../../utils';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [pinPosition, setPinPosition] = useState(0);
    const [itemNewsMain, setItemNewsMain] = useState(null);
    const [typeRealEstate, setType] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState({});
    const [buildings, setBuildings] = useState([]);
    const [arrNews, setArrNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(false);

    // const arrNews = useMemo(() => [
    //     {
    //         name: 'Biến Động Giá Bất Động Sản Đà Nẵng 8 năm 2017-2024. Dự Đoán Trong Tương Lai Sẽ Gây Shock Trong Thị Trường Bất Động Sản Việt Nam !',
    //         image_new: 'https://res.cloudinary.com/dtjdfh2ly/image/upload/v1723275842/mock_project/20220621103357-e8c5_xaq1sy.jpg',
    //         time: ''
    //     },
    //     {
    //         name: 'Luật Kinh Doanh BĐS 2023: Cá Nhân Không Được Mua Bán BĐS Quá 10 Lần/Năm, Hiểu Thế Nào Cho Đúng?',
    //         image_new: 'https://img.iproperty.com.my/angel/750x1000-fit/wp-content/uploads/sites/7/2024/08/thi-truong-1.jpg',
    //         time: ''
    //     },
    //     {
    //         name: 'Để Mua Được Nhà Ở Xã Hội Cần Những Điều Kiện Nào Về Thu Nhập?',
    //         image_new: 'https://www.annhome.vn/wp-content/uploads/2023/05/nha-o-xa-hoi.jpg',
    //         time: ''
    //     },
    //     {
    //         name: 'Thu Nhập 45 Triệu Có Nên Mua Nhà Và Chuyển Về Đà Nẵng? Nhiều Người TPHCM Về Đà Nẵng Mua Nhà',
    //         image_new: 'https://i1-kinhdoanh.vnecdn.net/2024/04/21/7-4920-1713658925.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=WnMuuqDV-oqIWyZuAExkxw',
    //         time: ''
    //     },
    //     {
    //         name: 'Những Điểm Cộng Đắt Giá Giúp Libera Đà Nẵng Được Tích Cực Săn Đón',
    //         image_new: 'https://res.cloudinary.com/dtjdfh2ly/image/upload/v1723275842/mock_project/20220621103357-e8c5_xaq1sy.jpg',
    //         time: ''
    //     }
    // ], []);

    const priceArr = useMemo(() => [
        { value: { priceTo: 500000000 }, label: 'Dưới 500 triệu' },
        { value: { priceFrom: 500000000, priceTo: 800000000 }, label: '500 - 800 triệu' },
        { value: { priceFrom: 800000000, priceTo: 1000000000 }, label: '800 triệu - 1 tỷ' },
        { value: { priceFrom: 1000000000, priceTo: 5000000000 }, label: '1 - 5 tỷ' },
        { value: { priceFrom: 5000000000, priceTo: 10000000000 }, label: '5 - 10 tỷ' },
        { value: { priceFrom: 10000000000 }, label: 'Trên 10 tỷ' }
    ], []);
    // const areaArr = [
    //     { value: { areaTo: 100 }, label: 'Dưới 100 m\u00B2' },
    //     { value: { areaFrom: 100, areaTo: 300 }, label: '100 m\u00B2 - 300 m\u00B2' },
    //     { value: { areaFrom: 300, areaTo: 500 }, label: '300 m\u00B2 - 500 m\u00B2' },
    //     { value: { areaFrom: 500, areaTo: 800 }, label: '500 m\u00B2 - 800 m\u00B2' },
    //     { value: { areaFrom: 800, areaTo: 1000 }, label: '800 m\u00B2 - 1000 m\u00B2' },
    //     { value: { areaFrom: 1000 }, label: 'Trên 1000m\u00B2' }
    // ];
    const districts = useMemo(() => [
        { value: 'HAI_CHAU', label: 'Quận Hải Châu' },
        { value: 'THANH_KHE', label: 'Quận Thanh Khê' },
        { value: 'SON_TRA', label: 'Quận Sơn Trà' },
        { value: 'NGU_HANH_SON', label: 'Quận Ngũ Hành Sơn' },
        { value: 'CAM_LE', label: 'Quận Cẩm Lệ' },
        { value: 'HOA_VANG', label: 'Huyện Hòa Vang' },
        { value: 'LIEN_CHIEU', label: 'Quận Liên Chiểu' },
        { value: 'HOANG_SA', label: 'Huyện Hoàng Sa' }
    ], []);

    const image_pin = "https://res.cloudinary.com/dtjdfh2ly/image/upload/v1723275474/mock_project/pushpin-png-27722_j4jxjl.png";

    const image_area_1 = "https://res.cloudinary.com/dtjdfh2ly/image/upload/v1723437113/mock_project/20231122162919-9442_wm_t4kber_fjvs2o.jpg";
    const image_area_2 = "https://res.cloudinary.com/dtjdfh2ly/image/upload/v1723435614/mock_project/20230519124332-fb04_wm_mi1lz2_d50xz3.jpg";
    const image_area_3 = "https://res.cloudinary.com/dtjdfh2ly/image/upload/v1723436171/mock_project/20191030093850-e4a1_dij8qg.jpg"


    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/home/cate');
                setType(
                    (response.data.data).map(item => ({
                        value: item.categoryId,
                        label: item.categoryDes
                    }))
                )
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);




    const buildCategory = (arrCatgory) => {
        const arrCatgoryNew = [];
        arrCatgory.map(item => {
            arrCatgoryNew.push(item.value);
            return null;
        })

        return arrCatgoryNew;
    }

    const clearSearch = (id) => {
        switch (id) {
            case 'district':
                setSearch(prevSearch => {
                    const { district, ...newSearch } = prevSearch;
                    return newSearch;
                });
                break;
            case 'categoryId':
                setSearch(prevSearch => {
                    const { categoryId, ...newSearch } = prevSearch;
                    return newSearch;
                });
                break;
            case 'price':
                setSearch(prevSearch => {
                    const { priceFrom, priceTo, ...newSearch } = prevSearch;
                    return newSearch;
                });
                break;
            case 'area':
                setSearch(prevSearch => {
                    const { areaTo, areaFrom, ...newSearch } = prevSearch;
                    return newSearch;
                });
                break;
            default:
                break;
        }
    }

    const handleChangeInput = (event, id) => {
        if (!event) {
            clearSearch(id);
        } else {
            switch (id) {
                case 'district':
                    setSearch(prevSearch => ({
                        ...prevSearch,
                        district: event.value
                    }));
                    break;
                case 'categoryId':
                    setSearch(prevSearch => ({
                        ...prevSearch,
                        categoryId: buildCategory(event)
                    }));
                    break;
                case 'price':
                    setSearch(prevSearch => {
                        const { priceTo, priceFrom, ...newSearch } = prevSearch;
                        return newSearch;
                    });
                    if ('priceTo' in event.value) {
                        setSearch(prevSearch => ({
                            ...prevSearch,
                            priceTo: event.value.priceTo
                        }));
                    }
                    if ('priceFrom' in event.value) {
                        setSearch(prevSearch => ({
                            ...prevSearch,
                            priceFrom: event.value.priceFrom
                        }));
                    }
                    break;
                case 'area':
                    setSearch(prevSearch => {
                        const { areaTo, areaFrom, ...newSearch } = prevSearch;
                        return newSearch;
                    });
                    if ('areaTo' in event.value) {
                        setSearch(prevSearch => ({
                            ...prevSearch,
                            areaTo: event.value.areaTo
                        }));
                    }
                    if ('areaFrom' in event.value) {
                        setSearch(prevSearch => ({
                            ...prevSearch,
                            areaFrom: event.value.areaFrom
                        }));
                    }
                    break;
                default:
                    break;
            }
        }
    }

    const clickSeach = async () => {
        if (search.district) {
            navigate(`/product?district=${search.district}`);
        }
    }


    const clickSeachDistrict = async (district) => {
        navigate(`/product?district=${district}`);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/home/building-list?page=0`);
                setBuildings(response && response.data && response.data.data && response.data.data.content ? response.data.data.content : []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingNews(true);
                const response = await axios.get(`http://localhost:8081/home/news`);
                setArrNews(response && response.data && response.data.data && response.data.data.content ? response.data.data.content : []);
            } catch (err) {
                setError(err.message);
                setLoadingNews(false);
            } finally {
                setLoadingNews(false);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (arrNews.length > 0) {
            setItemNewsMain(arrNews[0]);
        }
    }, [arrNews]);


    const handleClickNews = useCallback((event, index) => {
        if (itemNewsMain !== arrNews[index]) {
            document.querySelector('.main_news').classList.remove('animation_image');
            setPinPosition(index * event.currentTarget.getBoundingClientRect().height);
            setItemNewsMain(arrNews[index]);
            document.querySelector('.main_news').classList.add('animation_image');
        }
    }, [itemNewsMain, arrNews])









    return (
        <React.Fragment>
            <ScrollToHash />
            {error && error}
            <div className='container-home'>
                <div className='top-home'>
                    <div className='search'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 form_search'>
                                    <Select
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary75: 'hotpink',
                                                primary: 'grey',
                                            },
                                        })}
                                        isClearable
                                        options={districts}
                                        placeholder={'Tìm kiếm tại khu vực Đà Nẵng...'}
                                        onChange={(event) => handleChangeInput(event, 'district')}
                                    />
                                    <div className='icon_search'
                                        onClick={() => clickSeach()}>
                                        <CiSearch className='icon' />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <Select
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary75: 'hotpink',
                                                primary: 'grey',
                                            },
                                        })}
                                        isMulti
                                        isClearable
                                        options={typeRealEstate}
                                        placeholder={'Loại nhà đất...'}
                                        onChange={(event) => handleChangeInput(event, 'categoryId')}
                                    />
                                </div>
                                <div className='col-6'>
                                    <Select
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary75: 'hotpink',
                                                primary: 'grey',
                                            },
                                        })}
                                        isClearable
                                        options={priceArr}
                                        placeholder={'Mức giá...'}
                                        onChange={(event) => handleChangeInput(event, 'price')}
                                    />
                                </div>
                                {/* <div className='col-4'>
                                    <Select
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary75: 'hotpink',
                                                primary: 'grey',
                                            },
                                        })}
                                        isClearable
                                        options={areaArr}
                                        placeholder={'Diện tích...'}
                                        onChange={(event) => handleChangeInput(event, 'area')}
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='danang_real_estate'>
                    <div className='content_danang'>
                        <div className='background_image'>
                            <img src="https://res.cloudinary.com/dtjdfh2ly/image/upload/v1723127690/mock_project/d35d04cf1ea3741763a94415f3122222_jfkchm.jpg" alt="danang" />
                        </div>
                        <div className='text_content_danang'>
                            <p className='title'>
                                BĐS Đà Nẵng
                            </p>
                            <p>
                                Là một trong những thành phố đáng sống bậc nhất cả nước, Đà Nẵng sở hữu tiềm năng,
                                lợi thế về chính sách cùng hạ tầng để hình thành lực đẩy,
                                tạo dư địa tăng trưởng tích cực về giá đối với bất động sản tại địa phương.
                            </p>
                            <br />
                            <p>
                                Đà Nẵng - thành phố đáng đến hàng đầu Việt Nam, là một đô thị du lịch sở
                                hữu những lợi thế về tự nhiên biển - rừng - sông - núi cùng tính kết nối cao khi
                                sở hữu các loại hình giao thông không - thủy - bộ. Với những điểm cộng này,
                                bất động sản tại Đà Nẵng có nhiều lợi thế để bứt tốc, được giới đầu tư săn đón.
                                Theo các chuyên gia, Đà Nẵng là đô thị du lịch năng động, nhiều tiềm năng để
                                phát triển thị trường bất động sản.
                            </p>
                            <Link to='/news'>
                                <button>
                                    Xem tin tức
                                </button>
                            </Link>

                        </div>
                        <div className='background_image_2'>
                            <img src="https://res.cloudinary.com/dtjdfh2ly/image/upload/v1723128465/mock_project/6549a81aa9d32ca497e773a350e49835_ozh0x0.jpg" alt="danang" />
                        </div>
                    </div>
                </div>

                <div className='outstanding'>
                    <div className='content_outstanding'>
                        <p className='title'>
                            Dự án nổi bật
                        </p>
                        {/* <SlideOption settingSlide={settings} /> */}
                        <div className='slide-optione-container'>
                            <div className='slide-optione-content'>
                                <Slider {...settings}>
                                    {buildings &&
                                        buildings.map((item, index) => {
                                            const imageArray = (item.image).split(', ');
                                            return (
                                                <Link to={pathPublic.DETAIL_PRODUCT + '?buildingId=' + item.buildingId} key={index}>
                                                    <div className='img-customize'>
                                                        <div className='info_product'>
                                                            <img alt="hjk" src={imageArray[0]} />
                                                            <div className="text">
                                                                <p className='status openForSale'>Đang mở bán</p>
                                                                <p className='name'>{item.buildingName}</p>
                                                                <p className='area'>{item.area} m<sup>2</sup></p>
                                                                <p className='address'><FaMapMarkerAlt />{item.address}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                        <div className='more'>
                            <Link to='/product'>
                                <span>Xem thêm <GoArrowRight /></span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='news'>
                    <div className='content_news'>
                        {
                            itemNewsMain
                                ?
                                <div className='main_news'>
                                    <p className='title'>
                                        Tin nổi bật
                                    </p>
                                    <Link to={pathPublic.DETAIL_NEWS + '?newsId=' + itemNewsMain.newsId}>
                                        <img alt="news" src={itemNewsMain.image} />
                                        <p className='title_news'>
                                            {itemNewsMain.title}
                                        </p>
                                        <span className='time'>
                                            <MdAccessTime className='icon_time' />
                                            <span>
                                                {(new Date(itemNewsMain.createdDate)).toISOString().replace('T', ' ').slice(0, 19)}
                                            </span>
                                        </span>
                                    </Link>
                                </div>
                                :
                                <></>
                        }
                        <div className='list_news'>
                            <div className='all_item'>
                                {loadingNews
                                    ?
                                    <p>Loading...</p>
                                    :
                                    arrNews.map((value, index) => (
                                        <div
                                            key={index}
                                            className={`item ${pinPosition === index ? 'active' : ''}`}
                                            onClick={(event) => handleClickNews(event, index)}
                                        >
                                            <p>{value.title}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <img
                                className='icon_pin'
                                alt="pin"
                                src={image_pin}
                                style={{
                                    position: 'absolute',
                                    top: `${pinPosition + 10}px`,
                                    right: '-20px',
                                    transition: 'top 0.3s ease-in-out',
                                    transform: 'rotate(45deg)',
                                    width: '50px'
                                }}
                            />
                        </div>
                        {/* <img className='icon_pin' alt="pin" src={image_pin} /> */}
                    </div>
                </div>

                <div className='area_real_estate'>
                    <div className='content_area'>
                        <p className='title'>
                            BĐS theo địa điểm
                        </p>
                        <div className="area_1" onClick={() => { clickSeachDistrict('HAI_CHAU') }}>
                            <div className='image_area' style={{ background: `url(${image_area_1}) center/cover` }}></div>
                            <p>Quận Hải Châu</p>
                        </div>
                        <div className="area_2" onClick={() => { clickSeachDistrict('SON_TRA') }}>
                            <div className='image_area' style={{ background: `url(${image_area_2}) center/cover` }}></div>
                            <p>Quận Sơn Trà</p>
                        </div>
                        <div className="area_3" onClick={() => { clickSeachDistrict('NGU_HOANH_SON') }}>
                            <div className='image_area' style={{ background: `url(${image_area_3}) center/cover` }}></div>
                            <p>Quận Ngũ Hành Sơn</p>
                        </div>
                    </div>
                    <div className='list_area'>
                        <p className='item_area' onClick={() => { clickSeachDistrict('LIEN_CHIEU') }}>Quận Liên Chiểu</p>
                        <p className='item_area' onClick={() => { clickSeachDistrict('THANH_KHE') }}>Quận Thanh Khê</p>
                        <p className='item_area' onClick={() => { clickSeachDistrict('CAM_LE') }}>Quận Cẩm Lệ</p>
                        <p className='item_area' onClick={() => { clickSeachDistrict('HOA_VANG') }}>Huyện Hòa Vang</p>
                        <p className='item_area' onClick={() => { clickSeachDistrict('HOANG_SA') }}>Huyện Hoàng Sa</p>
                    </div>
                </div>
                {/* <div className="card">
                    <main>
                        <img src="https://i.pravatar.cc/300?img=24" alt="Phoebe Probatorem" />
                        <h2>Phoebe Probatorem</h2>
                    </main>
                </div> */}
                <div className='utilities'>
                    <div className='content_utilities_1'>
                        <p className='title'>
                            Hỗ trợ tiện ích
                        </p>
                        <Link to={pathPublic.UTILITIES + '?type=xem-tuoi'}>
                            <div className='item_utilities'>
                                <img alt="utilities" src="https://staticfile.batdongsan.com.vn/images/icons/color/ic-ying-yang.svg" />
                                <p>Xem tuổi xây nhà</p>
                            </div>
                        </Link>
                        <Link to={pathPublic.UTILITIES + '?type=chi-phi'}>
                            <div className='item_utilities'>
                                <img alt="utilities" src="https://staticfile.batdongsan.com.vn/images/icons/color/ic-house.svg" />
                                <p>Chi phí làm nhà</p>
                            </div>
                        </Link>
                        <Link to={pathPublic.UTILITIES + '?type=phong-thuy'}>
                            <div className='item_utilities'>
                                <img alt="utilities" src="https://staticfile.batdongsan.com.vn/images/icons/color/ic-feng-shui.svg" />
                                <p>Tư vấn phong thủy</p>
                            </div>
                        </Link>
                    </div>

                    <div className='content_utilities_2'>
                        <div className='item-about'>
                            <img alt="icon" src="https://staticfile.batdongsan.com.vn/images/box-link-footer/ForSale.svg" />
                            <p>Bất động sản bán</p>
                            <span>
                                Bạn có thể tìm thấy ngôi nhà mơ ước thông qua lượng tin rao lớn,
                                uy tín về các loại hình bất động sản bán tại Đà Nẵng.
                            </span>
                        </div>
                        <div className='item-about'>
                            <img alt="icon" src="https://staticfile.batdongsan.com.vn/images/box-link-footer/ForRent.svg" />
                            <p>Bất động sản cho thuê</p>
                            <span>
                                Cập nhật thường xuyên và đầy đủ các loại hình bất động sản cho thuê như:
                                thuê phòng trọ, nhà riêng, thuê biệt thự, văn phòng...
                            </span>
                        </div>
                        <div className='item-about'>
                            <img alt="icon" src="https://staticfile.batdongsan.com.vn/images/box-link-footer/Wiki.svg" />
                            <p>Tin tức BĐS</p>
                            <span>
                                Chúng tôi liên tục cập nhật tin tức về mua bán, cho thuê, đầu tư, vay mua nhà thiết kế nhà,
                                mọi thông tin cần thiết để dẫn lối người tìm nhà tìm thấy căn nhà mơ ước.
                            </span>
                        </div>
                    </div>
                </div>
                <div className='background_about' id='about'>
                    <div className='text_about'>
                        <div className='introduce'>
                            <p className='title_introduce'>Về Chúng Tôi</p>
                            <div className='quotes_1'><i className="fa-solid fa-quote-left"></i></div>
                            <div>
                                <p>
                                    Vungmoigioi là nền tảng hàng đầu chuyên cung cấp dịch vụ môi giới bất động sản tại Đà Nẵng.
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
        </React.Fragment >
    )
}


export default Home;
