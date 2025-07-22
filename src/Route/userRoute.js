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

router.post("/login", validateLogin, async (req, res) => {
  return await userRepository.login(req, res);
});

router.get("/list", async (req, res) => {
  return await userRepository.list(req, res);
});

router.get("/detail/:id", async (req, res) => {
  return await userRepository.detail(req, res);
});

router.put("/update/:id", validateUpdate, async (req, res) => {
  return await userRepository.update(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  return await userRepository.delete(req, res);
});

router.put("/forgotPassword", async (req, res) => {
  return await userRepository.forgotPassword(req, res);
});

router.put("/changePassword", async (req,res) => {
  console.log(req)
  return await userRepository.changePassword(req,res)
})
export const userRoute = router;
