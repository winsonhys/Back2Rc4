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
  const allModels = _.keys(Models);
  const deletionQueries = allModels.map(key => {
    return sequelize.query(`DELETE FROM ${key}`).then(() => {
      sequelize.query(`ALTER TABLE ${key} AUTO_INCREMENT = 1;`);
    });
  });
  await Promise.all(deletionQueries);
};

const closeServer = async server => {
  await serverAndDb.Database.sequelize.close();
  await serverAndDb.server.close();
  serverAndDb = undefined;
};
