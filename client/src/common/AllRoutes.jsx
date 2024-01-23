import React from 'react'
import {Routes, Route} from 'react-router-dom';
import HomePage from '../components/Home/HomePage';
import SignUp from '../components/Auth/SignUp';
import LoginPage from '../components/Login/Login';

export default function AllRoutes() {
    return (
        <>
            <Routes>
                <Route exact path='/' element={<HomePage/>} />
                <Route path='/auth/login' element={<LoginPage/>} />
                <Route path='/auth/SignUp' element={<SignUp/>} />
            </Routes>
        </>
    )
}
