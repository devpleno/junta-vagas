const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_URL
});

module.exports = Sentry