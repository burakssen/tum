import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './Components/ProtectedRoute';

import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import EditPage from './Pages/EditPage';
import CreateModulePage from './Pages/CreateModulePage';
import UpdateModulePage from './Pages/UpdateModulePage'

const App = () => {
    return (
        <Routes>
            <Route index element={<LoginPage />} />
            <Route path="home" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />
            <Route path="edit" element={
                <ProtectedRoute>
                    <EditPage />
                </ProtectedRoute>
            } />
            <Route path="createModule" element={
                <ProtectedRoute>
                    <CreateModulePage />
                </ProtectedRoute>
            } />
            <Route path="updateModule" element={
                <ProtectedRoute>
                    <UpdateModulePage />
                </ProtectedRoute>
            } />
            <Route path='*' element={
                <ProtectedRoute>
                    <Navigate to='home' />
                </ProtectedRoute>
            } />
        </Routes>
    );
};

export default App;