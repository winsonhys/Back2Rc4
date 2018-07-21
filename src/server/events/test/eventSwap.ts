import { SwapEventsPayload } from "./../handler/eventSwap";
import { setupTestServer, truncateTables } from "server/test/utils";
import { expect } from "chai";
import request from "supertest";
import * as seeder from "server/test/seedCreator";
import { Users, Events } from "database/models";

describe("events - swap", async () => {
  let server, Database, seeds, requestSender: () => request.Test;

  beforeEach("set up seeds", async () => {
    const serverDB = await setupTestServer(); //To obtain server and Database object
    server = serverDB.server;
    Database = serverDB.Database;
    seeds = {};
    const signedToken = await seeder.getAuth();
    requestSender = () =>
      request(server)
        .post("/events/eventSwap")
        .set({ Authorization: `Bearer ${signedToken}` });
    seeds.user1 = (await seeder.User()) as Users;
    seeds.user2 = (await seeder.User()) as Users;
    seeds.event1 = (await seeder.Event(seeds.user1.id)) as Events;
    seeds.event2 = (await seeder.Event(seeds.user2.id)) as Events;
  });

  afterEach("clearing seeds", async () => {
    await truncateTables(Database.sequelize);
  });

  it("requests should be swapped", async () => {
    const response = await requestSender().send({
      eventIdFrom: seeds.event1.id,
      eventIdTo: seeds.event2.id
    });
    const result = response.body as SwapEventsPayload;
    const { requesteeNewEvent, requestedNewEvent } = result;
    expect(response.status).to.equal(200);
    expect(requesteeNewEvent.user.id).to.equal(seeds.event2.userId);
    expect(requesteeNewEvent.title).to.equal(seeds.event2.title);
    expect(requestedNewEvent.user.id).to.equal(seeds.event1.userId);
    expect(requestedNewEvent.title).to.equal(seeds.event1.title);
  });
});
