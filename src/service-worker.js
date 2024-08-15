import jwt from './jwt.js';

const textResponse = (message, headers) => {
  return new Response(message, headers);
};

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === '/api/hello') {
    console.log('Request is: ', url.pathname);

    const headers = {
      'Content-Type': 'text/plain',
    };
    const greeting = "Hey it's ya service workers";

    event.respondWith(textResponse(greeting, headers));
  } else if (url.pathname === '/api/login') {
    console.log('Request is: ', url.pathname);
    /**
     * COMMENT ABOUT VERIFICATION OF TOKEN:
     *
     * Of course, in a real application, we would query our db with something like - 'SELECT username, password FROM users WHERE username=username AND password=password'
     *
     * If the response from the db is successful (retrieved a record with the above matching) then we would sign the token and return.
     * Otherwise, we would deny authorization.
     *
     */
    async (req, res) => {
      const { username, password } = req.json() ?? {};
      if (username === 'demo' && password === 'demo') {
        const token = await jwt.sign({ username });
        return res.json({ result: token });
      } else {
        res.json({ error: 'Invalid username or password' });
      }
    };
  }
});
