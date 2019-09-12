/**
 * New way of setting up multiple proxies
 */
const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(proxy("/auth/google", { target: "http://127.0.0.1:5000" }))
  app.use(proxy("/api/*", { target: "http://127.0.0.1:5000" }));

};
