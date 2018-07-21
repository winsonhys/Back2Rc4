import { Users } from "database/models";
import { validationResult } from "express-validator/check";

const createUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send("Please enter a valid username or password");
  }
  const creationRequest = await Users.create(req.body);
  res.send(creationRequest);
};

export default createUser;
