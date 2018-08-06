import moment from "moment";
import { validationResult } from "express-validator/check";
import NodeMailer from "nodemailer";
import { Response, Request } from "express";
import { Events, Users } from "database/models";
import { MailOptions } from "nodemailer/lib/json-transport";
import QueryString from "query-string";

const requestSwap = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.error(error.array());
    return res.status(401).send("Payload and params failed validation");
  }
  const { eventIdFrom, eventIdTo } = req.body;
  let eventFrom: Events, eventTo: Events;
  try {
    eventFrom = await Events.findOne({
      where: {
        id: eventIdFrom
      }
    });
  } catch (e) {
    res.status(404).send("eventFrom not found");
  }
  try {
    eventTo = await Events.findOne({
      where: {
        id: eventIdTo
      },
      include: [Users]
    });
  } catch (e) {
    res.status(404).send("eventTo not found");
  }

  const transporter = NodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  let url = QueryString.stringify({
    eventFromId: eventFrom.id,
    eventToId: eventTo.id
  });

  url = "http://localhost:3000/successfulSwap?" + url;

  const messageConfig: MailOptions = {
    from: `RC4cal <${process.env.EMAIL}>`,
    to: eventTo.user.email,
    subject: "Swap Request",
    html: `<div style="text-align: center;">
    <p>A swap has been requested by
        <span style="color: #ff6600;">
            <strong>${eventTo.user.username}
            </strong>
        </span>
    </p>
    <p>Event that
        <span style="color: #ff6600;">${eventTo.user.username}
        </span> wants to swap with you:
        <br />
        <span style="color: #3366ff;">
            Event name: ${eventFrom.title}
        </span>
        <br />
        <span style="color: #3366ff;">
            Event time start: ${moment(eventFrom.start)
              .local()
              .format("dddd, MMMM Do YYYY, h:mm a")}
        </span>
        <br />
        <span style="color: #3366ff;">
            Event time end: ${moment(eventFrom.end)
              .local()
              .format("dddd, MMMM Do YYYY, h:mm a")}
        </span>
        <br />

        <span style="color: #3366ff;">
            Event location: ${eventFrom.location}
        </span>
        <br />
        <br />
        <br />Your event
        <strong>to be swapped</strong>:
        <br />
        <br />
        <span style="color: #008000;">
            Event name: ${eventTo.title}
        </span>
        <br />
        <span style="color: #008000;">
            Event time start: ${moment(eventTo.start)
              .local()
              .format("dddd, MMMM Do YYYY, h:mm a")}
        </span>
        <br />
        <span style="color: #008000;">
            Event time end: ${moment(eventTo.end)
              .local()
              .format("dddd, MMMM Do YYYY, h:mm a")}
        </span>
        <br />
        <span style="color: #008000;">
            Event location: ${eventTo.location}
        </span>
        <br />
        <br />To agree to the swap, please click below.</p>
    <a href="${url}" class="button">Swap Event</a>
</div>`
  };

  const transporterPromise: Promise<any> = new Promise((resolve, reject) => {
    transporter.sendMail(messageConfig, (e, info) => {
      if (e) {
        reject(e);
      } else {
        resolve(info);
      }
    });
  });

  try {
    const emailInfo = await transporterPromise;
    res.send(emailInfo);
  } catch (e) {
    console.error(e);
    res.status(400).send("Email failed to send");
  }
};

export default requestSwap;
