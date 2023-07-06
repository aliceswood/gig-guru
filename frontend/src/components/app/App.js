import './App.css';
import SignUpForm from '../signupForm/SignupForm'
import Feed from '../feed/Feed'
import LogInForm from '../loginForm/LoginForm'
// import React, { useState } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUpForm />}/>
        <Route path='/login' element={<LogInForm />}/>
        <Route path='/' element={<Feed />}/>
      </Routes>
    </>
  );
}

export default App;
