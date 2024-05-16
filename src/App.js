import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Profile from './pages/Profile';
import DataLed from './pages/DataLed';
import DataDht from './pages/DataDht';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    {/* <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/data_led" element={<DataLed />}></Route>
                    <Route path="/data_dht" element={<DataDht />}></Route> */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
