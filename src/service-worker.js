self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === '/api/hello') {
    const headers = {
      'Content-Type': 'text/plain',
    };
    const greeting = "Hey it's ya service workers";

    event.respondWith(textResponse(greeting, headers));
  }
});

const textResponse = (message, headers) => {
  return new Response(message, headers);
};
