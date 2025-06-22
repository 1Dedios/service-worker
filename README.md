# Service Worker Auth

## Service Worker that authenticates the user

I am implementing the service-worker with Vite. I can use the Wayne library for the service worker but I wanted to implement the service worker myself because I've never worked with one. I also chose to register the service worker manually rather than with a library/package, which of course exists - (register-service-worker).

## Background on Service Workers

- Supported by mainstream browsers
- fully asynchronous and non-blocking used to implement specific behavior (cannot use synchronous APIs within it i.e - XHR or Web Storage)
- takes the form of a JS file that can intercept and modify navigation and resource requests
- caches resources to carry out it's intended purpose
- most often used for offline processes
- do not have DOM access
- runs on different thread than the one that powers your JS app

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
2. Web APIs - ServiceWorker
3. React
4. Jose - JWT Library
