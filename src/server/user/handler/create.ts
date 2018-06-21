import { validationResult } from "express-validator/check";

const userGet = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(404).send("User not found");
  }
  console.log("User routing success");
  res.send("Yay");
};

export default userGet;
