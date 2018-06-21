import * as Model from "../../database/models";
import * as faker from "faker";

export const User = async (data = {}) => {
  console.log(faker.random.alphaNumeric(20));
  const User = await Model.User.create({
    username: faker.random.alphaNumeric(20),
    password: faker.random.alphaNumeric(20),
    ...data
  });
  return User;
};
