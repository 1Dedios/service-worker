import express from 'express';
import { jwt, initClaimGenerator } from './src/utils/jwt.js';
const app = express();
const port = 8888;

app.use(express.json());
// TODO: middleware should extract token if any and based on claim attach the identifying claim to req obj
app.use('/user/dashboard', async (req, res, next) => {
  const prevToken = req.headers['authorization'];
  console.log('prevToken', prevToken);
  if (!prevToken || !prevToken.startsWith('Bearer')) {
    res.status(403).send({ message: 'not authorized to view' });
    next();
  } else {
    try {
      console.log(prevToken);
      const [scheme, token] = prevToken.split(' ');
      if (scheme === 'Bearer') {
        const verifiedToken = await jwt.verify(token);
        const expTime = jwt.expTime;
        console.log('token after verification', verifiedToken);
        //TODO: token should be returning payload and use sub member as auth
        const {
          claim: { sub },
          exp,
        } = verifiedToken;

        if (sub === 'demo') {
          // allowing request to continue
          // TODO: check that token time is valid > 10mins=600s means revalidate
          const currTimeSeconds = new Date().now / 1000;
          const timeValidation = exp - currTimeSeconds;
          if (timeValidation < expTime) {
            req.params.role = 'demo';
            next();
          }
        }
      }
    } catch (e) {
      res.status(500).send({ message: 'Need you to verify again.' });
      next();
    }
  }
});

app.get('/', (req, res, next) => {
  res.status(200).send({ greeting: 'hello' });
  next();
});

//TODO: authorized endpoint extracts the req object to query based on this and share that
app.get('/user/dashboard', (req, res, next) => {
  if (req.params.role === 'demo') {
    res.status(200).send({ message: 'You are definitely allowed to see this' });
    next();
  }
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
    res.status(401).send({ message: 'Invalid username and/or password' });
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
