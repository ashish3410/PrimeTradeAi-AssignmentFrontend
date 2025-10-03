import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import Dashboard from "./components/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from './ProtectedRoutes'
import ProfileModal from "./pages/Profile";
import PublicRoutes from "./PublicRoutes";

const App = () => {
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <>
    <Routes>
    <Route path="/login" element={<PublicRoutes><Login/></PublicRoutes>} />
    <Route path="/register" element={<PublicRoutes><Register/></PublicRoutes>} />
    <Route path="/dashboard" element={
      <ProtectedRoutes>
        <Dashboard onOpenProfile={() => setOpenProfile(true)} />
      </ProtectedRoutes>
    } />
    <Route path="/profile" element={
      <ProtectedRoutes>
      </ProtectedRoutes>
    } />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
  
  {openProfile && <ProfileModal onClose={() => setOpenProfile(false)}/>}
    </>
    );
};

export default App;
