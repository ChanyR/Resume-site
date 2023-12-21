import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import './App.css'
import { Provider, useSelector } from 'react-redux'
import AppResume from './resume/appResume';
import ResponsiveAppBar from './navbar/header';
import Login from './user/login';
import SignUp from './user/singUp';
import Home from './resume/home';
import Logout from './user/logout';
import MainAdmin from './resume/mainAdmin'
import UserHeader from './navbar/userHeader';
import AdminHeader from './navbar/adminHeader';

function App() {

  const { role } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      {/* <ResponsiveAppBar /> */}
      {role === undefined && <ResponsiveAppBar />}
      {role === "" && <ResponsiveAppBar />}
      {role === "user" && <UserHeader />}
      {role === "admin" && <AdminHeader />}

      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/resume" element={<AppResume />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mainAdmin" element={<MainAdmin />} />
        <Route path="*" element={<h2>Page 404, not found!</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App