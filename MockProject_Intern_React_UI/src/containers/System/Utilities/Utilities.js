import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { pathPublic } from '../../../utils';
import './Utilities.scss';
import axios from "axios";
import ScrollToHash from "../ScrollToHash";

const apiKey = process.env.REACT_APP_KEY_API_AI;

const XemTuoi = () => {
    const [age, setAge] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChangeAge = (event) => {
        setAge(event.target.value);
    }

    const clickXemTuoi = async () => {
        const currentYear = new Date().getFullYear();
        const minYear = 1900;
        const maxYear = 2100;

        if (isNaN(age)
            ||
            age < minYear
            ||
            age > maxYear
            ||
            age > currentYear
        ) {
            alert('Năm sinh không hợp lệ');
        } else {
            setLoading(true);
            setError(null);

            try {
                const result = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "user",
                                content: "Năm nay là 2024. Tôi muốn bạn tư vấn phong thủy tuổi xây nhà cho tôi, tôi sinh năm " + age + ". Hãy cho tôi biết thời điểm xây nhà của tôi là khi nào, hãy phân tích các yếu tố lí do bạn chọn thời điểm đó."
                            }
                        ],
                        max_tokens: 1000,
                        temperature: 1,
                        top_p: 0.9
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                // setResponse(result.data);
                setResponse(result.data.choices[0].message.content);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="list_input">
            <label htmlFor="birthyear">Năm sinh của gia chủ</label>
            <br />
            <input type="number" id="birthyear" name="birthyear" min="1900" max="2100" required
                onChange={(event) => handleChangeAge(event)}
            />
            <br />
            <button type="submit"
                onClick={() => clickXemTuoi()}
            >{loading ? 'Đang tải...' : 'Xem kết quả'}</button>
            {response &&
                <div className="result">
                    {response}
                </div>
            }
            {error &&
                <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
            }
        </div >
    )
}


const ChiPhi = () => {
    const [chieudai, setChieudai] = useState(0);
    const [chieurong, setChieuRong] = useState(0);
    const [sotang, seSotang] = useState(0);
    const [mai, setMai] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChangeInput = (event, id) => {
        switch (id) {
            case 'chieudai':
                setChieudai(event.target.value);
                break;
            case 'chieurong':
                setChieuRong(event.target.value);
                break;
            case 'sotang':
                seSotang(event.target.value);
                break;
            case 'mai':
                setMai(event.target.value);
                break;
            default:
                break;
        }
    }


    const clickXemChiPhi = async () => {
        if (chieudai <= 0) {
            alert('Chiều dài không hợp lệ');
            return;
        }
        if (chieurong <= 0) {
            alert('Chiều rộng không hợp lệ');
            return;
        }
        if (sotang <= 0) {
            alert('Số tầng không hợp lệ');
            return;
        }
        if (!mai) {
            alert('Chưa chọn loại mái nhà');
            return;
        }
        else {
            setLoading(true);
            setError(null);

            try {
                const result = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "user",
                                content: "Tôi muốn bạn dự đoán chi phí xây nhà cho tôi 1 cách cụ thể ( cho tôi 1 con số ) qua các thông số sau: chiều dài:" + chieudai + " met vuông, chiều rộng:" + chieurong + " met vuông, " + sotang + " tầng, loại mái nhà: " + mai + "."
                            }
                        ],
                        max_tokens: 1000,
                        temperature: 1,
                        top_p: 0.9
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                // setResponse(result.data);
                setResponse(result.data.choices[0].message.content);
            } catch (err) {
                setError(err.message);
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    }


    const formatText = (text) => {
        // Sử dụng regex để tìm số thứ tự và thêm <br> sau mỗi số thứ tự
        const formattedText = text.replace(/(\d+\.)/g, '<br/><br/>$1');
        // Chuyển đổi HTML string thành các phần tử React
        return (
            <div dangerouslySetInnerHTML={{ __html: formattedText }} />
        );
    };


    return (
        <div className="list_input">
            <label htmlFor="chieudai">Chiều dài nhà (m<sup>2</sup>)</label>
            <br />
            <input type="number" id="chieudai" name="chieudai" required
                onChange={(event) => handleChangeInput(event, 'chieudai')}
            />
            <br />
            <label htmlFor="chieurong">Chiều rộng nhà (m<sup>2</sup>)</label>
            <br />
            <input type="number" id="chieurong" name="chieurong" required
                onChange={(event) => handleChangeInput(event, 'chieurong')}
            />
            <br />
            <label htmlFor="sotang">Số tầng</label>
            <br />
            <input type="number" id="sotang" name="sotang" required
                onChange={(event) => handleChangeInput(event, 'sotang')}
            />
            <br />
            <label htmlFor="roofType">Chọn loại mái nhà:</label>
            <br />
            <select id="roofType" name="roofType"
                onChange={(event) => handleChangeInput(event, 'mai')}
            >
                <option defaultValue hidden>Chọn loại mái</option>
                <option value="ngói">Mái ngói</option>
                <option value="tôn">Mái tôn</option>
                <option value="bê-tông">Mái bê-tông</option>
            </select>
            <br />
            <button type="submit"
                onClick={() => clickXemChiPhi()}
            >{loading ? 'Đang tải...' : 'Xem kết quả'}</button>
            {response &&
                <div className="result">
                    {formatText(response)}
                </div>
            }
            {error &&
                <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
            }
        </div >
    )
}


