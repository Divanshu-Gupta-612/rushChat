import React from 'react'
import {Routes, Route} from 'react-router-dom';
import HomePage from '../components/Home/HomePage';
import SignUp from '../components/SignIn/SignUp';
import LoginPage from '../components/Login/Login';
import LandingPage from '../components/LandingPage/landingPage';
import {useAuth} from './useAuth';

export default function AllRoutes() {
    const {userData} = useAuth();
    return (
        <>
            <Routes>

                {
                    userData ? <>
                        <Route exact path='/' element={<HomePage/>} />
                    </>
                    :
                    <>
                    </>
                }
                <Route exact path='/' element={<LandingPage/>} />
                
                <Route path='/auth/login' element={<LoginPage/>} />
                <Route path='/auth/SignUp' element={<SignUp/>} />
            </Routes>
        </>
    )
}
