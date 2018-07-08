import _ from "lodash";
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
  const { title, start, end, type, allDay, location } = req.body;
  const updatedEvent = _.omit(req.body, "id");
  try {
    await event.update({
      ...event,
      ...updatedEvent
    });
    await event.reload();
    res.send(event);
  } catch (e) {
    console.error(e);
    res.status(400).send("Unable to update");
  }
};

export default editEvents;
