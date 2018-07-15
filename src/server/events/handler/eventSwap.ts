import { Request, Response } from "express";
import _ from "lodash";
import { Events } from "database/models";
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
    }
  });
  if (eventFrom === null) {
    res.status(404).send("eventFrom not found");
  }

  eventTo = await Events.findOne({
    where: {
      id: eventIdTo
    }
  });
  if (eventTo === null) {
    res.send(404).send("eventTo not found");
  }
  const eventFromArgs = _.omit(eventFrom.dataValues, [
    "id",
    "createdAt",
    "updatedAt"
  ]);
  const eventToArgs = _.omit(eventTo.dataValues, [
    "id",
    "createdAt",
    "updatedAt"
  ]);

  const newEventFrom = await Events.create({
    ...eventFromArgs,
    title: eventToArgs.title,
    userId: eventToArgs.userId
  });

  const newEventTo = await Events.create({
    ...eventFromArgs,
    title: eventFromArgs.title,
    userId: eventFromArgs.userId
  });

  await Promise.all([eventFrom.destroy(), eventTo.destroy()]);

  // const { title: titleFrom, userId: userIdFrom } = eventFrom;
  // const { title: titleTo, userId: userIdTo } = eventTo;
  // await Promise.all([
  //   eventFrom.update({
  //     title: titleTo,
  //     userId: userIdTo
  //   }),
  //   eventTo.update({
  //     title: titleFrom,
  //     userId: userIdFrom
  //   })
  // ]);

  // await Promise.all([eventTo.reload(), eventFrom.reload()]);
  const payload: SwapEventsPayload = {
    requesteeNewEvent: newEventFrom,
    requestedNewEvent: newEventTo
  };
  res.send(payload);
};

export default eventSwap;
