import './App.css';

function App() {
  return (
    <>
      <form>
        <div id="username">
          <label htmlFor="username">Username: </label>
          <input id="username" placeholder="Username"></input>
        </div>
        <div id="password">
          <label htmlFor="password">Password: </label>
          <input id="password" placeholder="password"></input>
        </div>
        <button id="login-button">Login</button>
      </form>
    </>
  );
}

export default App;
