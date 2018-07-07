import { body, query } from "express-validator/check";

export const getValidation = [
  query("userId")
    .isUUID()
    .exists()
];
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
    .isString()
    .optional(),
  body("allDay")
    .isBoolean()
    .optional()
];
