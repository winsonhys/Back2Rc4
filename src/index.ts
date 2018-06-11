import Sequelize from "sequelize";

const sequelize = new Sequelize("rc4cal", "rc4cal", "Failed123!", {
  host: "den1.mysql3.gear.host",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established");
  })
  .catch(err => {
    console.log("unable to connect", err);
  });
