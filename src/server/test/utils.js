import createServer from "..";
require("dotenv-flow").config();
export const setupTestServer = async () => {
  console.log("setting up server");
  const serverAndDb = await createServer("test");
  console.log("server started");
  return serverAndDb;
};
