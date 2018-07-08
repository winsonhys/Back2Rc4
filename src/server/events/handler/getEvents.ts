import { Events } from "../../../database/models";
import { validationResult } from "express-validator/check";

const createEvents = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send("Not valid user Id");
  }

  try {
    const events = await Events.findAll({
      where: {
        userId: req.query.userId
      }
    });
    res.send(events);
  } catch (e) {
    console.error(e);
  }
};

export default createEvents;
