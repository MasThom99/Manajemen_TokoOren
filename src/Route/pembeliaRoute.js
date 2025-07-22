import PembelianRepository from "../Repository/pembelian.repository.js";
import express from "express";
const router = express.Router();
const pembelianRepository = new PembelianRepository();

router.post("/create", async (req, res) => {
  return await pembelianRepository.create(req, res);
});

router.get("/list", async (req, res) => {
  return await pembelianRepository.list(req, res);
});

router.get("/detail/:id", async (req, res) => {
  return await pembelianRepository.detail(req, res);
});

router.put("/update/:id", async (req, res) => {
  return await pembelianRepository.update(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  return await pembelianRepository.delete(req, res);
});

export const pembelianRoute = router;
