import moment from "moment";
import * as faker from "faker";
import { USER_PERMISSIONS } from "./../../server/test/data";
import { QueryInterface, Sequelize } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: faker.random.uuid(),
          username: "admin",
          password: "admin",
          permissionLevel: USER_PERMISSIONS.STAFF,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
        }
      ],
      {}
    );
  },

  down: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
