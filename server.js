/*

Next.js Custom Server Setup

In order to use cookie-based auth system we need to have
client and server both running on the same origin/domain
To accomplish this we need to use proxy because our client
is running on port 3000 and our server is running on port 8000

To use proxy in Next.js we need to create a custom server and
This custom server is only necessary for development
In production, we will use same origin/domain and can simply
run build and then start next app

*/




const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
// Create next application server
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    // Apply proxy in dev mode
    // If in dev mode use express server
    if (dev) {
      // Accessing /api will be treated as same origin
      // and targets the backend
      server.use(
        "/api",
        createProxyMiddleware({
          target: `${process.env.NEXT_PUBLIC_API}`,
          changeOrigin: true,
        })
      );
    }
    // All other requests will be handled
    // by Next.js
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${process.env.NEXT_PUBLIC_API}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
