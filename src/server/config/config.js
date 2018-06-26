const config = {
  production: {
    host: process.env.SERVER_HOST,
    port: process.env.PORT | 10000,
    dbName: process.env.DB_NAME
  },
  test: {
    host: "localhost",
    port: 10000,
    dbName: "test"
  }
};

export default config;
