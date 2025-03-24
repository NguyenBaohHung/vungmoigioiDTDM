import React, { useEffect, useState } from 'react';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import ReactPaginate from 'react-paginate';
import ScrollToHash from '../ScrollToHash';
import './News.scss'
import { Link } from 'react-router-dom';
import { pathPublic } from '../../../utils';
import axios from 'axios';

const News = () => {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [arrNews, setArrNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(false);
    const [error, setError] = useState(null);
    // const arrNews = useMemo(() =>
    //     [
    //         {
    //             id: 1,
    //             name: 'Tấn Đức Central Park: Khu Đô Thị Giàu Sức Sống Và Tạo Thị Nhanh Nhất Khu Vực',
    //             content: 'Chưa tới một năm kể từ khi ra mắt, Tấn Đức Central Park đã nhanh chóng chứng minh mình là khu đô thị được săn đón nhất Phổ Yên khi toàn bộ các căn liền kề đã có chủ nhân. Sang đến năm nay, dự án tiếp tục lập cơn địa chấn mới với dòng sản phẩm nhà phố khi đạt được thành tích đáng kinh ngạc',
    //             time: '17/08/2024 07:00',
    //             userName: 'Đăng Nam',
    //             image: 'https://file4.batdongsan.com.vn/crop/562x284/2024/06/11/20240611100631-0794_wm.jpg'
    //         },
    //         {
    //             id: 2,
    //             name: 'Tấn Đức Central Park: Khu Đô Thị Giàu Sức Sống Và Tạo Thị Nhanh Nhất Khu Vực',
    //             content: 'Chưa tới một năm kể từ khi ra mắt, Tấn Đức Central Park đã nhanh chóng chứng minh mình là khu đô thị được săn đón nhất Phổ Yên khi toàn bộ các căn liền kề đã có chủ nhân. Sang đến năm nay, dự án tiếp tục lập cơn địa chấn mới với dòng sản phẩm nhà phố khi đạt được thành tích đáng kinh ngạc',
    //             time: '16/08/2024 08:00',
    //             userName: 'Hải Âu',
    //             image: 'https://file4.batdongsan.com.vn/crop/562x284/2024/06/11/20240611100631-0794_wm.jpg'
    //         },
    //         {
    //             id: 3,
    //             name: 'Tấn Đức Central Park: Khu Đô Thị Giàu Sức Sống Và Tạo Thị Nhanh Nhất Khu Vực',
    //             content: 'Chưa tới một năm kể từ khi ra mắt, Tấn Đức Central Park đã nhanh chóng chứng minh mình là khu đô thị được săn đón nhất Phổ Yên khi toàn bộ các căn liền kề đã có chủ nhân. Sang đến năm nay, dự án tiếp tục lập cơn địa chấn mới với dòng sản phẩm nhà phố khi đạt được thành tích đáng kinh ngạc',
    //             time: '15/08/2024 08:00',
    //             userName: 'Hải Âu',
    //             image: 'https://file4.batdongsan.com.vn/crop/562x284/2024/06/11/20240611100631-0794_wm.jpg'
    //         },
    //     ], []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingNews(true);
                const response = await axios.get(`http://localhost:8081/home/news`);
                setArrNews(response && response.data && response.data.data && response.data.data.content ? response.data.data.content : []);
                setTotalPages(response.data.data.totalPages);
            } catch (err) {
                setError(err.message);
                setLoadingNews(false);
            } finally {
                setLoadingNews(false);
            }
        };

        fetchData();
    }, []);


    const handlePageClick = async (value) => {
        await setCurrentPage(value.selected);

        const fetchData = async () => {
            try {
                setLoadingNews(true);
                const response = await axios.get(`http://localhost:8081/home/news?page=${value.selected}`);
                setArrNews(response && response.data && response.data.data && response.data.data.content ? response.data.data.content : []);
                setTotalPages(response.data.data.totalPages);
            } catch (err) {
                setError(err.message);
                setLoadingNews(false);
            } finally {
                setLoadingNews(false);
            }
        };

        fetchData();

        window.scrollTo(0, 0);
    }

    return (
        <React.Fragment>
            <ScrollToHash />
            <div className='container_news'>
                <div className='title_header'>
                    <p>Tin tức Bất Động Sản mới nhất</p>
                    <span>Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Đà Nẵng</span>
                </div>
                <div className='content_news'>
                    <div className='list_news'>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {loadingNews
                            ?
                            <p>
                                Loading...
                            </p>
                            :
                            arrNews.length > 0
                                ?
                                arrNews.map((item, index) => {
                                    return (
                                        <Link to={pathPublic.DETAIL_NEWS + '?newsId=' + item.newsId} key={index}>
                                            <div className='item_news'>
                                                <img alt="none" src={item.image} />
                                                <div className='info_news'>
                                                    <p>
                                                        {item.title}
                                                    </p>
                                                    <span>
                                                        {item.content}
                                                    </span>
                                                    <span className='time'>
                                                        {(new Date(item.createdDate)).toISOString().replace('T', ' ').slice(0, 19)} &#8226; {item.createdBy}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                                :
                                <div className='none_news' >
                                    <img alt="none" src="https://static.thenounproject.com/png/515962-200.png" />
                                    <p>Không có kết quả phù hợp</p>
                                </div>
                        }
                    </div>
                    <div className='search'>
                        <div className='container'>
                            <div className='row'>
                                <div className='title'>
                                    Hổ trợ tiện tích
                                </div>
                                <Link to={pathPublic.UTILITIES + '?type=xem-tuoi'}>
                                    <div className='col-12'>
                                        <img alt="utilities" src="https://staticfile.batdongsan.com.vn/images/icons/color/ic-ying-yang.svg" />
                                        <p>Xem tuổi xây nhà</p>
                                    </div>
                                </Link>
                                <Link to={pathPublic.UTILITIES + '?type=chi-phi'}>
                                    <div className='col-12'>
                                        <img alt="utilities" src="https://staticfile.batdongsan.com.vn/images/icons/color/ic-house.svg" />
                                        <p>Chi phí làm nhà</p>
                                    </div>
                                </Link>
                                <Link to={pathPublic.UTILITIES + '?type=phong-thuy'}>
                                    <div className='col-12'>
                                        <img alt="utilities" src="https://staticfile.batdongsan.com.vn/images/icons/color/ic-feng-shui.svg" />
                                        <p>Tư vấn phong thủy</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row pagination-row">
                    <div className="col-lg-12">
                        <nav aria-label="Page navigation example">
                            {totalPages > 0 &&
                                <ReactPaginate
                                    nextLabel={<RiArrowRightWideLine />}
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    // initialPage={0}
                                    forcePage={currentPage}
                                    pageCount={totalPages}
                                    previousLabel={<RiArrowLeftWideLine />}
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            }
                        </nav>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default News;