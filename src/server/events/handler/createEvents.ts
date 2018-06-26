import { Events } from "../../../database/models";
import { validationResult } from "express-validator/check";

const getEvents = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send("Not valid user Id");
  }
  const { title, start, end, userID } = req.body;

  const events = await Events.create({
    title,
    start,
    end,
    userID
  });
  res.send(events);
};

export default getEvents;
