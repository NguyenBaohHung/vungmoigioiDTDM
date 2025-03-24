import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import './DetailNews.scss';
import axios from "axios";
import { pathPublic } from "../../../utils";
import ScrollToHash from "../ScrollToHash";

const DetailNews = () => {
    const location = useLocation();
    const [newsId, setNewsId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [news, setNews] = useState(null);
    const [arrNews, setArrNews] = useState([]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        setNewsId(queryParams.get('newsId'));
    }, [location]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (newsId) {
                    setLoading(true);
                    const response = await axios.get(`http://localhost:8081/home/news/${newsId}`);
                    setNews(response && response.data && response.data.data ? response.data.data : null);
                }
            } catch (err) {
                setError(err.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [newsId]);


    const extractContent = (str) => {
        // Sử dụng biểu thức chính quy để kiểm tra và tách nội dung bên trong thẻ <p>
        const regex = /<p>(.*?)<\/p>/;
        const match = str.match(regex);

        if (match) {
            // Nếu tìm thấy thẻ <p>, trả về nội dung bên trong
            return match[1].trim();
        } else {
            // Nếu không tìm thấy thẻ <p>, trả về chuỗi gốc
            return str.trim();
        }
    }


    useEffect(() => {
        if (news) {
            // Tách các câu
            const sentences = extractContent(news.content).split('.').map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);

            // Tính toán số lượng câu trong mỗi đoạn
            const numParagraphs = 3;
            const sentencesPerParagraph = Math.ceil(sentences.length / numParagraphs);
            const paragraphs = [];

            // Tạo ba đoạn văn
            for (let i = 0; i < numParagraphs; i++) {
                const start = i * sentencesPerParagraph;
                const end = start + sentencesPerParagraph;
                const paragraph = sentences.slice(start, end).join('. ') + '.';
                paragraphs.push(paragraph);
            }

            // Hiển thị các đoạn văn trên trang HTML
            const container = document.getElementById('text');
            paragraphs.forEach((paragraph, index) => {
                const paragraphElement = document.createElement('p');
                paragraphElement.textContent = paragraph;
                container.appendChild(paragraphElement);

                // Thêm thẻ <br> sau mỗi đoạn, trừ đoạn cuối cùng
                if (index < paragraphs.length - 1) {
                    container.appendChild(document.createElement('br'));
                }
            });
        }
    }, [news]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/home/news?page=0`);
                setArrNews(response && response.data && response.data.data && response.data.data.content ? response.data.data.content : []);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);


    

    return (
        <React.Fragment>
            <ScrollToHash />
            <div className="single_news">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {loading
                                ?
                                <p>Loading...</p>
                                :
                                news
                                    ?
                                    <div className="sn-container">
                                        <div className="sn-img">
                                            <img src={news.image} alt="Image_news" />
                                        </div>
                                        <div className="sn-content">
                                            <h1 className="sn-title">{news.title}</h1>
                                            <p id="text" className="formatted-text"></p>
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }
                        </div>

                        <div className="col-lg-4">
                            <div className="sidebar">
                                <div className="sidebar-widget">
                                    <h2 className="sw-title">Tin tức liên quan</h2>
                                    <div className="news-list">
                                        {arrNews && arrNews.length > 0 &&
                                            arrNews.map((item, index) => {
                                                return (
                                                    <div className="nl-item" key={index}>
                                                        <div className="nl-img">
                                                            <img src={item.image} alt="Image_news" />
                                                        </div>
                                                        <div className="nl-title">
                                                            <Link to={pathPublic.DETAIL_NEWS + '?newsId=' + item.newsId}>
                                                                <p>{item.title}</p>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}

export default DetailNews;