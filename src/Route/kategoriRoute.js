import KategoriRepository from "../Repository/kategori.repository.js";
import express from "express";
const router = express.Router();
const kategoriRepository = new KategoriRepository();

router.post("/create", async (req, res) => {
  return await kategoriRepository.create(req, res);
});

router.get("/list", async (req, res) => {
  return await kategoriRepository.list(req, res);
});

router.get("/detail/:id", async (req, res) => {
  return await kategoriRepository.detail(req, res);
});

router.put("/update/:id", async (req, res) => {
  return await kategoriRepository.update(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  return await kategoriRepository.delete(req, res);
});
export const kategoriRoute = router;
