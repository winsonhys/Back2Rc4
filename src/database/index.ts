import { Sequelize } from "sequelize-typescript";
import config from "./config/config";
import * as Models from "./models";

const createDBConnection = async env => {
  const sequelize = new Sequelize(config[env]);
  sequelize.addModels([Models.User]);
  const dbObject = {
    sequelize,
    User: Models.User
  };
  return dbObject;
};

export default createDBConnection;
module.exports = createDBConnection;
