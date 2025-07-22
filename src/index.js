import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database.js";
import { userRoute } from "./Route/userRoute.js";
import { roleRoute } from "./Route/roleRoute.js";
import { supplierRoute } from "./Route/supplier.Route.js";
import { kategoriRoute } from "./Route/kategoriRoute.js";
import { produkRoute } from "./Route/produkRoute.js";
import { penjualanRoute } from "./Route/penjualanRoute.js";
import { pembelianRoute } from "./Route/pembeliaRoute.js";
import { pelangganRoute } from "./Route/pelangganRoute.js";
import { karyawanRoute } from "./Route/karyawanRoute.js";
import { detail_jualRoute } from "./Route/detail_jualRoute.js";
import { uploadRoute } from "./Route/uploadRoute.js";
dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.set("view engine", "ejs");
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const swaggerFile = path.join(__dirName, "./swagger.json");
const swaggerDokumen = JSON.parse(fs.readFileSync(swaggerFile, "utf8"));
app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDokumen)
);
app.use("/user", userRoute);
app.use("/role", roleRoute);
app.use("/supplier", supplierRoute);
app.use("/kategori", kategoriRoute);
app.use("/produk", produkRoute);
app.use("/penjualan", penjualanRoute);
app.use("/pembelian", pembelianRoute);
app.use("/pelanggan", pelangganRoute);
app.use("/karyawan", karyawanRoute);
app.use("/detail_jual", detail_jualRoute);
app.use("/upload_foto", uploadRoute);

app.get("/", (req, res) => {
  return res.send("welcome to our API");
});

app.use((req, res) => {
  return res.status(404).json({
    status: false,
    message: "are you lost?",
    data: null,
  });
});

// Perbaikan middleware error handling
app.use((err, req, res) => {
  return res.status(500).json({
    status: false,
    message: `internal server error: ${err.message}`,
  });
});

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on PORT ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
