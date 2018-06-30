import { Events, User } from "../../../database/models";
import { validationResult } from "express-validator/check";

const getEvents = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send("Not valid user Id");
  }
  const { title, start, end, userId } = req.body;

  try {
    const events = await Events.create({
      title,
      start,
      end,
      userId
    });
    res.send(events);
  } catch (e) {
    res.status(404).send("userId does not match ones already in the database");
  }
};

export default getEvents;
