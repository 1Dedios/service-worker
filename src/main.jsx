import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// service worker registration
if ('serviceWorker' in navigator) {
  const scope = location.pathname.replace(/\/[^/]+$/, '/');
  navigator.serviceWorker
    .register('service-worker.js', { scope, type: 'module' })
    .then(function (reg) {
      reg.addEventListener('updatefound', function () {
        const installingWorker = reg.installing;
        console.log(
          'A new service worker is being installed:',
          installingWorker
        );
      });
      console.log('Registration succeeded. Scope is ' + reg.scope);
    })
    .catch(function (error) {
      console.log('Registration failed with ' + error);
    });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
