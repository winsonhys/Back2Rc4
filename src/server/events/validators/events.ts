import * as _ from "lodash";
import { EVENT_TYPE, LOCATIONS } from "server/test/data";
import { body, query } from "express-validator/check";

export const postValidation = [
  body("title")
    .isString()
    .exists(),
  body("start")
    .isISO8601()
    .exists(),
  body("end")
    .isISO8601()
    .exists(),
  body("userId")
    .isUUID()
    .exists(),
  body("type")
    .isString()
    .exists(),
  body("allDay")
    .isBoolean()
    .exists(),
  body("location")
    .isString()
    .exists()
];
export const deleteValidation = [
  query("id")
    .isUUID()
    .exists()
];

export const updateValidation = [
  body("id")
    .isUUID()
    .exists(),
  body("title")
    .isString()
    .optional(),
  body("start")
    .isISO8601()
    .optional(),
  body("end")
    .isISO8601()
    .optional(),
  body("type")
    .isIn(_.values(EVENT_TYPE))
    .optional(),
  body("allDay")
    .isBoolean()
    .optional(),
  body("location")
    .isIn(_.values(LOCATIONS))
    .optional()
];

export const swapValidation = [
  body("eventIdFrom")
    .isUUID()
    .exists(),
  body("eventIdTo")
    .isUUID()
    .exists()
];
