import jwt from './jwt.js';

/**
 * 
 * 
 * THIS WILL HANDLE THE CREATION AND REGISTRATION OF SERVICE WORKERS
 * 
 *  - first need to create the script of what the worker is doing - which is authentication this file is type text/javascript
 *  - the script file of a service worker must always be the correct MIME type aka text/javascript
 * 
 */

app.get('/api/hello', (req, res) => {
  res.text('welcome to my Service Worker');
});

app.post('/api/login', async (req, res) => {
  const { username, password } = (await req.json) ?? {};

  if (username === 'demo' && password === 'demo') {
    const token = await jwt.sign({ username });
    res.json({ result: token });
  } else {
    res.json({ error: 'Invalid username and/or password' });
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
