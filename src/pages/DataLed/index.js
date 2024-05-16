// import { Fragment, useState, useEffect } from 'react';
// import classNames from 'classnames/bind';
// import styles from './DataLed.module.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import {
//     faHouse,
//     faUser,
//     faTable,
//     faClockRotateLeft,
//     faCaretDown,
//     faCaretUp,
//     faFileContract,
//     faMagnifyingGlass,
// } from '@fortawesome/free-solid-svg-icons';

// const cx = classNames.bind(styles);

// function DataLed() {
//     const [dataLed, setDataLed] = useState([]);
//     const [totalPage, setTotalPage] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [device, setDevice] = useState('');
//     const [action, setAction] = useState('');
//     const [start, setStart] = useState('');
//     const [end, setEnd] = useState('');
//     const [sortBy, setSortBy] = useState('id');
//     const [sortDirection, setSortDirection] = useState('asc');

//     useEffect(() => {
//         fetch(
//             `http://localhost:8080/data_led?page=${currentPage}&device=${device}&action=${action}&start=${start}&end=${end}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
//         )
//             .then((response) => response.json())
//             .then((data) => {
//                 setDataLed(data.leds);
//                 setTotalPage(data.totalPage);
//             })
//             .catch((err) => console.log(err));
//     }, [currentPage, device, action, start, end, sortBy, sortDirection]);

//     const [selectedDevice, setSelectedLed] = useState('');
//     const [selectedAction, setSelectedAction] = useState('');

//     const handleReset = () => {
//         setSelectedAction('');
//         setSelectedLed('');
//         setCurrentPage('1');
//         setDevice('');
//         setAction('');
//         setStart('');
//         setEnd('');
//         setSortBy('id');
//         setSortDirection('asc');
//     };

//     const pageNumbers = [];

//     // Tạo mảng các số trang từ 1 đến totalPage
//     for (let i = 1; i <= totalPage; i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <Fragment>
//             <div className={cx('wrapper')}>
//                 <div className={cx('nav')}>
//                     <Link to="/">
//                         <FontAwesomeIcon
//                             icon={faHouse}
//                             style={{ color: '#eac318', fontSize: '20px', marginRight: '8px' }}
//                         />
//                         Home Page
//                     </Link>
//                     <Link to="/profile">
//                         <FontAwesomeIcon
//                             icon={faUser}
//                             style={{ color: '#eac318', fontSize: '20px', marginRight: '8px' }}
//                         />
//                         Profile
//                     </Link>
//                     <h3>Internet Of Things</h3>
//                     <Link to="/data_dht">
//                         <FontAwesomeIcon
//                             icon={faTable}
//                             style={{ color: '#eac318', fontSize: '20px', marginRight: '8px' }}
//                         />
//                         Data Sensor
//                     </Link>
//                     <Link to="/data_led">
//                         <FontAwesomeIcon
//                             icon={faClockRotateLeft}
//                             style={{ color: '#eac318', fontSize: '20px', marginRight: '8px' }}
//                         />
//                         History
//                     </Link>
//                 </div>

//                 <div className={cx('search')}>
//                     <div className={cx('label')}>
//                         <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '30px' }} />
//                         <h3>Search</h3>
//                     </div>

//                     <div className={cx('row')}>
//                         <div className={cx('pa')}>
//                             <div className={cx('led')}>
//                                 <h4>Device</h4>
//                                 <select
//                                     id="led-select"
//                                     value={selectedDevice}
//                                     onChange={(e) => {
//                                         setDevice(e.target.value);
//                                         setSelectedLed(e.target.value);
//                                         setCurrentPage(1);
//                                     }}
//                                 >
//                                     <option value="">Select an option</option>
//                                     <option value="led_1">LED 1</option>
//                                     <option value="led_2">LED 2</option>
//                                 </select>
//                             </div>

//                             <div className={cx('act')}>
//                                 <h4>Action</h4>
//                                 <select
//                                     id="act-select"
//                                     value={selectedAction}
//                                     onChange={(e) => {
//                                         setAction(e.target.value);
//                                         setSelectedAction(e.target.value);
//                                         setCurrentPage(1);
//                                     }}
//                                 >
//                                     <option value="">Select an option</option>
//                                     <option value="1">Turn On</option>
//                                     <option value="0">Turn Off</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div className={cx('time')}>
//                             <div className={cx('from')}>
//                                 <h4>From:</h4>
//                                 <input
//                                     type="text"
//                                     value={start}
//                                     placeholder="yyyy-mm-dd hh:mm:ss"
//                                     onChange={(e) => {
//                                         setStart(e.target.value);
//                                     }}
//                                 />
//                             </div>
//                             <div className={cx('to')}>
//                                 <h4>To:</h4>
//                                 <input
//                                     type="text"
//                                     value={end}
//                                     placeholder="yyyy-mm-dd hh:mm:ss"
//                                     disabled={start === ''}
//                                     style={{ backgroundColor: start === '' ? 'lightgrey' : 'inherit' }}
//                                     onChange={(e) => {
//                                         setEnd(e.target.value);
//                                         setCurrentPage('1');
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className={cx('btn')}>
//                         <button onClick={() => handleReset()}>RESET</button>
//                     </div>
//                 </div>

//                 <div className={cx('data')}>
//                     <div className={cx('header')}>
//                         <FontAwesomeIcon
//                             icon={faFileContract}
//                             style={{ fontSize: '50px', marginRight: '20px', marginBottom: '1%' }}
//                             bounce
//                         />
//                         <h3>History</h3>
//                     </div>

//                     <div className={cx('table')}>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Device</th>
//                                     <th>Action</th>
//                                     <th>
//                                         <p>Time</p>
//                                         <button
//                                             onClick={() => {
//                                                 setSortBy('time');
//                                                 setSortDirection('asc');
//                                                 setCurrentPage(1);
//                                             }}
//                                         >
//                                             <FontAwesomeIcon
//                                                 icon={faCaretUp}
//                                                 style={{ color: '#fff', fontSize: '30px', marginLeft: '8px' }}
//                                             />
//                                         </button>
//                                         <button
//                                             onClick={() => {
//                                                 setSortBy('time');
//                                                 setSortDirection('desc');
//                                                 setCurrentPage(1);
//                                             }}
//                                         >
//                                             <FontAwesomeIcon
//                                                 icon={faCaretDown}
//                                                 style={{
//                                                     color: '#fff',
//                                                     fontSize: '30px',
//                                                     marginLeft: '8px',
//                                                     paddingBottom: '3.5px',
//                                                 }}
//                                             />
//                                         </button>
//                                     </th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {dataLed.map((data) => (
//                                     <tr key={data.id}>
//                                         <td>{data.id}</td>
//                                         <td>{data.device}</td>
//                                         <td>{data.action === 1 ? 'Turn On' : 'Turn Off'}</td>
//                                         <td>{data.time}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className={cx('pages')}>
//                         {currentPage > 1 && <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>}
//                         <select value={currentPage} onChange={(e) => setCurrentPage(e.target.value)}>
//                             {pageNumbers.map((pageNumber, index) => (
//                                 <option key={index} value={pageNumber}>
//                                     {pageNumber}
//                                 </option>
//                             ))}
//                         </select>
//                         {currentPage < totalPage && (
//                             <button onClick={() => setCurrentPage(parseInt(currentPage) + 1)}>Next</button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     );
// }

// export default DataLed;
