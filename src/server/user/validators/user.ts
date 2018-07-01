import { body, query } from "express-validator/check";

export const postValidation = [
  body("username").isString(),
  body("password").isString(),
  body("permissionLevel").isString()
];

export const getValidation = [
  query("username").isString(),
  query("password").isString()
];
