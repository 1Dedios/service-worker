import jwt from './jwt.js';
import { Wayne } from '@jcubic/wayne';

const app = new Wayne();

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
