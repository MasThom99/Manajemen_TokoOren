import { body, validationResult } from "express-validator";
export const validateRegister = [
  body("username")
    .isEmail()
    .withMessage("it's not email")
    .exists()
    .withMessage("email is required"),
  body("password")
    .exists()
    .withMessage("password is required")
    .matches(/^\S*$/)
    .withMessage("password must not contain whitespaces"),
  body("roleId").optional().isString().withMessage("role must be string"),
  body("profile_photo").optional().isString().withMessage("must be string"),
];

export const validateLogin = [
  body("username")
    .isEmail()
    .withMessage("it's not email")
    .exists()
    .withMessage("email is required"),
  body("password")
    .exists()
    .withMessage("password is required")
    .matches(/^\S*$/)
    .withMessage("password must not contain whitespaces"),
];

export const validateUpdate = [
  body("username")
    .isEmail()
    .withMessage("it's not email")
    .exists()
    .withMessage("email is required"),
  body("password")
    .exists()
    .withMessage("password is required")
    .matches(/^\S*$/)
    .withMessage("password must not contain whitespaces"),
  body("roleId").optional().isString().withMessage("role must be string"),
  body("profile_photo").optional().isString().withMessage("must be string"),
];
