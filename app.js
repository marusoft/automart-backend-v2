const express = require("express");
import { readdirSync } from "fs";
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
// Connect DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Suceessfully connected"))
  .catch((error) => console.log("Database connection error", error));
// Middleware
app.use(express.json());
// app.use(cors());

// HANDLING CORS ERRORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});
//HANDLE ERROR
// app.use((req, res, next) => {
//   const error = new Error("NOT FOUND");
//   error.status = 404;
//   next(error);
// });
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "It all start from localhost",
  });
});

// Route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
});
