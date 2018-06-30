import { Sequelize } from "sequelize-typescript";
import config from "./config/config";
import * as Models from "./models";

const createDBConnection = async env => {
  const sequelize = new Sequelize(config[env]);
  sequelize.addModels([Models.User, Models.Events]);
  const dbObject = {
    sequelize,
    User: Models.User,
    Events: Models.Events
  };
  return dbObject;
};

export default createDBConnection;
module.exports = createDBConnection;
