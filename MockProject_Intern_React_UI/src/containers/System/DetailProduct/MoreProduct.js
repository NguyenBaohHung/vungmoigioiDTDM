import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pathPublic } from "../../../utils";



const MoreProduct = () => {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8081/home/building-list`);
                setBuildings(response && response.data && response.data.data && response.data.data.content ? response.data.data.content : []);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleClickItem = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="row">
            <p className="title col-12">Bất động sản dành cho bạn</p>

            {error && <p>{error}</p>}
            {loading
                ?
                <p>Loading...</p>
                :
                buildings.length > 0
                    ?
                    buildings.map((item, index) => {
                        if (index !== 0) {
                            const imageArray = (item.image).split(', ');
                            return (
                                <div className="card mb-4 col-3" key={index}>
                                    <img className="card-img-top" src={imageArray[0]} alt="image_build" />
                                    <div className="card-body">
                                        {/* <div className="small text-muted">{(new Date(item.createdDate)).toISOString().replace('T', ' ').slice(0, 19)}</div> */}
                                        <h2 className="card-title h4">{item.buildingName}</h2>
                                        <p className='area'>{item.area} m<sup>2</sup></p>
                                        <p className="card-text">{item.address}</p>
                                        <Link onClick={() => handleClickItem()} to={pathPublic.DETAIL_PRODUCT + '?buildingId=' + item.buildingId} className="btn btn_read_more">Read more</Link>
                                    </div>
                                </div>
                            )
                        } else {
                            return null;
                        }
                    })
                    :
                    <></>
            }
        </div>
    )
}
export default MoreProduct;