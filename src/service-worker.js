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
    const header = {
      'Content-Type': 'text/plain',
    };
    const loginMessage = 'Welcome to the login service';

    event.respondWith(textResponse(loginMessage, header));
  }
});
