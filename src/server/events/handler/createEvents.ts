import { Events, User } from "../../../database/models";
import { validationResult } from "express-validator/check";

const getEvents = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send("Not valid user Id");
  }
  const { title, start, end, userId, type } = req.body;

  try {
    const events = await Events.create({
      title,
      start,
      end,
      userId,
      type
    });
    res.send(events);
  } catch (e) {
    res.status(404).send("Unable to create event. Failing validatons");
  }
};

export default getEvents;
