import React, { useEffect, useState } from 'react';
import "./LoginForm.css";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token] = useState(window.localStorage.getItem("token"));
  const [validationError, setValidationError] = useState({ error: '' })

    useEffect(() => {
      if(token) {
        navigate('/')
      }
    }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateEmail() && validatePassword()) {
      let response = await fetch( '/tokens', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password })
      })
  
      if(response.status !== 201) {
        setValidationError(previousState => ({ ...previousState, password: 'Passwords do not match' }))
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
  }

  const validateEmail = () => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail = regex.test(email);

    if (validEmail) {
      setValidationError({ email: '' });
      return true
    } else {
      setValidationError({ error: 'Please enter a valid email address.' });
      return false
    }
  };

  const validatePassword = () => {
    if (password.length > 0) {
      setValidationError({email: '', password: ''});
      return true;
    } else {
      setValidationError(previousState => ({ ...previousState, password: 'Please enter a valid password.' }));
      return false
    }
  };
  
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
            <p className='validation-error'>{validationError?.error}</p>
            <input className="formInput" placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
            <p className='validation-error'>{validationError?.password}</p>
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