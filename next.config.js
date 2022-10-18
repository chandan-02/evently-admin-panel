const withLess = require("next-with-less");

module.exports = withLess({
  env: {
    ENV: "Dev",
    FIREBASE_API: "AIzaSyDdDooCJQEuADjU5SBcU4S3Xfc2t9gObuw"
  },
  reactStrictMode: true,
  lessLoaderOptions: {},
});
