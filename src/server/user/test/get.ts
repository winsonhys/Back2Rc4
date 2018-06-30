import { setupTestServer, truncateTables } from "../../test/utils";
import { expect } from "chai";
import request from "supertest";
import * as seeder from "../../test/seedCreator";
import * as faker from "faker";

describe("user - get", async () => {
  let server, Database, seeds;
  const requestSender = () => request(server).get("/user");

  beforeEach("set up seeds", async () => {
    const serverDB = await setupTestServer(); //To obtain server and Database object
    server = serverDB.server;
    Database = serverDB.Database;
    seeds = [];
    seeds.push(await seeder.User());
  });

  afterEach("clearing seeds", async () => {
    await truncateTables(Database.sequelize);
  });

  it("should be a bad request", async () => {
    const response = await requestSender();
    expect(response.status).to.be.equal(400);
  });

  it("should be able to find user", async () => {
    const response = await requestSender().query({
      username: seeds[0].username,
      password: seeds[0].password
    });
    expect(response.body.id).to.be.equal(seeds[0].id);
    expect(response.status).to.be.equal(200);
  });

  it("should not be able to find user", async () => {
    const response = await requestSender().query({
      username: faker.random.alphaNumeric(20),
      password: faker.random.alphaNumeric(20)
    });
    expect(response.status).to.be.equal(404);
    expect(response.text).to.be.equal("User not found.");
  });
});
