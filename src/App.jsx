import { useState, useEffect } from 'react';
import jwt from './jwt';
import './App.css';

const login = async (username, password) => {
  return fetch('login/:id', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username, password: password })
  }).then(res => {
    if (res.ok) {
      res.json()
    }
    throw new Error('problem logging in')
  }, error => {console.log(error)})


function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
    console.log(...formData)
  }


  const auth = async (e) => {
    e.preventDefault();
    let username = formData.username;
    let password = formData.password;
    const res = await login(username, password);

    console.log('username', username.current.value);
    console.log('password', password.current.value);

    if (res.result) {
      setToken(res.result);
      setError(null);
    } else if (res.error) {
      setToken(null);
      setError(res.error);
      console.log('Error from response', res.error);
    }
    username.current = '';
    password.current = '';
  };

  // useEffect(() => {
  //   if (token != null) {
  //     jwt.verify(token).then((payload) => {
  //       const { formData.username } = payload;
  //       setUsername(formData.username);
  //     });
  //   }
  // }, [token]);

  return (
    <>
      <div>
        {!token && (
          <form onSubmit={auth} method="POST" action="/api/login">
            <div id="username">
              <label htmlFor="username">Username: </label>
              <input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required={true}
                autoComplete
              ></input>
            </div>
            <div id="password">
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                required={true}
              ></input>
            </div>
            <button id="login-button">Login</button>
          </form>
        )}
        {token && <p>`User: ${formData.username}YOUR TOKEN WAS VALIDATED!!!`</p>}
        {error && <p className="error">Error: {error}</p>}
      </div>
    </>
  );
}

export default App;
