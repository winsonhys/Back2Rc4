import express from "express";
import config from "./config/config";
import createDatabaseConnection from "../database";
import userRoutes from "./user";
import BodyParser from "body-parser";
import ExpressValidator from "express-validator";

const createServer = async environment => {
  const currentConfig = config[environment];
  const Database = await createDatabaseConnection(environment);
  await Database.sequelize
    .authenticate()
    .then(() => {
      console.log("Connection established!");
    })
    .catch(e => {
      console.error("Unable to connect.", e);
    });

  const app = express();

  //Middleware
  app.use(BodyParser.json()); //Allows parsing of JSON http requests
  app.use(ExpressValidator());

  app.use("/user", userRoutes); //Route definitions

  const server = app.listen(currentConfig.port, currentConfig.host, () => {
    console.log(
      `Server is listening on ${currentConfig.port} at ${currentConfig.host}`
    );
  });

  return { server, Database };
};

export default createServer;
