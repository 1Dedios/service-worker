self.addEventListener('fetch', (e) => {
  // i want to see what properties this event has
  console.log(e);
  // keep trying if there is no connection or weak
});

/* const authServiceWorker = () => {
  // logic for auth
  // service worker will capture request by listening for the submission event of the form
  // save request body in cache and start process of polling to fulfill request
  // recommend localStorage - ttl not an issue here b/c it's set with JWT, it persists across tabs, technically for the project it really doesn't matter but these are good reasons
  // remember any browser storage you deal you have to write logic to clean up the storage item and replace with your fresh token - cookies storage implementation is expected when sec matters
  // i.e - healthcare and finance
}; */

// authServiceWorker();

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});
