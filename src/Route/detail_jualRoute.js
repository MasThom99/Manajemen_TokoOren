import Detail_jualRepository from "../Repository/detail_jual.repository.js";
import express from "express";
const router = express.Router();
const detail_jualRepository = new Detail_jualRepository();

router.post("/create", async (req, res) => {
  return await detail_jualRepository.create(req, res);
});

router.get("/list", async (req, res) => {
  return await detail_jualRepository.list(req, res);
});

router.get("/deltail/:id", async (req, res) => {
  return await detail_jualRepository.detail(req, res);
});

router.put("/update/:id", async (req, res) => {
  return await detail_jualRepository.update(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  return await detail_jualRepository.delete(req, res);
});

export const detail_jualRoute = router;
