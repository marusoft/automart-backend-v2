import express from "express";
const router = express.Router();

import upload from "../utils/multer";
import {
  createCar,
  viewACar,
  viewAllCar,
  deleteCar,
} from "../controllers/car.js";

router.post("/car", upload.single("image"), createCar);
router.get("/car", viewAllCar);
router.get("/car/:_id", viewACar);
router.delete("/car/:_id", deleteCar);

module.exports = router;
