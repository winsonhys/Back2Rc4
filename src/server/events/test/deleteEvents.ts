import { Events } from "../../../database/models";
import { setupTestServer, truncateTables } from "../../test/utils";
import { expect } from "chai";
import request from "supertest";
import * as seeder from "../../test/seedCreator";

describe("events - delete", async () => {
  let server, Database, seeds, requestSender;

  beforeEach("set up seeds", async () => {
    const serverDB = await setupTestServer(); //To obtain server and Database object
    server = serverDB.server;
    Database = serverDB.Database;
    seeds = [];
    const signedToken = await seeder.getAuth();
    requestSender = () =>
      request(server)
        .delete("/events")
        .set({ Authorization: `Bearer ${signedToken}` });
    //0, user
    seeds.push(await seeder.User());
    //1, event
    seeds.push(await seeder.Event(seeds[0].id));
  });

  afterEach("clearing seeds", async () => {
    await truncateTables(Database.sequelize);
  });

  it("should be able to delete one event", async () => {
    const response = await requestSender().query({ id: seeds[1].id });
    expect(response.status).to.be.equal(200);
    const events = await Events.findAll({
      where: {
        userId: seeds[0].id
      }
    });
    expect(events).to.have.lengthOf(0);
    expect(response.text).to.be.equal(seeds[1].id);
  });
  it("should not be able delete events other users", async () => {
    //2 another user
    seeds.push(await seeder.User());
    seeds.push(await seeder.Event(seeds[2].id));
    const response = await requestSender().query({ id: seeds[1].id });
    expect(response.status).to.be.equal(200);
    const events = await Events.findAll({
      where: {
        userId: seeds[2].id
      }
    });
    expect(events).to.have.lengthOf(1);
    expect(events[0].userId).to.be.equal(seeds[2].id);
  });
});
