import { Request, Response } from "express";
import { Events, Users } from "database/models";
export interface SwapEventsPayload {
  requesteeNewEvent: Events;
  requestedNewEvent: Events;
}
const eventSwap = async (req: Request, res: Response) => {
  const { eventIdFrom, eventIdTo } = req.body;
  let eventFrom: Events, eventTo: Events;

  eventFrom = await Events.findOne({
    where: {
      id: eventIdFrom
    },
    include: [Users]
  });
  if (eventFrom === null) {
    res.status(404).send("eventFrom not found");
  }

  eventTo = await Events.findOne({
    where: {
      id: eventIdTo
    },
    include: [Users]
  });
  if (eventTo === null) {
    res.send(404).send("eventTo not found");
  }

  const { title: titleFrom, userId: userIdFrom } = eventFrom;
  const { title: titleTo, userId: userIdTo } = eventTo;
  await Promise.all([
    eventFrom.update({
      title: titleTo,
      userId: userIdTo
    }),
    eventTo.update({
      title: titleFrom,
      userId: userIdFrom
    })
  ]);

  await Promise.all([eventTo.reload(), eventFrom.reload()]);
  const payload: SwapEventsPayload = {
    requesteeNewEvent: eventFrom,
    requestedNewEvent: eventTo
  };
  res.send(payload);
};

export default eventSwap;
