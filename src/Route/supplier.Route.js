import SupplierRepository from "../Repository/supplier.repository.js";
import express from "express";
const router = express.Router();
const supplierRepository = new SupplierRepository();

router.post("/create", async (req, res) => {
  return await supplierRepository.create(req, res);
});

router.get("/list", async (req, res) => {
  return await supplierRepository.list(req, res);
});

router.get("/detail/:id", async (req, res) => {
  return await supplierRepository.detail(req, res);
});

router.put("/update/:id", async (req, res) => {
  return await supplierRepository.update(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  return await supplierRepository.delete(req, res);
});
export const supplierRoute = router;
