import { Events } from "../../../database/models";
import { validationResult } from "express-validator/check";

const getEvents = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send("Not valid event id");
  }
  const { id } = req.body;

  try {
    const events = await Events.destroy({
      where: {
        id
      }
    });
    res.send("event destroyed");
  } catch (e) {
    res
      .status(404)
      .send("event id does not match ones already in the database");
  }
};

export default getEvents;
