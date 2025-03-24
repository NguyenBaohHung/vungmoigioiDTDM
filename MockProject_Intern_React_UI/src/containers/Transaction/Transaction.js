import React, { useEffect, useState } from "react";
import store from '../../redux';
import axios from "axios";
import './Transaction.scss';
import { Link } from "react-router-dom";
import { pathPublic } from "../../utils";

const Transaction = (props) => {
    const [transaction, setTransaction] = useState([]);
    const [arrProduct, setArrProduct] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const localData = JSON.parse(localStorage.getItem('persist:user'));
            const jwtToken = localData && localData.jwtToken ?
                (localData.jwtToken.replace(/"/g, '')
                    ? localData.jwtToken.replace(/"/g, '')
                    : store.getState().user.jwtToken)
                : store.getState().user.jwtToken;

            try {
                const response = await axios.get('http://localhost:8081/customer/transaction-list',
                    {
                        headers: {
                            'Authorization': jwtToken,
                        }
                    });
                setTransaction(response.data.data.content);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            for (const item of transaction) {
                try {
                    const response = await axios.get(`http://localhost:8081/home/building/${item.buildingId}`);
                    setArrProduct((prevItems) => {
                        // Sử dụng Set để loại bỏ các phần tử trùng lặp
                        const updatedItems = new Set(prevItems);
                        updatedItems.add(response.data.data);
                        return Array.from(updatedItems);
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        };

        fetchData();
    }, [transaction]);

    const handleLick = () => {
        props.handleClose();
    }

    // const cancleContat = () => {
    //     alert("aloo ")
    // }


    return (
        <React.Fragment>
            {
                arrProduct.length > 0
                    ?
                    arrProduct.map((item, index) => {
                        const imageArray = (item.image).split(', ');
                        return (
                            <div className="item_transaction" key={index}>
                                <Link onClick={handleLick} to={pathPublic.DETAIL_PRODUCT + '?buildingId=' + item.buildingId}>
                                    <div className="item_detail">
                                        <img alt="image_building" src={imageArray[0]} />
                                        <div className="info_transaction">
                                            <span className="name">{item.buildingName}</span>
                                            <span className="price">
                                                {
                                                    item.price >= 1000000000
                                                        ? `${(item.price / 1000000000).toFixed(1)} tỷ`
                                                        : (item.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })
                                                }
                                            </span>
                                            <span className="priceDescription">
                                                {
                                                    item.priceDescription
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                {/* <button
                                onClick={cancleContat}>
                                Hủy
                            </button> */}
                            </div>
                        )
                    })
                    :
                    <p>Chưa có giao dịch nào</p>

            }
        </React.Fragment>
    )
};

export default Transaction;