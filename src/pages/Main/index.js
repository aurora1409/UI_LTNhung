import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTemperatureHigh,
    faDroplet,
    faSun,
    faLightbulb,
    faTags,
    faHouse,
    faUser,
    faTable,
    faClockRotateLeft,
    faBacterium,
    faBellSlash,
    faBell,
    faBellConcierge,
    faConciergeBell,
    faDumbbell,
    faEarListen,
    faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import axios from 'axios';

const cx = classNames.bind(styles);

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function Main() {
    const handleLed1 = () => {
        let led2Action = dataControl2.action;
        let led1Action = 0;
        if (dataControl1.action === 0) {
            led1Action = 1;
        }

        const stringToSend = `led_1 ${led1Action} led_2 ${led2Action}`;
        console.log(stringToSend);

        axios
            .post('http://192.168.212.181:3001', { message: stringToSend })
            .then((response) => {
                console.log(response.data); // Xử lý phản hồi từ máy chủ Node.js (nếu có)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleLed2 = () => {
        let led1Action = dataControl1.action;
        let led2Action = 0;
        if (dataControl2.action === 0) {
            led2Action = 1;
        }
        const stringToSend = `led_1 ${led1Action} led_2 ${led2Action}`;
        console.log(stringToSend);
        axios
            .post('http://192.168.212.181:3001', { message: stringToSend })
            .then((response) => {
                console.log(response.data); // Xử lý phản hồi từ máy chủ Node.js (nếu có)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // điều khiển led_1
    const [dataControl1, setDataControl1] = useState([]);
    // Lấy dữ liệu led1
    const fetchDataControl1 = () => {
        fetch('http://localhost:8080/data_control_1')
            .then((response) => response.json())
            .then((data) => setDataControl1(data))
            .catch((err) => console.log(err));
    };

    // // điều khiển led_2
    const [dataControl2, setDataControl2] = useState([]);
    // Lấy dữ liệu led2
    const fetchDataControl2 = () => {
        fetch('http://localhost:8080/data_control_2')
            .then((response) => response.json())
            .then((data) => setDataControl2(data))
            .catch((err) => console.log(err));
    };

    // Gọi fetchDataControl1 và fetchDataControl2 khi component được tạo
    useEffect(() => {
        fetchDataControl1();
        fetchDataControl2();
    }, [dataControl1, dataControl2]);

    // hiển thị các giá trị nhiệt độ, độ ẩm, ánh sáng
    const [dataParameter, setDataParameter] = useState([]);
    const temp = Math.floor(Math.random() * 100) + 1;
    const humidity = Math.floor(Math.random() * 100) + 1;
    const light = Math.floor(Math.random() * 100) + 1;
    const noise = Math.floor(Math.random() * 100) + 1;

    const fetchDataParameter = () => {
        axios
            .get('http://localhost:8080/data_parameter')
            .then((response) => {
                const data = response.data;
                setDataParameter(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchDataParameter(); // Lấy dữ liệu ban đầu
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('sm-wrap')}>
                    <div className={cx('nav')}>
                        <h1 style={{marginBottom:'15px'}}>Taking care baby</h1>
                        <img
                            src="https://th.bing.com/th/id/OIP.j08rvUWxX5VU5MoSxbHxGAAAAA?rs=1&pid=ImgDetMain"
                            style={{ width: '35rem', height: 'auto' }}
                        />
                        <p style={{ paddingLeft: '4rem', paddingRight: '4rem', paddingTop: '2rem' }}>
                            Hệ thống nôi thông minh hỗ trợ cha mẹ chăm sóc con cái một cách hiệu quả, nâng cao chất
                            lượng cuộc sống cho gia đình
                        </p>
                        {/* <Link to="/">
                            <FontAwesomeIcon
                                icon={faHouse}
                                style={{ color: '#eac318', fontSize: '20px', marginRight: '8px' }}
                            />
                            Home Page
                        </Link>
                        <Link to="/profile">
                            <FontAwesomeIcon
                                icon={faUser}
                                style={{ color: '#eac318', fontSize: '20px', marginRight: '8px' }}
                            />
                            Profile
                        </Link>
                        <Link to="data_dht">
                            <FontAwesomeIcon
                                icon={faTable}
                                style={{ color: '#eac318', fontSize: '20px', marginRight: '8px' }}
                            />
                            Data Sensor
                        </Link>
                        <Link to="data_led">
                            <FontAwesomeIcon
                                icon={faClockRotateLeft}
                                style={{ color: '#eac318', fontSize: '20px', marginRight: '8px' }}
                            />
                            History
                        </Link> */}
                    </div>

                    <div className={cx('device')}>
                        {/* <p style={{padding:"4rem"}}>
                            Hệ thống nôi thông minh hỗ trợ cha mẹ chăm sóc con cái một cách hiệu quả, nâng cao chất lượng cuộc sống cho gia đình
                        </p> */}
                        {/* <div className={cx('header')}>
                            <div className={cx('header-wrap')}>
                                <FontAwesomeIcon icon={faBell} style={{ marginRight: '10px' }} />
                                <h4>Alert</h4>
                            </div>
                            <h2>Các chỉ số ổn</h2>
                        </div> */}

                        {/* <div className={cx('led2')}>
                            <h5>LED2</h5>
                            {dataControl2.action === 1 ? (
                                <div className={cx('led-wrap')}>
                                    <div className={cx('btn-wrap')}>
                                        <button
                                            onClick={() => {
                                                handleLed2();
                                            }}
                                            style={{ backgroundColor: 'red', border: '4px solid #a61c1c' }}
                                        >
                                            Turn Off
                                        </button>
                                    </div>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faLightbulb} style={{ color: '#ffc800' }} />
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('led-wrap')}>
                                    <div className={cx('btn-wrap')}>
                                        <button
                                            onClick={() => {
                                                handleLed2();
                                            }}
                                            style={{ backgroundColor: 'green', border: '4px solid #085205' }}
                                        >
                                            Turn On
                                        </button>
                                    </div>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faLightbulb} />
                                    </div>
                                </div>
                            )}
                        </div> */}
                    </div>
                </div>

                <div className={cx('data')}>
                    <div className={cx('parameter')}>
                        <div className={cx('noise')}>
                            <div className={cx('pa-wrap')}>
                                <div className={cx('label')} style={{ border: '4px solid gray' }}>
                                    <FontAwesomeIcon icon={faEarListen} style={{ color: 'gray' }} />
                                </div>

                                <div
                                    className={cx('value', {
                                        du1: noise <= 20,
                                        du2: noise > 20 && noise <= 40,
                                        du3: noise > 40 && noise <= 60,
                                        du4: noise > 60 && noise <= 80,
                                        du5: noise > 80,
                                    })}
                                >
                                    <p>Noise</p>
                                    <div className={cx('value-wrap')}>
                                        <div className={cx('number')}>{noise}</div>

                                        <div className={cx('unit')}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('temp')}>
                            <div className={cx('pa-wrap')}>
                                <div className={cx('label')} style={{ border: '4px solid #ff6384' }}>
                                    <FontAwesomeIcon icon={faTemperatureHigh} style={{ color: 'ff6384' }} />
                                </div>

                                <div
                                    className={cx('value', {
                                        color1: temp <= 20,
                                        color2: temp > 20 && temp <= 40,
                                        color3: temp > 40 && temp <= 60,
                                        color4: temp > 60 && temp <= 80,
                                        color5: temp > 80,
                                    })}
                                >
                                    <p>Temperature</p>
                                    <div className={cx('value-wrap')}>
                                        <div className={cx('number')}>{temp}</div>

                                        <div className={cx('unit')}>°C</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('humid')}>
                            <div className={cx('pa-wrap')}>
                                <div className={cx('label')} style={{ border: '4px solid #36a2eb' }}>
                                    <FontAwesomeIcon icon={faDroplet} style={{ color: '#36a2eb' }} />
                                </div>

                                <div
                                    className={cx('value', {
                                        hu1: humidity <= 30,
                                        hu2: humidity > 30 && humidity <= 50,
                                        hu3: humidity > 50 && humidity <= 70,
                                        hu4: humidity > 70 && humidity <= 90,
                                        hu5: humidity > 90,
                                    })}
                                >
                                    <p>Humidity</p>
                                    <div className={cx('value-wrap')}>
                                        <div className={cx('number')}>{humidity}</div>

                                        <div className={cx('unit')}>%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('light')}>
                            <div className={cx('pa-wrap')}>
                                <div className={cx('label')} style={{ border: '4px solid #ffc800' }}>
                                    <FontAwesomeIcon icon={faSun} style={{ color: 'ffc800' }} />
                                </div>

                                <div
                                    className={cx('value', {
                                        br1: light <= 30,
                                        br2: light > 30 && light <= 50,
                                        br3: light > 50 && light <= 70,
                                        br4: light > 70 && light <= 90,
                                        br5: light > 90,
                                    })}
                                >
                                    <p>Brightness</p>
                                    <div className={cx('value-wrap')}>
                                        <div className={cx('number')}>{light}</div>

                                        <div className={cx('unit')}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('chart')}>
                        <video
                            src="https://videos.pexels.com/video-files/3196565/3196565-uhd_3840_2160_25fps.mp4"
                            controls
                            width="640"
                            height="360"
                            style={{ marginTop: '0px' }}
                        />
                        {/* <div className={cx('chart1')}>
                            <Line data={chartData1} options={chartOptions1} height={600} width={830} />

                            <div className={cx('legend')}>
                                {chartData1.datasets.map((dataset, index) => (
                                    <div className={cx('legend-item')} key={index}>
                                        <div
                                            className={cx('legend-marker')}
                                            style={{
                                                backgroundColor: dataset.borderColor,
                                                height: '20px',
                                                width: '30px',
                                            }}
                                        ></div>
                                        <span className={cx('legend-label')}>{dataset.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={cx('chart2')}>
                            <Line data={chartData2} options={chartOptions2} height={600} width={830} />

                            <div className={cx('legend')}>
                                {chartData2.datasets.map((dataset, index) => (
                                    <div className={cx('legend-item')} key={index}>
                                        <div
                                            className={cx('legend-marker')}
                                            style={{
                                                backgroundColor: dataset.borderColor,
                                                height: '20px',
                                                width: '30px',
                                            }}
                                        ></div>
                                        <span className={cx('legend-label')}>{dataset.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>
                    <div className={cx('led11')}>
                        <div className={cx('led-itemm')}>
                            <div className={cx('headerr')}>
                                <div className={cx('header-wrapp')}>
                                    <FontAwesomeIcon
                                        shake
                                        icon={faTriangleExclamation}
                                        style={{ color: 'red', marginRight: '10px' }}
                                    />
                                    <h4>Alert</h4>
                                </div>
                                <h2 style={{ color: 'green' }}>Các chỉ số ổn</h2>
                            </div>

                            {/* <h5>LED1</h5>
                            {dataControl1.action === 1 ? (
                                <div className={cx('led-wrap')}>
                                    <div className={cx('btn-wrap')}>
                                            <button
                                                onClick={() => {
                                                    handleLed1();
                                                }}
                                                style={{ backgroundColor: 'red', border: '4px solid #a61c1c' }}
                                            >
                                                Turn Off
                                            </button>
                                        </div>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faLightbulb} style={{ color: '#ffc800' }} />
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('led-wrap')}>
                                    <div className={cx('btn-wrap')}>
                                        <button
                                                onClick={() => {
                                                    handleLed1();
                                                }}
                                                style={{ backgroundColor: 'green', border: '4px solid #085205' }}
                                            >
                                                Turn On
                                            </button>
                                    </div>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faLightbulb} />
                                    </div>
                                </div>
                            )} */}
                        </div>
                        <div className={cx('tab')}></div>
                        <div className={cx('led1-1')}>
                            {/* <h5>LED</h5> */}
                            {dataControl1.action === 1 ? (
                                <div className={cx('led-wrap')}>
                                    <div className={cx('btn-wrap')}>
                                        <h5>LED</h5>
                                        {/* <button
                                            onClick={() => {
                                                handleLed1();
                                            }}
                                            style={{ backgroundColor: 'red', border: '4px solid #a61c1c' }}
                                        >
                                            Turn Off
                                        </button> */}
                                    </div>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faLightbulb} beat style={{ color: 'yellow' }} />
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('led-wrap')}>
                                    <div className={cx('btn-wrap')}>
                                        <h5>LED</h5>
                                        {/* <button
                                            onClick={() => {
                                                handleLed1();
                                            }}
                                            style={{ backgroundColor: 'green', border: '4px solid #085205' }}
                                        >
                                            Turn On
                                        </button> */}
                                    </div>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faLightbulb} beat style={{ color: 'yellow' }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Main;
