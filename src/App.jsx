import { useState } from 'react';
import { auth } from './utils/auth.js';
import './App.css';

export default function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  /* useEffect(() => {
    // first check if there is a token, if so verify and set token state
    const prevToken = localStorage.getItem("sw-demo")
    prevToken ? setToken(prevToken) : serviceWorkerRegistration()
  });

  const serviceWorkerRegistration = () => {
    if ('serviceWorker' in window.navigator) {
      navigator.serviceWorker
        .register('./serviceWorker.js', { scope: '/' })
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const isAuth = await auth(username, password);
      console.log('returned from auth -', isAuth);
      if (isAuth) {
        localStorage.setItem('sw-demo', isAuth.accessToken);
        setToken(true);
        setUserName('');
        setPassword('');
      }
    } catch (e) {
      setError(true);
      throw new Error('Could not authenticate');
    }
  };

  return (
    <>
      <div>
        {!token && (
          <form onSubmit={handleSubmit} method="POST" action="/api/login">
            <div id="username">
              <label htmlFor="username">User: </label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required={true}
              ></input>
            </div>
            <button id="login-button">Login</button>
          </form>
        )}
        {token && <p>User:{username} - YOUR TOKEN WAS VALIDATED!!!</p>}
        {error && <p className="error">Error: {error}</p>}
      </div>
    </>
  );
}
