import { body, query } from "express-validator/check";

export const getValidation = [query("userId").isUUID()];
export const postValidation = [
  body("title").isString(),
  body("start").isISO8601(),
  body("end").isISO8601(),
  body("userID").isUUID()
];
