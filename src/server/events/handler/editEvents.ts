import { Events } from "../../../database/models";
import { validationResult } from "express-validator/check";

const editEvents = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    console.error(error.array());
    return res.status(400).send("Not valid event id");
  }
  const { id } = req.body;
  const event = await Events.findOne({
    where: {
      id
    }
  });
  const { title, start, end, type, allDay } = req.body;
  try {
    await event.update({
      ...event,
      title,
      start,
      end,
      type,
      allDay
    });
    await event.reload();
    res.send(event);
  } catch (e) {
    res.status(400).send("Unable to update");
    console.error(e);
  }
};

export default editEvents;
