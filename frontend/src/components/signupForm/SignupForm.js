import React, { useState } from 'react';
import './SignupForm.css'
import WaveSvg from "../event-page/Wave.svg"


const SignupForm = ({ navigate }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        console.log('error')
        navigate('/signup')
      }
    })
  }

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
    <>
      <div className="signup-page" style={{ backgroundImage: `url(${WaveSvg})`, height: '100vh'}}>
        <div className='signUpContainer'>
            <form className='signUpForm' onSubmit={handleSubmit}>
              <h1 className='signUpHeading'>Welcome to Gig Guru</h1>
              <input className="formInput" placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
              <input className="formInput" placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} />
              <input className="formInput" placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
              <input className="button" id='submit' type="submit" value="Submit" />
              <div>
                <button className="redirectButton" type="button" id="login" onClick={login}>Already have an account?</button>
              </div>
            </form>
        </div>
      </div>
    </>
  );
}

export default SignupForm;