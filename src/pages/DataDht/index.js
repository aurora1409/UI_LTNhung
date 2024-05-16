// import { Fragment, useState, useEffect } from 'react';
// import classNames from 'classnames/bind';
// import styles from './DataDht.module.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
// import {
//     faHouse,
//     faUser,
//     faTable,
//     faClockRotateLeft,
//     faCaretDown,
//     faCaretUp,
//     faClipboardList,
//     faMagnifyingGlass,
// } from '@fortawesome/free-solid-svg-icons';

// const cx = classNames.bind(styles);

// function DataDht() {
//     const [dataDht, setDataDht] = useState([]);
//     const [totalPage, setTotalPage] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [dust, setDust] = useState('');
//     const [temperature, setTemperature] = useState('');
//     const [humidity, setHumidity] = useState('');
//     const [light, setLight] = useState('');
//     const [start, setStart] = useState('');
//     const [end, setEnd] = useState('');
//     const [sortBy, setSortBy] = useState('id');
//     const [sortDirection, setSortDirection] = useState('asc');

//     useEffect(() => {
//         fetch(
//             `http://localhost:8080/data_dht11?page=${currentPage}&dust=${dust}&temperature=${temperature}&humidity=${humidity}&light=${light}&start=${start}&end=${end}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
//         )
//             .then((response) => response.json())
//             .then((data) => {
//                 setDataDht(data.dht11s);
//                 setTotalPage(data.totalPage);
//             })
//             .catch((err) => console.log(err));
//     }, [currentPage, dust, temperature, humidity, light, start, end, sortBy, sortDirection]);

//     const handleReset = () => {
//         setCurrentPage('1');
//         setDust('');
//         setTemperature('');
//         setHumidity('');
//         setLight('');
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
//                             <div className={cx('temp')}>
//                                 <h4>Temperature</h4>
//                                 <input
//                                     type="number"
//                                     value={temperature}
//                                     onChange={(e) => {
//                                         setTemperature(e.target.value);
//                                         setCurrentPage('1');
//                                     }}
//                                 />
//                             </div>
//                             <div className={cx('hum')}>
//                                 <h4>Humidity</h4>
//                                 <input
//                                     type="number"
//                                     value={humidity}
//                                     onChange={(e) => {
//                                         setHumidity(e.target.value);
//                                         setCurrentPage('1');
//                                     }}
//                                 />
//                             </div>

//                             <div className={cx('li')}>
//                                 <h4>Brightness</h4>
//                                 <input
//                                     type="number"
//                                     value={light}
//                                     onChange={(e) => {
//                                         setLight(e.target.value);
//                                         setCurrentPage('1');
//                                     }}
//                                 />
//                             </div>
//                         </div>

//                         <div className={cx('col')}>
//                             <div className={cx('du')}>
//                                 <h4>Dust</h4>
//                                 <input
//                                     type="number"
//                                     value={dust}
//                                     onChange={(e) => {
//                                         setDust(e.target.value);
//                                         setCurrentPage('1');
//                                     }}
//                                 />
//                             </div>
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
//                     <div className={cx('btn-wrap')}>
//                         <button onClick={() => handleReset()}>RESET</button>
//                     </div>
//                 </div>

//                 <div className={cx('data')}>
//                     <div className={cx('header')}>
//                         <FontAwesomeIcon
//                             icon={faClipboardList}
//                             style={{ fontSize: '50px', marginRight: '20px' }}
//                             bounce
//                         />
//                         <h3>Data Sensor</h3>
//                     </div>

//                     <div className={cx('table')}>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>
//                                         <p>Dust</p>
//                                         <button
//                                             onClick={() => {
//                                                 setSortBy('dust');
//                                                 setSortDirection('asc');
//                                                 setCurrentPage(1);
//                                             }}
//                                         >
//                                             <FontAwesomeIcon
//                                                 icon={faCaretUp}
//                                                 style={{
//                                                     color: '#fff',
//                                                     fontSize: '30px',
//                                                     marginLeft: '8px',
//                                                 }}
//                                             />
//                                         </button>
//                                         <button
//                                             onClick={() => {
//                                                 setSortBy('dust');
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
//                                                     paddingBottom: '3px',
//                                                 }}
//                                             />
//                                         </button>
//                                     </th>
//                                     <th>
//                                         <p>Temperature</p>
//                                         <button
//                                             onClick={() => {
//                                                 setSortBy('temperature');
//                                                 setSortDirection('asc');
//                                                 setCurrentPage(1);
//                                             }}
//                                         >
//                                             <FontAwesomeIcon
//                                                 icon={faCaretUp}
//                                                 style={{
//                                                     color: '#fff',
//                                                     fontSize: '30px',
//                                                     marginLeft: '8px',
//                                                 }}
//                                             />
//                                         </button>
//                                         <button
//                                             onClick={() => {
//                                                 setSortBy('temperature');
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
//                                                     paddingBottom: '3px',
//                                                 }}
//                                             />
//                                         </button>
//                                     </th>
//                                     <th>
//                                         <p>Humidity</p>
//                                         <button
//                                             onClick={() => {
//                                                 setSortBy('humidity');
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
//                                                 setSortBy('humidity');
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
//                                                     paddingBottom: '3px',
//                                                 }}
//                                             />
//                                         </button>
//                                     </th>
//                                     <th>
//                                         <p>Brightness</p>
//                                         <button
//                                             onClick={() => {
//                                                 setSortBy('light');
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
//                                                 setSortBy('light');
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
//                                                     paddingBottom: '3px',
//                                                 }}
//                                             />
//                                         </button>
//                                     </th>
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
//                                                     paddingBottom: '3px',
//                                                 }}
//                                             />
//                                         </button>
//                                     </th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {dataDht.map((data) => (
//                                     <tr key={data.id}>
//                                         <td>{data.id}</td>
//                                         <td>{data.dust}</td>
//                                         <td>{data.temperature}</td>
//                                         <td>{data.humidity}</td>
//                                         <td>{data.light}</td>
//                                         <td>{data.time}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className={cx('pages')}>
//                         {currentPage > 1 && (
//                             <button onClick={() => setCurrentPage(parseInt(currentPage - 1))}>Previous</button>
//                         )}
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

// export default DataDht;
