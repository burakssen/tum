import { Routes, Route, Navigate, redirect } from 'react-router-dom';

import ProtectedRoute from './Components/ProtectedRoute';

import { Suspense, lazy } from 'react';

import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import EditCreatePage from './Pages/EditCreatePage';
import CreateModulePage from './Pages/CreateModulePage';
import UpdateModulePage from './Pages/UpdateModulePage';
import EditUpdatePage from './Pages/EditUpdatePage';
import OverviewPage from './Pages/OverviewPage';
import AdminRoute from './Components/AdminRoute';
import SaveOverview from './Pages/SaveOverview';


import Impressum from './Pages/Impressum';
import Datenschutz from './Pages/Datenschutz';
import Privacy from './Pages/Privacy';
import Support from './Pages/Support';
import Logo from './Pages/Logo';

const ModulNummerManager = lazy(() => import('./Pages/ModulNummerManager.js'));


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
            <Route path="saveOverview" element={
                <ProtectedRoute>
                    <AdminRoute>
                        <SaveOverview />
                    </AdminRoute>
                </ProtectedRoute>
            } />
            <Route path="modulNummerManager" element={
                <ProtectedRoute>
                    <AdminRoute>
                        <Suspense fallback={<div>Loading...</div>}>
                            <ModulNummerManager />
                        </Suspense>
                    </AdminRoute>
                </ProtectedRoute>
            } />
            <Route path="impressum" element={
                <Impressum />
            } />
            <Route path="datenschutz" element={
                <Datenschutz />
            } />
            <Route path="privacy" element={
                <Privacy />
            } />
            <Route path="support" element={
                <Support />
            } />
            <Route path="logo" element={
                <Logo />
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