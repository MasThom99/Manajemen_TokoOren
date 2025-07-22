import KaryawanRepository from "../Repository/karyawan.repository.js";
import express from "express";
const router = express.Router();
const karyawanRepository = new KaryawanRepository();

router.post("/create", async (req, res) => {
  return await karyawanRepository.create(req, res);
});

router.get("/list", async (req, res) => {
  return await karyawanRepository.list(req, res);
});

router.get("/detail/:id", async (req, res) => {
  return await karyawanRepository.detail(req, res);
});

router.put("/update/:id", async (req, res) => {
  return await karyawanRepository.update(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  return await karyawanRepository.delete(req, res);
});

export const karyawanRoute = router;
