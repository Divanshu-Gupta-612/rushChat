import React from 'react'
import {Routes, Route} from 'react-router-dom';
import HomePage from '../components/Home/HomePage';
import SignUp from '../components/SignIn/SignUp';
import LoginPage from '../components/Login/Login';
import LandingPage from '../components/LandingPage/landingPage';

export default function AllRoutes() {
    return (
        <>
            <Routes>
                <Route exact path='/' element={<LandingPage/>} />
                <Route exact path='/home' element={<HomePage/>} />
                <Route path='/auth/login' element={<LoginPage/>} />
                <Route path='/auth/SignUp' element={<SignUp/>} />
            </Routes>
        </>
    )
}
