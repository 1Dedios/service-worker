self.addEventListener('submit', (e) => {
  // keep trying if there is no connection or weak
  console.log(`Hello from service-worker ${e}`);
});

/* const authServiceWorker = () => {
  // save request body in cache and start process of polling to fulfill request
  // recommend localStorage - ttl not an issue here b/c it's set with JWT, it persists across tabs, technically for the project it really doesn't matter but these are good reasons
  // remember any browser storage you deal you have to write logic to clean up the storage item and replace with your fresh token - cookies storage implementation is expected when sec matters
  // i.e - healthcare and finance
}; */

// authServiceWorker();

/* self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
}); */
