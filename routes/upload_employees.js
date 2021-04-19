const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const fs = require("fs");
const employeeModel = require("../models/employee");
const path = require("path");

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: "eu-central-1",
});

const s3 = new aws.S3();

var storage = multerS3({
  acl: "public-read",
  s3,
  bucket: "govdas",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: "TESTING_METADATA" });
  },
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var uploadDisk = multer({ storage: storage });

//New employee route
router.post("/new", uploadDisk.array("file"), async (req, res) => {
  console.log("file uploaded");
  console.log(req.body);

  //console.log(req);

  let newEmployee = new employeeModel({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationalId: req.body.nationalId,
    phone: req.body.phone,
    address: req.body.address,
    gender: req.body.gender,
    status: req.body.status,
    dateOfBirth: req.body.dateOfBirth,
    qualification: JSON.parse(req.body.qualification),
    job: req.body.job,
    contractStartDate: req.body.contractStartDate,
    endServiceDate: req.body.endServiceDate,
    center: req.body.center,
    management: req.body.management,
    salaryRange: req.body.salaryRange,
    faculty: req.body.faculty,
    careerLadder: req.body.careerLadder,
    employmentStatus: req.body.employmentStatus,
    assignSecondDate: req.body.assignSecondDate,
    assignSecondAuthority: req.body.assignSecondAuthority,
    training: req.body.training,
    fileNames: req.body.fileNames.split(","),
  });

  newEmployee.save((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        message: "employee saved",
      });
    }
  });
});

//Update employee route
router.post("/update", uploadDisk.single("file"), async (req, res) => {
  console.log(req);
  /*
  fs.unlink(path.join(__dirname, "files", req.body.oldimage), (err) => {
    res.status(500).json({
      message: err.message,
    });
  });
  */

  let newEmployee = await employeeModel.findOneAndUpdate(
    { _id: req.body._id },
    {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationalId: req.body.nationalId,
      phone: req.body.phone,
      address: req.body.address,
      gender: req.body.gender,
      status: req.body.status,
      dateOfBirth: req.body.dateOfBirth,
      qualification: JSON.parse(req.body.qualification),
      job: req.body.job,
      contractStartDate: req.body.contractStartDate,
      endServiceDate: req.body.endServiceDate,
      center: req.body.center,
      management: req.body.management,
      salaryRange: req.body.salaryRange,
      faculty: req.body.faculty,
      careerLadder: req.body.careerLadder,
      employmentStatus: req.body.employmentStatus,
      assignSecondDate: req.body.assignSecondDate,
      assignSecondAuthority: req.body.assignSecondAuthority,
      training: req.body.training,
      fileNames: req.body.fileNames.split(","),
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json({
          message: "employee updated",
        });
      }
    }
  );
});

//Delete employee route
router.post("/delete", async (req, res) => {
  /*
  fs.unlink(path.join(__dirname, "..", "files", req.body.oldimage), (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });
  */

  employeeModel.deleteOne({ _id: req.body._id }, function (err) {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });
});

module.exports = router;
