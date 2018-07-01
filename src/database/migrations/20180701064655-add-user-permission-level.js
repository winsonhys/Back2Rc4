"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "permissionLevel", {
      allowNull: false,
      type: Sequelize.ENUM("STAFF", "RF", "HH", "CLUBSOC")
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "permissionLevel");
  }
};
