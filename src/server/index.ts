import express from "express";
import BodyParser from "body-parser";
import ExpressValidator from "express-validator";
import createDatabaseConnection from "../database";
import jwt from "express-jwt";
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
  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", 1);

    // Pass to next layer of middleware
    next();
  });
  app.use(jwt({ secret: process.env.SECRET_KEY }).unless({ path: ["/user"] }));
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
