import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import { CiSearch, CiHeart } from "react-icons/ci";
import * as actions from '../../../store/actions';
import ScrollToHash from '../ScrollToHash';
import './Product.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { pathPublic } from '../../../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const favourites = useSelector(state => state.user.favourites);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [typeRealEstate, setType] = useState([]);
    const [arrProduct, setArrProduct] = useState([]);
    const [search, setSearch] = useState({});
    const [district, setDistrict] = useState(null);

    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const priceArr = useMemo(() => [
        { value: { priceTo: 500000000 }, label: 'Dưới 500 triệu' },
        { value: { priceFrom: 500000000, priceTo: 800000000 }, label: '500 - 800 triệu' },
        { value: { priceFrom: 800000000, priceTo: 1000000000 }, label: '800 triệu - 1 tỷ' },
        { value: { priceFrom: 1000000000, priceTo: 5000000000 }, label: '1 - 5 tỷ' },
        { value: { priceFrom: 5000000000, priceTo: 10000000000 }, label: '5 - 10 tỷ' },
        { value: { priceFrom: 10000000000 }, label: 'Trên 10 tỷ' }
    ], []);
    const areaArr = useMemo(() => [
        { value: { areaTo: 100 }, label: 'Dưới 100 m\u00B2' },
        { value: { areaFrom: 100, areaTo: 300 }, label: '100 m\u00B2 - 300 m\u00B2' },
        { value: { areaFrom: 300, areaTo: 500 }, label: '300 m\u00B2 - 500 m\u00B2' },
        { value: { areaFrom: 500, areaTo: 800 }, label: '500 m\u00B2 - 800 m\u00B2' },
        { value: { areaFrom: 800, areaTo: 1000 }, label: '800 m\u00B2 - 1000 m\u00B2' },
        { value: { areaFrom: 1000 }, label: 'Trên 1000m\u00B2' }
    ], []);
    const direction = useMemo(() => [
        { value: 'east', label: 'Đông' },
        { value: 'west', label: 'Tây' },
        { value: 'south', label: 'Nam' },
        { value: 'north', label: 'Bắc' },
        { value: 'northeast', label: 'Đông Bắc' },
        { value: 'southeast', label: 'Đông Nam' },
        { value: 'northwest', label: 'Tây Bắc' },
        { value: 'southwest', label: 'Tây Nam' }
    ], []);
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

    const typeArr = useMemo(() => [
        { value: 'isSell', label: 'Nhà đất bán' },
        { value: 'isRent', label: 'Nhà đất cho thuê' }
    ], []);



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8081/home/building-list`);
                setBuildings(response && response.data && response.data.data && response.data.data.content ? response.data.data.content : []);
                setTotalPages(response.data.data.totalPages);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);





    useEffect(() => {
        try {
            const idInFavourites = new Set(JSON.parse(favourites).map(item => item.buildingId));

            const updatedArrProduct = buildings.map(item => ({
                ...item,
                isFavourite: idInFavourites.has(item.buildingId)
            }));

            setArrProduct(updatedArrProduct);
        } catch (error) {
            console.error('Error parsing JSON or updating products:', error);
        }
    }, [favourites, buildings]);



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

    const handleUpdateFavourite = (product) => {
        dispatch(actions.add_favourite(product));
    }

    const handlePageClick = async (value) => {
        await setCurrentPage(value.selected);

        const fetchData = async () => {
            try {
                setLoading(true);
                let response = null;
                const isObjectEmpty = (obj) => Object.keys(obj).length === 0;
                if (isObjectEmpty(search)) {
                    response = await axios.get(`http://localhost:8081/home/building-list?page=${value.selected}`);
                } else {
                    response = await axios.post(`http://localhost:8081/home/search?page=${value.selected}`, search);
                }
                setBuildings(response && response.data && response.data.data && response.data.data.content ? response.data.data.content : []);
                setTotalPages(response.data.data.totalPages);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        window.scrollTo(0, 0);
    }

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
                navigate(`/product`);
                // setSearch(prevSearch => {
                //     const { district, ...newSearch } = prevSearch;
                //     return newSearch;
                // });
                break;
            case 'sell_rent':
                setSearch(prevSearch => {
                    const { isSell, isRent, ...newSearch } = prevSearch;
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
            case 'bedRoom':
                setSearch(prevSearch => {
                    const { bedRoom, ...newSearch } = prevSearch;
                    return newSearch;
                });
                break;
            case 'direction':
                setSearch(prevSearch => {
                    const { direction, ...newSearch } = prevSearch;
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
                    navigate(`/product?district=${event.value}`);
                    // setSearch(prevSearch => ({
                    //     ...prevSearch,
                    //     district: event.value
                    // }));
                    break;
                case 'sell_rent':
                    setSearch(prevSearch => {
                        const { isSell, isRent, ...newSearch } = prevSearch;
                        return newSearch;
                    });
                    if (event.value === 'isSell') {
                        setSearch(prevSearch => ({
                            ...prevSearch,
                            isSell: true
                        }));
                    } else if (event.value === 'isRent') {
                        setSearch(prevSearch => ({
                            ...prevSearch,
                            isRent: true
                        }));
                    }
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
                case 'bedRoom':
                    setSearch(prevSearch => ({
                        ...prevSearch,
                        bedRoom: event.target.value
                    }));
                    break;
                case 'direction':
                    setSearch(prevSearch => ({
                        ...prevSearch,
                        direction: event.value
                    }));
                    break;
                default:
                    break;
            }
        }
    }


    const clickSeach = useCallback(async (search) => {
        setCurrentPage(0);
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:8081/home/search`, search);
            setBuildings(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        window.scrollTo(0, 0);
    }, []);


    // useEffect(() => {
    //     if (location.state !== null) {
    //         clickSeach(location.state);
    //     }
    // }, [location.state, clickSeach])

    // useEffect(() => {
    //     console.log(location.state);
    // }, [location.state]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        // setDistrict(queryParams.get('district'));
        // setSearch(district);
        if (queryParams.get('category')) {
            console.log(queryParams.get('category').split(',').map(item => item.trim()));
        }
        if (queryParams.get('district')) {
            for (const item of districts) {
                if (item.value === queryParams.get('district')) {
                    setDistrict(item);
                    setSearch(prevSearch => ({
                        ...prevSearch,
                        district: item.value
                    }));
                    break;
                }
            }
            if (district) {
                clickSeach({
                    district: district.value
                });
            }
        } else {
            setDistrict(null);
            setSearch(prevSearch => {
                const { district, ...newSearch } = prevSearch;
                return newSearch;
            });
            clickSeach({});
        }
    }, [location, districts, clickSeach, district]);


    return (
        <React.Fragment>
            <ScrollToHash />
            <div className='container_product'>
                <div className='title_header'>
                    <p>Thị trường BĐS tại Đà Nẵng</p>
                    <span>Hiện có {arrProduct.length} bất động sản</span>
                </div>
                <div className='content_product'>
                    <div className='list_product'>
                        {error && <p>{error}</p>}
                        {loading
                            ?
                            <p>Loading...</p>
                            :
                            arrProduct.length > 0
                                ?
                                arrProduct.map((item, index) => {
                                    // const imageArray = (item.image).split(', ');
                                    const imageArray = item.image ? (item.image.includes(',') ? item.image.split(', ') : [item.image]) : [];
                                    return (
                                        <div className='item_product' key={index}>
                                            <Link to={pathPublic.DETAIL_PRODUCT + '?buildingId=' + item.buildingId}>
                                                <div className={'status_product ' + (item.status === 1 ? 'updating' : item.status === 2 ? 'openForSale' : 'handedOver')}>
                                                    {item.status === 1 && 'Đang cập nhật'}
                                                    {item.status === 2 && 'Đang mở bán'}
                                                    {item.status === 3 && 'Đã bàn giao'}
                                                </div>
                                                <img alt='image_product' src={imageArray[0]} />
                                                <p>{item.buildingName}</p>
                                                <span className='detail_product'>
                                                    <span className='price'>
                                                        {
                                                            item.price >= 1000000000
                                                                ? `${(item.price / 1000000000).toFixed(1)} tỷ`
                                                                : (item.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })
                                                        }
                                                    </span>
                                                    <span><i className="fa-solid fa-chart-area"></i>{item.area} m<sup>2</sup></span>
                                                    <span><i className="fa-solid fa-bathRoom"></i> {item.bedRoom}</span>
                                                    <span><i className="fa-solid fa-bed"></i> {item.bathRoom}</span>
                                                    <span className='address'><i className="fa-solid fa-location-pin"></i> {item.address}</span>
                                                </span>
                                                <span className='description'>
                                                    {item.priceDescription}
                                                </span>
                                            </Link>
                                            <span className='profile_user'>
                                                <div className='user'>
                                                    <img alt="avatar" src="https://i.pinimg.com/474x/59/cc/07/59cc07558bbef035442bacc53ae00d4f.jpg" />
                                                    <p>{item.mangerName}</p>
                                                </div>
                                                <div className={item.isFavourite === true ? 'favorite yes' : 'favorite'} onClick={() => { handleUpdateFavourite(item) }}>
                                                    <CiHeart className={'icon_heart'} />
                                                </div>
                                            </span>
                                        </div>
                                    )
                                })
                                :
                                <div className='none_product' >
                                    <img alt="none" src="https://staticfile.batdongsan.com.vn/images/Product/listing-empty.svg" />
                                    <p>Không có kết quả phù hợp</p>
                                </div>
                        }
                    </div>
                    <div className='search'>
                        <div className='container'>
                            <div className='row'>
                                <div className='title'>
                                    Lọc dự án
                                </div>
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
                                        options={districts}
                                        placeholder={'Tìm kiếm tại khu vực Đà Nẵng...'}
                                        isClearable
                                        value={district}
                                        onChange={(event) => handleChangeInput(event, 'district')}
                                    />
                                    <div className='icon_search'
                                        onClick={() => clickSeach(search)}>
                                        <CiSearch className='icon' />
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <Select
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary75: 'hotpink',
                                                primary: 'grey',
                                            },
                                        })}
                                        options={typeArr}
                                        placeholder={'Mua & Thuê Bất Động Sản'}
                                        isClearable
                                        onChange={(event) => handleChangeInput(event, 'sell_rent')}
                                    />
                                </div>
                                <div className='col-12'>
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
                                        options={typeRealEstate}
                                        placeholder={'Loại nhà đất...'}
                                        onChange={(event) => handleChangeInput(event, 'categoryId')}
                                    />
                                </div>
                                <div className='col-12'>
                                    <Select
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary75: 'hotpink',
                                                primary: 'grey',
                                            },
                                        })}
                                        options={priceArr}
                                        placeholder={'Mức giá...'}
                                        isClearable
                                        onChange={(event) => handleChangeInput(event, 'price')}
                                    />
                                </div>
                                <div className='col-12'>
                                    <Select
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary75: 'hotpink',
                                                primary: 'grey',
                                            },
                                        })}
                                        options={areaArr}
                                        placeholder={'Diện tích...'}
                                        isClearable
                                        onChange={(event) => handleChangeInput(event, 'area')}
                                    />
                                </div>
                                <div className='col-12'>
                                    <input type="number" className='form-control' min="1" placeholder='Số phòng ngủ...'
                                        onChange={(event) => handleChangeInput(event, 'bedRoom')} />
                                </div>
                                <div className='col-12'>
                                    <Select
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary75: 'hotpink',
                                                primary: 'grey',
                                            },
                                        })}
                                        options={direction}
                                        placeholder={'Hướng nhà...'}
                                        isClearable
                                        onChange={(event) => handleChangeInput(event, 'direction')}
                                    />
                                </div>
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

export default Product;