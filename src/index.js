import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database.js";
import { userRoute } from "./Route/userRoute.js";
dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use("/user", userRoute);

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
