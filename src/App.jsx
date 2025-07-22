import { useState } from 'react';
import { auth, getHeader } from './utils/auth.js';
import './App.css';

export default function App() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [token, setToken] = useState(false);
  const [initAuthError, setInitAuthError] = useState(false);
  const [initAuthErrorMessage, setInitAuthErrorMessage] = useState('');
  const [serverAuthButtonMessage, setServerAuthMessage] = useState(null);
  const [serverNoAuthButtonMessage, setServerNoAuthMessage] = useState(null);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setInitAuthError(false);
      setInitAuthErrorMessage('');
      const loginAttempt = await auth(username, password);

      if (loginAttempt.accessToken) {
        setToken(true);
        setUser(username.toUpperCase());
        localStorage.setItem('sw-demo', loginAttempt.accessToken);
      }
    } catch (e) {
      setInitAuthError(true);
      setInitAuthErrorMessage(`Unsuccessful Login: ${e.message}`);
    } finally {
      setUserName('');
      setPassword('');
    }
  };

  /* useEffect(() => {
    // first check if handleSubmit failed and then cleanup states for username iniAuthError
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

  const authorizedAccess = async () => {
    try {
      setServerAuthMessage(null);
      console.log('AUTHORIZED ✅ Button Pressed...');
      console.log(
        "Nothing should have happened b/c to the server I am still authenticated. That should change after a minute. Hint: that's how long I made the token last."
      );

      const headers = getHeader();
      const response = await fetch('/user/dashboard', {
        headers,
      });
      const authAccess = await response.json();
      setServerAuthMessage(authAccess.message);

      if (response.status === 401) {
        throw new Error('ERROR STATUS: 401');
      }
    } catch (e) {
      setServerNoAuthMessage(`${e.message}`);
    }
  };

  const notAuthorizedAccess = async () => {
    try {
      console.log('UNAUTHORIZED 🚫 Button Pressed...');
      console.log(
        "Authorized resources are off limits. Don't believe me? Wait for the server's response."
      );

      const res = await fetch('/user/dashboard');
      const authAccess = await res.json();
      setServerNoAuthMessage(authAccess.message);
    } catch (e) {
      throw new Error(`Unable to authorize access to dashboard: ${e}`);
    }
  };

  return (
    <>
      <div>
        {!token && (
          <form onSubmit={handleLogin} method="POST">
            <div id="username">
              <label htmlFor="username">Username: </label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter Username"
                required={true}
                autoComplete
              ></input>
            </div>
            <div id="password">
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required={true}
              ></input>
            </div>
            <button id="login-button">Login</button>
          </form>
        )}
        {initAuthError && <p>{initAuthErrorMessage}</p>}

        {token && (
          <div>
            <p>User: {user}</p>
            <p>YOUR TOKEN WAS VALIDATED!!!</p>
            <button onClick={authorizedAccess}>Authorized</button>
            <button onClick={notAuthorizedAccess}>Unauthorized</button>
          </div>
        )}
        {serverAuthButtonMessage && <p>{serverAuthButtonMessage}</p>}
        {serverNoAuthButtonMessage && <p>{serverNoAuthButtonMessage}</p>}
      </div>
    </>
  );
}
