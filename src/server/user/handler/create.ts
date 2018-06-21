import { validationResult } from "express-validator/check";

const userCreate = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array() });
  }
  console.log("User routing success");
  res.send("Yay");
};

export default userCreate;
