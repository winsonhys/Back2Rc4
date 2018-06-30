import * as Model from "../../database/models";
import * as faker from "faker";

export const User = async (data = {}) => {
  const User = await Model.User.create({
    username: faker.random.alphaNumeric(20),
    password: faker.random.alphaNumeric(20),
    ...data
  });
  console.log(User.id);
  return User;
};

export const Event = async (userId, data = {}) => {
  const newEvent = await Model.Events.create({
    title: faker.lorem.word(),
    start: faker.date.past(),
    end: faker.date.future(),
    userId,
    ...data
  });
  return newEvent;
};
