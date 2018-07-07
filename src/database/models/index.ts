import User from "./user";
import Events from "./events";

export { default as User } from "./user";
export { default as Events } from "./events";

const Models = {
  User: User,
  Events: Events
};

export default Models;
