import { validationResult } from "express-validator/check";
import { User } from "../../../database/models";

const userGet = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.sendStatus(400);
  }
  const { username, password } = req.query;
  const where = {
    username,
    password
  };
  const response = await User.findOne({
    where
  });
  if (response !== null) {
    res.send(response);
  } else {
    res.status(404).send("User not found.");
  }
};

export default userGet;
