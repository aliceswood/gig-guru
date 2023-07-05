import './App.css';
import SignUpForm from '../signupForm/SignupForm'
// import React, { useState } from 'react';
import {
  useNavigate,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
      </Routes>
    </>
  );
}

export default App;
