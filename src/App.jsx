import { useState, useRef } from 'react';
import './App.css';

// TODO: implement '/api/login' endpoint for auth
const login = (username, password) => {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => console.log(JSON.parse(data)));
};

function App() {
  // TODO: implement state of the form, capture form values with useRef, handlesubmit function
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const usernameRef = useRef('');
  const passwordRef = useRef('');

  const auth = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const res = await login(username, password);

    if (res.result) {
      setToken(res.result);
    } else if (res.error) {
      setError(res.error);
    }

    usernameRef.current.value = '';
    passwordRef.current.value = '';
  };

  return (
    <>
      <div>
        {!token && (
          <form onSubmit={auth}>
            <div id="username">
              <label htmlFor="username">Username: </label>
              <input
                id="username"
                ref={usernameRef}
                placeholder="Username"
              ></input>
            </div>
            <div id="password">
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                ref={passwordRef}
                placeholder="password"
              ></input>
            </div>
            <button id="login-button">Login</button>
          </form>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
}

export default App;
