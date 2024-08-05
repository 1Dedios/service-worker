# Service Worker Auth

## Service Worker that authenticates the user

I am implementing the service-worker with Vite. I can use the Wayne library for the service worker but I wanted to implement the service worker myself because I've never worked with one. I also chose to register the service worker manually rather than with a library/package, which of course exists - (register-service-worker).

## Service Worker Caveats

They can only be served through secure protocol (HTTPS). Therefore, to see the service worker in action you must run the production build of the application instead of the "dev" version.

Compile changes to production - scripts in package.json file:

```bash
npm run build
```

Run production server - scripts in package.json file:

```bash

npm run server

```

## Tech Stack

1. Vite.JS
2. Web APIs
3. React
4. Jose - JWT Library
