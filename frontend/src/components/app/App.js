import './App.css';
import SignUpForm from '../signupForm/SignupForm'
import Feed from '../feed/Feed'
import LogInForm from '../loginForm/LoginForm'
import Account from '../account/Account'
// import React, { useState } from 'react';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUpForm navigate={ useNavigate() } />}/>
        <Route path='/login' element={<LogInForm navigate={ useNavigate() } />}/>
        <Route path='/' element={<Feed navigate={ useNavigate() } />}/>
        <Route path='/account' element={<Account navigate={ useNavigate() }/>}/>
      </Routes>
    </>
  );
}

export default App;