const PhongThuy = () => {
    const [age, setAge] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChangeAge = (event) => {
        setAge(event.target.value);
    }

    const clickXemTuoi = async () => {
        const currentYear = new Date().getFullYear();
        const minYear = 1900;
        const maxYear = 2100;

        if (isNaN(age)
            ||
            age < minYear
            ||
            age > maxYear
            ||
            age > currentYear
        ) {
            alert('Năm sinh không hợp lệ');
        } else {
            setLoading(true);
            setError(null);

            try {
                const result = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "user",
                                content: "Năm nay là 2024. Tôi muốn bạn tư vấn phong thủy tuổi xây nhà cho tôi, tôi sinh năm " + age + ". Hãy phân tích 5 yếu tố sau: Hướng nhà, Hướng cửa chính, Vị trí phòng ngủ, Màu sắc, Vật phẩm trang trí"
                            }
                        ],
                        max_tokens: 1000,
                        temperature: 1,
                        top_p: 0.9
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                // setResponse(result.data);
                setResponse(result.data.choices[0].message.content);
            } catch (err) {
                setError(err.message);
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    }


    const formatText = (text) => {
        // Sử dụng regex để tìm số thứ tự và thêm <br> sau mỗi số thứ tự
        const formattedText = text.replace(/(\d+\.)/g, '<br/><br/>$1');
        // Chuyển đổi HTML string thành các phần tử React
        return (
            <div dangerouslySetInnerHTML={{ __html: formattedText }} />
        );
    };


    return (
        <div className="list_input">
            <label htmlFor="birthyear">Năm sinh của gia chủ</label>
            <br />
            <input type="number" id="birthyear" name="birthyear" min="1900" max="2100" required
                onChange={(event) => handleChangeAge(event)}
            />
            <br />
            <button type="submit"
                onClick={() => clickXemTuoi()}
            >{loading ? 'Đang tải...' : 'Xem kết quả'}</button>
            {response &&
                <div className="result">
                    {formatText(response)}
                </div>
            }
            {error &&
                <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
            }
        </div >
    )
}

const Utilities = () => {
    const location = useLocation();
    const [type, setType] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        setType(queryParams.get('type'));
    }, [location])

    return (
        <React.Fragment>
            <ScrollToHash />
            <div className='container_news'>
                <div className='title_header'>
                    <p>Hỗ trợ tiện ích</p>
                </div>
                <div className='content_news'>
                    <div className='list_news main_content'>
                        {type === 'xem-tuoi' &&
                            <XemTuoi />
                        }
                        {type === 'chi-phi' &&
                            <ChiPhi />
                        }
                        {type === 'phong-thuy' &&
                            <PhongThuy />
                        }
                    </div>
                    <div className='search'>
                        <div className='container'>
                            <div className='row'>
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
            </div>
        </React.Fragment>
    )
}

export default Utilities;