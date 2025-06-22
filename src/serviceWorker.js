/* import jwt from './jwt.js'; */

const authServiceWorker = () => {
  // logic for auth
  // service worker will capture request
  // save request body in cache and start process of polling to fulfill request
};

authServiceWorker();

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
