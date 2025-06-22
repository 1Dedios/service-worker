import { useState } from 'react';
import './App.css';

export default function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  /* useEffect(() => {
    serviceWorkerRegistration();
  });

  const serviceWorkerRegistration = () => {
    if ('serviceWorker' in window.navigator) {
      navigator.serviceWorker
        .register('./serviceWorker.js', { scope: './' })
        .then((registration) =>
          console.log(
            `Service worker registration was successful - ${registration}`
          )
        )
        .catch((e) =>
          // STATUS: ofc registration will fail in non-HTTPS environment - comment code to see UI in dev env
          console.log(`Service workers registration failed - ${e}`)
        );
    } */

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

  const login = async (username, password) => {
    return await fetch('/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(...formData);
  };

  return (
    <>
      <div>
        {!token && (
          <form onSubmit={auth} method="POST" action="/api/login">
            <div id="username">
              <label htmlFor="username">User: </label>
              <input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                required={true}
                autoComplete
              ></input>
            </div>
            <div id="password">
              <label htmlFor="password">Pass: </label>
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
        {token && (
          <p>`User: ${formData.username}YOUR TOKEN WAS VALIDATED!!!`</p>
        )}
        {error && <p className="error">Error: {error}</p>}
      </div>
    </>
  );
}
