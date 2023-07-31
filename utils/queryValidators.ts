import { query, validationResult } from "express-validator";

export const courseQueryValidation = [
  query("type").isString(),
  query("level").isString(),
  query("offset").isString(),
  query("size").isString(),
];

export const examQueryValidation = [
  query("type").isString(),
  query("level").isString(),
];
