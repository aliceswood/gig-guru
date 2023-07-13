import React, { useState } from 'react';
import './SignupForm.css'
import WaveSvg from "../event-page/Wave.svg"


const SignupForm = ({ navigate }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [validationError, setValidationError] = useState({username: '', email: ''})

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateEmail() && validateUsername() && validatePassword()) {
      fetch( '/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password, username: username })
      })
      .then(response => {
        if(response.status === 201) {
          console.log('user signed up')
          navigate('/login')
        } else {
          setValidationError(previousState => ({ ...previousState, email: 'An account with this email already exists' }))
          console.log('error')
          navigate('/signup')
        }
      })
    }
    }

  const validateEmail = () => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail = regex.test(email)

    if (validEmail) {
      setValidationError(previousState => ({ ...previousState, email: '' }));
      return true;
    } else {
      setValidationError(previousState => ({ ...previousState, email: 'Please enter a valid email' }));
      return false;
    }
  }

  const validateUsername = () => {
    if (username.length > 0) {
      setValidationError(previousState => ({ ...previousState, username: '' }));
      return true;
    } else {
      setValidationError(previousState => ({ ...previousState, username: 'Your username must contain a character' }));
      return false;
    }
  }

  const validatePassword = () => {
    if (password.length >= 8) {
      setValidationError(prevState => ({ ...prevState, password: "" }));
      return true;
    } else {
      setValidationError(prevState => ({ ...prevState, password: "Please enter a password that is at least 8 characters" }));
      return false;
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const login = () => {
    navigate('/login')
  }

  return (
    <div className="signup-page" style={{ backgroundImage: `url(${WaveSvg})`, height: '100vh'}}>
      <div className='signUpContainer'>
        <form className='signUpForm' onSubmit={handleSubmit}>
          <h1 className='signUpHeading'>Welcome to Gig Guru</h1>
          <input className="formInput" placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <p className='validation-error'>{validationError?.email}</p>
          <input className="formInput" placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} />
          <p className='validation-error'>{validationError?.username}</p>
          <input className="formInput" placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <p className='validation-error'>{validationError?.password}</p>
          <input className="button" id='submit' type="submit" value="Submit" />
          <div>
            <button className="redirectButton" type="button" id="login" onClick={login}>Already have an account?</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;