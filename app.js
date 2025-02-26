import express from "express";
import logger from "morgan";
import cors from "cors";
import { contactsRouter } from "./routes/api/contacts.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ status: "failure", code: 404, message: "Not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
