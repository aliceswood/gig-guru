import React, { useEffect, useState } from 'react';
import "./LoginForm.css";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token] = useState(window.localStorage.getItem("token"));

    useEffect(() => {
      if(token) {
        navigate('/')
      }
    }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("oop")
      navigate('/login')
    } else {
      console.log("yay")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      window.location.reload(false);
      navigate('/');
    }
  }
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const signup = () => {
    navigate('/signup')
  }


    return (
      <>
        <div className='LogInContainer'>
          <form className="logInForm" onSubmit={handleSubmit}>
          <h1 className='logInHeading'>Log in</h1>
            <input className="formInput" placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
            <input className="formInput" placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
            <input className="button" id='submit' type="submit" value="Submit" />
          <div>
            <button className="redirectButton" type="button" id="signup" onClick={signup}>Don't have an account?</button>
          </div>
          </form>
        </div>
      </>
    );
}

export default LogInForm;