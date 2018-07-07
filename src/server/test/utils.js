import createServer from "..";
import _ from "lodash";
import config from "../config/config";
import Models from "../../database/models";
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

export const truncateTables = async sequelize => {
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  const allModels = _.values(Models);
  for (let Model of allModels) {
    await Model.truncate({ cascade: true });
  }
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
};

const closeServer = async server => {
  await serverAndDb.Database.sequelize.close();
  await serverAndDb.server.close();
  serverAndDb = undefined;
};
