import { Routes, Route, Navigate } from 'react-router-dom';

import Home from "./Pages/Home";
import LoginPage from './Pages/LoginPage';


const App = () => {
    return (
        <Routes>
            <Route index element={<LoginPage />} />
            <Route path="home" element={<Home />} />
            <Route path='*' element={<Navigate to='home' />} />
        </Routes>
    );
};

export default App;