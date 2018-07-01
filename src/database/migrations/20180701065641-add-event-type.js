"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Events", "type", {
      allowNull: false,
      type: Sequelize.ENUM("NUS", "COLLEGE", "HOUSE", "IG")
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Events", "type");
  }
};
