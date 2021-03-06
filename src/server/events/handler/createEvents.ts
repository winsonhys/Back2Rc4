import { Events } from "database/models";
import { validationResult } from "express-validator/check";

const createEvents = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.error(error.array());
    return res.status(401).send("Payload does not pass verification");
  }
  const { title, start, end, userId, type, location } = req.body;
  //TODO: Back end validation for clashing locations
  try {
    const events = await Events.create({
      title,
      start,
      end,
      userId,
      type,
      location
    });
    res.send(events);
  } catch (e) {
    console.error(e);
    res.status(406).send("Unable to create event. Failing validatons");
  }
};

export default createEvents;
