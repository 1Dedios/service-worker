import express from 'express';
import { jwt, initClaimGenerator } from './src/utils/jwt.js';
const app = express();
const port = 8888;

app.use(express.json());

/* app.use('/user/login', async (req, res, next) => {
  let prevToken = req.headers['authorization'];
  console.log('hey from middleware');
  if (prevToken) {
    const isAuth = jwt.verify(prevToken);
    if (isAuth) {
    // isAuth is returning the payload check it 
      res.json({ result: isAuth });
      next();
    }
  }
  next();
}); */

app.get('/', (req, res, next) => {
  res.status(200).send({ greeting: 'hello' });
  next();
});

/**
   * 
   * ##################################################
      PRODUCTION CODE NOTE: 
      Production code would of course be different.
      The server would extract the credentials and 
      send them to a db interface for querying. 
      The DB would extract the hashed password and its 
      salt val if the val presented when hashed and salted 
      is the same as the credentials on our db; they're verified. After 
      successful verification, the db interface would set the user 
      with a user ID, exp, and iat (issued at) keyed obj
      and optionally you can incorporate a role key here for
      authorization. 

      So the logic below would be similar to: 
      if (getUser() === username) {
        // we'd start process of generating token
      }
      ##################################################
    *
   */

app.post('/user/login', async (req, res, next) => {
  const { username } = await req.body;
  if (username === 'demo') {
    let claim = initClaimGenerator(username);
    const token = await jwt.sign({ claim });
    res.status(200).send({ accessToken: token });
    next();
  } else {
    res.status(403).send({ message: 'Invalid username and/or password' });
  }
  next();
});

/**
   * 
   * ##################################################
      PRODUCTION CODE NOTE: 
      Production code would of course be different.
      I'd first check server side cache to see if it's been
      issued - if so, check integrity & claims. Otherwise, 
      generate new token (they've been verified). 
      ##################################################
    *
   */

app.listen(port, () => {
  console.log(`Listening on port ... ${port}`);
});
