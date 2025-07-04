import express from 'express';
import { jwt } from './src/utils/jwt.js';
const app = express();
const port = 8888;

app.get('/', (req, res, next) => {
  res.status(200).send({ greeting: 'hello' });
  next();
});

app.post('/user/login', async (req, res) => {
  console.log(req.body);
  const { username, password } = (await req.JSON.parse()) ?? {};

  if (username === 'demo' && password === 'demo') {
    const token = await jwt.sign({ username });
    res.json({ result: token });
  } else {
    res.json({ error: 'Invalid username and/or password' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ... ${port}`);
});
