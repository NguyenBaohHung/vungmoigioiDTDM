import MoreProduct from "./MoreProduct";
import { Button, Modal, Form } from 'react-bootstrap';
import "./style.scss";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import ScrollToHash from "../ScrollToHash";
import store from '../../../redux';
import { useSelector } from "react-redux";

function DetailProduct() {
    const location = useLocation();
    const isLogin = useSelector(state => state.user.isLoggedIn);
    const [buildingId, setBuildingId] = useState('');
    const [buildings, setBuildings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [arrayImage, setArrayImage] = useState([]);
    const [show, setShow] = useState(false);
    const [note, setNote] = useState('');
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1

    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        setBuildingId(queryParams.get('buildingId'));
    }, [location])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (buildingId) {
                    setLoading(true);
                    const response = await axios.get(`http://localhost:8081/home/building/${buildingId}`);
                    setBuildings(response && response.data && response.data.data ? response.data.data : null);
                }
            } catch (err) {
                setError(err.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [buildingId]);

    

    useEffect(() => {
        if (buildings) {
            setArrayImage((buildings.image).split(', '));
        }
    }, [buildings]);


    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (isLogin) {
            setShow(true)
        } else {
            alert("Chưa đăng nhập")
        }
    };

    const hanldeContact = async () => {
        const localData = JSON.parse(localStorage.getItem('persist:user'));
        const jwtToken = localData && localData.jwtToken ?
            (localData.jwtToken.replace(/"/g, '')
                ? localData.jwtToken.replace(/"/g, '')
                : store.getState().user.jwtToken)
            : store.getState().user.jwtToken;

        try {
            const data = {
                buildingId,
                note
            }
            const response = await axios.post('http://localhost:8081/customer',
                data,
                {
                    headers: {
                        'Authorization': jwtToken,
                    }
                });
            if (response.data.statusCode) {
                alert("Liên hệ thành công, từ giờ bạn hãy đợi cuộc gọi từ chúng tôi");
            } else {
                alert("Liên hệ thất bại");
            }
        } catch (err) {
            console.log(err);
        } finally {
            handleClose();
        }
    }



    return (
        <div className="container_detail_product">
            <ScrollToHash />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nhập ghi chú của bạn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNote">
                            <Form.Label>Ghi chú</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập ghi chú của bạn..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={hanldeContact}>
                        Lên lịch hẹn
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="container">
                <div className="row">
                    {error && error}
                    {loading
                        ?
                        <p>Loading...</p>
                        : buildings
                            ?
                            <>
                                <div className="col-10 container_detail">
                                    <div className="slideShow mb-4">
                                        <Slider {...settings}>
                                            {
                                                arrayImage.map((url, index) => (
                                                    <div key={index} className='item_image'>
                                                        <img src={url} alt={`Slide ${index + 1}`} />
                                                    </div>
                                                ))
                                            }
                                        </Slider>
                                    </div>
                                    <React.Fragment>
                                        <div className="card-body">
                                            <div className="small text-muted">January 1, 2023</div>
                                            <h2 className="card-title">{buildings.buildingName} - {buildings.area}m<sup>2</sup> - {
                                                buildings.price >= 1000000000
                                                    ? `${(buildings.price / 1000000000).toFixed(1)} tỷ`
                                                    : (buildings.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })
                                            }
                                            </h2>
                                            <p className="card-text">{buildings.address}</p>
                                            <button className="btn btn_contact" onClick={handleShow}>Liên hệ ngay</button>
                                        </div>

                                        <div className="detailProduct card-body">
                                            <h1>Thông tin mô tả</h1>
                                            <p>
                                                {buildings.priceDescription}
                                            </p>
                                        </div>

                                        <div className="tab-content" id="ex1-content">
                                            <h1>Đặc điểm bất động sản</h1>
                                            <p className="title_item">
                                                <span>Mức giá:</span> <span>
                                                    {
                                                        buildings.price >= 1000000000
                                                            ? `${(buildings.price / 1000000000).toFixed(1)} tỷ`
                                                            : (buildings.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })
                                                    }
                                                </span>
                                            </p>
                                            <p className="title_item">
                                                <span>Diện tích:</span> <span>{buildings.area} m <sup>2</sup></span>
                                            </p>
                                            <p className="title_item">
                                                <span>Phòng ngủ:</span> <span>{buildings.bedRoom}</span>
                                            </p>
                                            <p className="title_item">
                                                <span>Toilet:</span> <span>{buildings.bathRoom}</span>
                                            </p>
                                            <p className="title_item">
                                                <span>Pháp lý:</span> <span>{buildings.juridical}</span>
                                            </p>
                                            <p className="title_item">
                                                <span>Hướng nhà:</span> <span>{buildings.direction}</span>
                                            </p>
                                        </div>
                                        <div className="detailProduct card-body">
                                            <h1>Địa chỉ</h1>
                                            <iframe title="map" src={buildings.map}
                                                style={{ border: '1px solid black', borderRadius: '12px', height: '400px', width: '100%' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                        </div>
                                    </React.Fragment>
                                </div>
                                <div className="col-2 container_profile">
                                    <React.Fragment>
                                        <div className="card mb-4">
                                            <div className="card-body text-center">
                                                <img id="img-avatar" src="https://i.pinimg.com/474x/59/cc/07/59cc07558bbef035442bacc53ae00d4f.jpg" alt="avatar"
                                                    className="rounded-circle img-fluid img-avatar" />
                                                <h5 className="my-3">{buildings.mangerName}</h5>
                                                <p className="text-muted mb-1">Nhân viên tư vấn</p>
                                                <div className="d-flex justify-content-center">
                                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn_flolow">Follow</button>
                                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn_message ms-1">Message</button>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                </div>
                            </>
                            :
                            <></>
                    }

                    <div className="col-12 detailProductMore">
                        <MoreProduct />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailProduct;