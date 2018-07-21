import { setupTestServer, truncateTables } from "server/test/utils";
import { expect } from "chai";
import request from "supertest";
import moment from "moment";
import lolex from "lolex";
import * as seeder from "server/test/seedCreator";
import { EVENT_TYPE, LOCATIONS } from "server/test/data";

describe("events - edit", async () => {
  let server, Database, seeds, clock, requestSender;

  beforeEach("set up seeds", async () => {
    clock = lolex.install({
      toFake: ["Date"],
      now: moment().valueOf()
    });
    const serverDB = await setupTestServer(); //To obtain server and Database object
    server = serverDB.server;
    Database = serverDB.Database;
    seeds = [];
    const signedToken = await seeder.getAuth();
    requestSender = () =>
      request(server)
        .patch("/events")
        .set({ Authorization: `Bearer ${signedToken}` });
    //0, user
    seeds.push(await seeder.User());
    //1, event
    seeds.push(await seeder.Event(seeds[0].id));
  });

  afterEach("clearing seeds", async () => {
    await truncateTables(Database.sequelize);
    clock.uninstall();
  });

  it("Should be able to update an existing event", async () => {
    const now = moment();
    const response = await requestSender().send({
      id: seeds[1].id,
      title: "haha",
      start: now,
      end: now,
      type: EVENT_TYPE.IG,
      allDay: true,
      location: LOCATIONS.SR1
    });
    const { title, start, end, allDay, type, location } = response.body;
    expect(response.status).to.equal(200);
    expect(title).to.equal("haha");
    expect(
      moment(start).isBetween(moment().subtract(1, "seconds"), moment())
    ).to.equal(true);
    expect(
      moment(end).isBetween(moment().subtract("1", "seconds"), moment())
    ).to.equal(true);
    expect(type).to.equal(EVENT_TYPE.IG);
    expect(allDay).to.equal(true);
    expect(location).to.equal(LOCATIONS.SR1);
  });

  it("Should not be able to update an event with unvalidated params", async () => {
    const now = moment().toISOString();
    const response = await requestSender().send({
      id: seeds[1].id,
      end: now,
      type: "losted",
      allDay: true
    });
    expect(response.status).to.equal(400);
    expect(response.text).to.equal("Payload does not pass verification");
  });
});
