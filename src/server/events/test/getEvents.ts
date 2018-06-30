import { setupTestServer, truncateTables } from "../../test/utils";
import { expect } from "chai";
import request from "supertest";
import * as seeder from "../../test/seedCreator";

describe("events - get", async () => {
  let server, Database, seeds;
  const requestSender = () => request(server).get("/events");

  beforeEach("set up seeds", async () => {
    const serverDB = await setupTestServer(); //To obtain server and Database object
    server = serverDB.server;
    Database = serverDB.Database;
    seeds = [];
    //0, user
    seeds.push(await seeder.User());
    //1, event
    seeds.push(await seeder.Event(seeds[0].id));
  });

  afterEach("clearing seeds", async () => {
    await truncateTables(Database.sequelize);
  });

  it("should be a bad request", async () => {
    const response = await requestSender();
    expect(response.status).to.be.equal(400);
  });

  it("should be able get events of a user", async () => {
    const response = await requestSender().query({ userId: seeds[0].id });
    expect(response.status).to.be.equal(200);
    expect(response.body[0].userId).to.be.equal(seeds[0].id);
  });
  it("shoudl not be able to get events of other users", async () => {
    //2 another user
    seeds.push(await seeder.User());
    seeds.push(await seeder.Event(seeds[2].id));
    const response = await requestSender().query({ userId: seeds[0].id });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0].userId).to.be.equal(seeds[0].id);
  });
});
