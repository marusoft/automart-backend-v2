import Car from "../models/car";
const cloudinary = require("../utils/cloudinary");

export const createCar = async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const { condition, manufacturer, amount, carmodel, bodytype } = req.body;
    const car = new Car({
      manufacturer,
      condition,
      amount,
      carmodel,
      bodytype,
      imgurl: result.secure_url
    });
    if (!condition || !manufacturer || !amount || !carmodel || !bodytype)
      return res.status(400).send("Fields cannot be empty");
    const saveCar = await car.save();
    return res.status(201).json({
      saveCar,
      message: "Car created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const viewAllCar = async (req, res) => {
  try {
    const allCars = await Car.find();
    return res.status(200).json({
      allCars,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const viewACar = async (req, res) => {
  try {
    const getASpecificCar = await Car.findById(req.params._id);
    if (!getASpecificCar) {
      return res.status(404).json({
        message: "Car not found",
      });
    }
    return res.status(200).json({
      getASpecificCar,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        message: `Car not found with id ${req.params._id}`,
      });
    }
    return res.status(500).json({
      message: `Error retrieving car with id ${req.params._id}`,
    });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const deleteCar = await Car.findByIdAndDelete(req.params._id);
    if (!deleteCar) {
      return res.status(404).jsob({
        message: `Car not found with _id ${req.params._id}`,
      });
    }
    return res.status(200).json({
      message: "Car post successfully deleted",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        message: `Car not found with _id ${req.params._id}`,
      });
    }
    return res.status(500).json({
      message: `Could not delete Car with _id  ${req.params._id}`,
    });
  }
};
