import ProdukRepository from "../Repository/produk.repository.js";
import KategoriRepository from "../Repository/kategori.repository.js";
import UserRepository from "../Repository/user.repository.js";
import express from "express";
const router = express.Router();
const produkRepository = new ProdukRepository();

router.post("/create", async (req, res) => {
  return await produkRepository.create(req, res);
});

router.get("/list", async (req, res) => {
  return await produkRepository.list(req, res);
});

router.get("/detail/:id", async (req, res) => {
  return await produkRepository.detail(req, res);
});

router.put("/update/:id", async (req, res) => {
  return await produkRepository.update(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  return await produkRepository.delete(req, res);
});

export const produkRoute = router
