import express from 'express';
const app = express();
const port = 8888;
import { tokenAssignment } from './src/utils/jwt.js';
import { tokenVerification, getRolePermissions } from './middleware.js';

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send({ greeting: 'hello' });
});

//TODO: add middleware.js funcs to this endpoint
app.get(
  '/user/dashboard',
  tokenVerification,
  getRolePermissions,
  (req, res) => {
    if (req.user_data.user_role === 'Admin') {
      return res.status(200).send({
        message: `Hey, ${req.user_data.username.toUpperCase()}!!! Greetings from the dashboard. You are definitely allowed to see this.`,
      });
    }
  }
);

app.post('/user/login', async (req, res) => {
  // TODO: import token assignment utility
  const { username } = await req.body;

  if (username === 'demo') {
    try {
      const token = await tokenAssignment(username);
      console.log('TOKEN HAS BEEN ASSIGNED!! ', token);
      return res.status(200).send({ token });
    } catch (e) {
      return res.status(401).send({ message: `${e}` });
    }
  }

  return res.status(401).send({ message: 'Invalid username and/or password.' });
});

// ============================================================================
// SERVER INIT BELOW
// ============================================================================

app.listen(port, () => {
  console.log(`Listening on port ... ${port}`);
});
