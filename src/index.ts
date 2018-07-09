if (!process.env.NODE_ENV) {
  throw new Error("You must set the NODE_ENV environment variable");
}
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import createServer from "./server";

const ENV = process.env.NODE_ENV;

const init = async () => {
  try {
    await createServer(ENV);
  } catch (e) {
    throw e;
  }
};

init();
