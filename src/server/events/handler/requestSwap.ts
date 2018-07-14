import NodeMailer from "nodemailer";
import { Response, Request } from "express";
import { resolve } from "path";

const requestSwap = async (req: Request, res: Response) => {
  const transporter = NodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "beeohhaee@gmail.com",
      pass: "s9643451j"
    }
  });

  const messageConfig = {
    from: "beeohhaee@gmail.com",
    to: "beeohhaee@gmail.com",
    subject: "Test email subject",
    text: "Test email body"
  };

  await transporter.verify((e, suc) => {
    if (e) {
      console.error(e);
      res.status(400).send("Check transporter config");
    }
  });

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
