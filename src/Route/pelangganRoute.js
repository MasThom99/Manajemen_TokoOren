import PelangganRepository from "../Repository/pelanggan.repository.js";
import express from "express";
const router = express.Router();
const pelangganRepository = new PelangganRepository();

router.post("/create", async (req, res) => {
  return await pelangganRepository.create(req, res);
});

router.get("/list", async (req, res) => {
  return await pelangganRepository.list(req, res);
});

router.get("/detail/:id", async (req, res) => {
  return await pelangganRepository.detail(req, res);
});

router.put("/update/:id", async (req, res) => {
  return await pelangganRepository.update(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  return await pelangganRepository.delete(req, res);
});

export const pelangganRoute = router;
