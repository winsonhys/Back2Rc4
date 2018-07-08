"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Events", "location", {
      allowNull: false,
      type: Sequelize.ENUM(
        "TR1",
        "TR2",
        "TR3",
        "TR4",
        "SR1",
        "SR2",
        "SR3",
        "SR4",
        "SR5",
        "SR6",
        "MPH"
      )
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Events", "location");
  }
};
