import PenjualanRepository from "../Repository/penjualan.repository.js";
import express from "express";
const router = express.Router();
const penjualanRepository = new PenjualanRepository();

router.post("/create", async (req, res) => {
  return await penjualanRepository.create(req, res);
});

router.get("/list", async (req, res) => {
  return await penjualanRepository.list(req, res);
});

router.get("/detail/:id", async (req, res) => {
  return await penjualanRepository.detail(req, res);
});

router.put("/update/:id", async (req, res) => {
  return await penjualanRepository.update(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  return await penjualanRepository.delete(req, res);
});

export const penjualanRoute = router;
