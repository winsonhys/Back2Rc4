import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
    return queryInterface.addColumn("Users", "email", {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: DataTypes) => {
    queryInterface.removeColumn("Users", "email");
  }
};
