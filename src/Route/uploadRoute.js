import UploadRepository from "../Repository/upload.repository.js";
import express from "express";
const router = express.Router();
const uploadRepository = new UploadRepository();
import { upload } from "../utils/upload_foto.js";

router.post("/foto", upload.single("file"), async (req, res) => {
  return await uploadRepository.uploadFoto(req, res);
});

export const uploadRoute = router;
