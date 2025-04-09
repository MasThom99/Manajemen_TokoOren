import UserRepository from "../Repository/user.repository.js";
import express from "express";
import {
  validateLogin,
  validateRegister,
  validateUpdate,
} from "../utils/validator.js";

const router = express.Router();
const userRepository = new UserRepository();

router.post("/register", validateRegister, async (req, res) => {
  return await userRepository.register(req, res);
});
router.get("/activate/:token", async (req, res) => {
  return await userRepository.activateUser(req, res);
});

export const userRoute = router;
