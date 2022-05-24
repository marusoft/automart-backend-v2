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
app.use(cors());

// Route
// app.use("/api", require("./routes/car"));

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
});
