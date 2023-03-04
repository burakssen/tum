import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import EditPage from './Pages/EditPage';


const App = () => {
    return (
        <Routes>
            <Route index element={<LoginPage />} />
            <Route path="home" element={<Home />} />
            <Route path="edit" element={<EditPage />} />
            <Route path='*' element={<Navigate to='home' />} />
        </Routes>
    );
};

export default App;