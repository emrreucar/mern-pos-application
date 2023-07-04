const express = require("express");
const Bill = require("../models/Bill.js");

const router = express.Router();

//! create Bill
router.post("/add-bill", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json("Bill item added successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! get all bill
router.get("/get-all", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! update bill
router.put("/update-bill", async (req, res) => {
  try {
    await Bill.findOneAndUpdate({ _id: req.body.billId }, req.body);
    res.status(200).json({
      message: "Bill item updated successfully.",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//! delete bill
router.delete("/delete-bill", async (req, res) => {
  try {
    await Bill.findOneAndDelete({ _id: req.body.billId });
    res.status(200).json({
      message: "Bill item deleted successfully.",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
