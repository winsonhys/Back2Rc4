const config = {
  development: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    dbName: process.env.DB_NAME
  },
  test: {
    host: "localhost",
    port: 10000,
    dbName: "test"
  }
};

export default config;
