import { setupTestServer } from "../../test/utils";
import { expect } from "chai";
import request from "supertest";

describe("user - get", async () => {
  let server, Database, seeds, requestSender;

  beforeEach("set up server and seeds", async () => {
    const serverDB = await setupTestServer();
    server = serverDB.server;
    Database = serverDB.Database;
    seeds = [];
    requestSender = () => request(server).get("/user");
  });

  it("should not be able to find a user", async () => {
    const response = await requestSender();
    expect(response.status).to.be.equal(404);
    expect(response.text).to.be.equal("User not found");
  });
});
