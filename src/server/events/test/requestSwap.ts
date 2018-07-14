import { setupTestServer, truncateTables } from "../../test/utils";
import { expect } from "chai";
import request from "supertest";
import * as seeder from "../../test/seedCreator";

describe.skip("events - send swap request", async () => {
  let server, Database, seeds, requestSender;

  beforeEach("set up seeds", async () => {
    const serverDB = await setupTestServer(); //To obtain server and Database object
    server = serverDB.server;
    Database = serverDB.Database;
    seeds = [];
    const signedToken = await seeder.getAuth();
    requestSender = () =>
      request(server)
        .post("/events/swap")
        .set({ Authorization: `Bearer ${signedToken}` });
  });

  afterEach("clearing seeds", async () => {
    await truncateTables(Database.sequelize);
  });

  it("should be able to send an email", async () => {
    const response = await requestSender().send({});
    expect(response.status).to.equal(200);
  }).timeout(20000);
});
