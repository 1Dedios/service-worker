import { useState, useRef, useEffect } from 'react';
import jwt from './jwt';
import './App.css';

// TODO: implement '/api/login' endpoint for auth
// I think this causing my cyclic object value because it's already a string - JSON.stringify({ username, password })
const login = (username, password) => {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: {
      username,
      password,
    },
  }).then((res) => res.json());
};

function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  console.log(usernameRef.current);

  const auth = async (e) => {
    e.preventDefault();
    let username = usernameRef.current;
    let password = passwordRef.current;
    console.log('username', usernameRef.current);
    console.log('password', passwordRef.current);

    try {
      const res = await login(username, password);
      console.log(res.body);

      if (res.result) {
        setToken(res.result);
        setError(null);
      } else if (res.error) {
        setToken(null);
        setError(res.error);
        console.log('Error from response', res.error);
      }
    } catch (e) {
      setToken(null);
      setError(e.message || 'an unexpected error occurred');
      console.log('Caught Error', e.message);
    } finally {
      username.current = '';
      password.current = '';
    }
  };

  useEffect(() => {
    if (token != null) {
      jwt.verify(token).then((payload) => {
        const { username } = payload;
        setUsername(username);
      });
    }
  }, [token]);

  return (
    <>
      <div>
        {!token && (
          <form onSubmit={auth} method="POST" action="/api/login">
            <div id="username">
              <label htmlFor="username">Username: </label>
              <input
                id="username"
                ref={usernameRef}
                placeholder="Username"
                required={true}
              ></input>
            </div>
            <div id="password">
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                ref={passwordRef}
                placeholder="password"
                required={true}
              ></input>
            </div>
            <button id="login-button">Login</button>
          </form>
        )}
        {token && <p>`User: ${username}YOUR TOKEN WAS VALIDATED!!!`</p>}
        {error && <p className="error">Error: {error}</p>}
      </div>
    </>
  );
}

export default App;
