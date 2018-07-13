import jwt from "jsonwebtoken";
import { validationResult } from "express-validator/check";
import { User } from "../../../database/models";

const userGet = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.sendStatus(400);
  }
  const { username, password, permissonLevel } = req.query;
  const where = {
    username,
    password
  };
  const response = await User.findOne({
    where
  });
  if (response !== null) {
    const signedToken = await jwt.sign(
      { username: response.username, permissonLevel: response.permissionLevel },
      process.env.SECRET_KEY
    );

    res.send({ user: response, token: signedToken });
  } else {
    res.status(404).send("User not found.");
  }
};

export default userGet;
