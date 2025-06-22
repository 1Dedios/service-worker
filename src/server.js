import express from 'express';
const app = express();
const port = 8888;

app.get('/', (req, res, next) => {
  res.status(200).send({ greeting: 'hello' });
  next();
});

/* app.post('/user/login', async (req, res) => {
  const { username, password } = (await req.json) ?? {};

  if (username === 'demo' && password === 'demo') {
    const token = await jwt.sign({ username });
    res.json({ result: token });
  } else {
    res.json({ error: 'Invalid username and/or password' });
  }
}); */

app.listen(port, () => {
  console.log(`Listening on port ... ${port}`);
});
