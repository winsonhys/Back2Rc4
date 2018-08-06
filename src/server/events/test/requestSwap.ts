import { setupTestServer, truncateTables } from "server/test/utils";
import { expect } from "chai";
import request from "supertest";
import * as seeder from "server/test/seedCreator";
import { Users, Events } from "database/models";

describe("events - send swap request", async () => {
  let server, Database, seeds, requestSender;

  beforeEach("set up seeds", async () => {
    const serverDB = await setupTestServer(); //To obtain server and Database object
    server = serverDB.server;
    Database = serverDB.Database;
    seeds = {};
    const signedToken = await seeder.getAuth();
    requestSender = () =>
      request(server)
        .post("/events/swapRequest")
        .set({ Authorization: `Bearer ${signedToken}` });
    seeds.user1 = (await seeder.User()) as Users;
    seeds.user2 = (await seeder.User({
      email: "rc4caltest@tempinbox.com"
    })) as Users;
    seeds.event1 = (await seeder.Event(seeds.user1.id)) as Events;
    seeds.event2 = (await seeder.Event(seeds.user2.id)) as Events;
  });

  afterEach("clearing seeds", async () => {
    await truncateTables(Database.sequelize);
  });

  it.only("should be able to send an email to swap", async () => {
    const response = await requestSender().send({
      eventIdFrom: seeds.event1.id,
      eventIdTo: seeds.event2.id
    });
    expect(response.status).to.equal(200);
    expect(response.body.accepted).to.have.length(1);
  }).timeout(20000);
});
