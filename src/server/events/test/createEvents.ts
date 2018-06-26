import { setupTestServer, truncateTables } from "../../test/utils";
import { Events } from "../../../database/models";
import { expect } from "chai";
import request from "supertest";
import moment from "moment";
import * as faker from "faker";
import * as seeder from "../../test/seedCreator";

describe("user - get", async () => {
  let server, Database, seeds;
  const requestSender = () => request(server).post("/events");

  beforeEach("set up seeds", async () => {
    const serverDB = await setupTestServer(); //To obtain server and Database object
    server = serverDB.server;
    Database = serverDB.Database;
    seeds = [];
    //0, user
    seeds.push(await seeder.User());
  });

  afterEach("clearing seeds", async () => {
    await truncateTables(Database.sequelize);
  });

  it("should be a bad request", async () => {
    const response = await requestSender();
    expect(response.status).to.be.equal(400);
  });

  it("should be able to create event", async () => {
    const response = await requestSender().send({
      title: "something",
      start: moment(),
      end: moment(),
      userID: seeds[0].id
    });
    expect(response.status).to.be.equal(200);
    const event = await Events.findOne({
      where: {
        userId: seeds[0].id
      }
    });
    expect(event.userId).to.be.equal(seeds[0].userId);
  });
});
