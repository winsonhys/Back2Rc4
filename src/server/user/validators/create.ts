import { body } from "express-validator/check";

const validation = [body("username").isString(), body("password").isString()];

export default validation;
