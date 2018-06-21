import createServer from "..";
import _ from "lodash";
import config from "../config/config";
require("dotenv").config();

const env = process.env.NODE_ENV;

let serverAndDb;

before("setting up test server", async function() {
  serverAndDb = await createServer("test");
});

after("closing test server", async () => {
  await closeServer(serverAndDb);
});

export const setupTestServer = async () => {
  if (!serverAndDb) {
    console.log("setting up test server");
    serverAndDb = await createServer("test");
    console.log("server started");
    return serverAndDb;
  }
  return serverAndDb;
};

export const truncateTables = sequelize => {
  const tableNames = _.map(_.values(sequelize.models), "tableName");
  const tableNamesString = _.map(
    tableNames,
    tableName => `${config[env].dbName}.${tableName}`
  ).join(", ");
  return sequelize.query("truncate table " + tableNamesString);
};

const closeServer = async server => {
  await serverAndDb.Database.sequelize.close();
  await serverAndDb.server.close();
  serverAndDb = undefined;
};
