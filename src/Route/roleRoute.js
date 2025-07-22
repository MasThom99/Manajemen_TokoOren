import RoleRepository from "../Repository/role.repository.js";
import express from "express";
const router = express.Router();
const roleRepository = new RoleRepository();

router.post("/create", async (req, res) => {
  return await roleRepository.create(req, res);
});

router.get("/list", async (req, res) => {
  return await roleRepository.find(req, res);
});

router.get("/detail/:id", async (req, res) => {
  return await roleRepository.detail(req, res);
});

router.put("/update/:id", async (req, res) => {
  return await roleRepository.update(req, res);
});

export const roleRoute = router;
