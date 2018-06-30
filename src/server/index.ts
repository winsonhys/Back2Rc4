import express from "express";
import BodyParser from "body-parser";
import ExpressValidator from "express-validator";
import createDatabaseConnection from "../database";
import config from "./config/config";

//Routes
import userRoutes from "./user";
import eventsRoutes from "./events";

const createServer = async environment => {
  const currentConfig = config[environment];
  const Database = await createDatabaseConnection(environment);
  await Database.sequelize
    .authenticate()
    .then(() => {
      console.log("Connection to database established!");
    })
    .catch(e => {
      console.error("Unable to connect to database.", e);
    });

  const app = express();
  app.all("/", (req, res) => {
    res.send("connection success");
  });

  //Middleware
  app.use(BodyParser.json()); //Allows parsing of JSON http requests
  app.use(ExpressValidator());

  app.use("/user", userRoutes); //Route definitions
  app.use("/events", eventsRoutes);

  const server = app.listen(currentConfig.port, () => {
    console.log(
      `Server is listening on ${currentConfig.port} at ${currentConfig.host}`
    );
  });

  return { server, Database };
};

export default createServer;
