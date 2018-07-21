import { Events } from "database/models";

const getEvent = async (req, res) => {
  try {
    const events = await Events.findAll({});
    res.send(events);
  } catch (e) {
    console.error(e);
  }
};

export default getEvent;
