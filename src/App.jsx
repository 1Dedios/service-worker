import { useState, useRef, useEffect } from 'react';
import jwt from './jwt';
import './App.css';

const login = async (username, password) => {
  return await fetch('/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const auth = async (e) => {
    e.preventDefault();
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;
    const res = await login(username, password);

    console.log('username', usernameRef.current.value);
    console.log('password', passwordRef.current.value);

    if (res.result) {
      setToken(res.result);
      setError(null);
    } else if (res.error) {
      setToken(null);
      setError(res.error);
      console.log('Error from response', res.error);
    }
    usernameRef.current = '';
    passwordRef.current = '';
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
