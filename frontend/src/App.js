import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './Components/ProtectedRoute';

import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import EditCreatePage from './Pages/EditCreatePage';
import CreateModulePage from './Pages/CreateModulePage';
import UpdateModulePage from './Pages/UpdateModulePage';
import EditUpdatePage from './Pages/EditUpdatePage';
import OverviewPage from './Pages/OverviewPage';
import AdminRoute from './Components/AdminRoute';

const App = () => {
    return (
        <Routes>
            <Route index element={<LoginPage />} />
            <Route path="home" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />
            <Route path="editCreate" element={
                <ProtectedRoute>
                    <EditCreatePage />
                </ProtectedRoute>
            } />
            <Route path="editUpdate" element={
                <ProtectedRoute>
                    <EditUpdatePage />
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
            <Route path="overview" element={
                <ProtectedRoute>
                    <AdminRoute>
                        < OverviewPage />
                    </AdminRoute>
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