import * as faker from "faker";
import jwt from "jsonwebtoken";
import * as Model from "../../database/models";
import { EVENT_TYPE, USER_PERMISSIONS, LOCATIONS } from "./data";

export const getAuth = async () => {
  const signedToken = await jwt.sign(
    { username: "admin", permissonLevel: "STAFF" },
    process.env.SECRET_KEY
  );
  return signedToken;
};

export const User = async (data = {}) => {
  const User = await Model.User.create({
    username: faker.random.alphaNumeric(20),
    password: faker.random.alphaNumeric(20),
    permissionLevel: USER_PERMISSIONS.STAFF,
    email: faker.internet.email(),
    ...data
  });
  return User;
};

export const Event = async (userId: string, data = {}) => {
  const newEvent = await Model.Events.create({
    title: faker.lorem.word(),
    start: faker.date.past(),
    end: faker.date.future(),
    userId,
    type: EVENT_TYPE.NUS,
    allDay: false,
    location: LOCATIONS.TR1,
    ...data
  });
  return newEvent;
};
