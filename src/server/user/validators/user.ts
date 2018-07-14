import { body, query } from "express-validator/check";

export const postValidation = [
  body("username").isString(),
  body("password").isString(),
  body("permissionLevel").isString(),
  body("email").isEmail()
];

export const getValidation = [
  query("username").isString(),
  query("password").isString()
];
