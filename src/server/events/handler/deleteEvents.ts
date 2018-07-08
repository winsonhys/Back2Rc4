import { Events } from "../../../database/models";
import { validationResult } from "express-validator/check";

const getEvents = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.error("Not valid event id");
    return res.status(400).send("Not valid event id");
  }
  const { id } = req.query;

  try {
    const events = await Events.destroy({
      where: {
        id
      }
    });
    res.send(id);
  } catch (e) {
    console.error("event id does not match ones already in the database");
    res
      .status(404)
      .send("event id does not match ones already in the database");
  }
};

export default getEvents;
