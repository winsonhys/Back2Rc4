const config = {
  development: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
  },
  test: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
  }
};

module.exports = config;
