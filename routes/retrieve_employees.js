const express = require('express');
const router = express.Router();
const employeeModel = require("../models/employee");
const path = require("path");

//All employees route
router.get('/all', async (req, res) => {
    employeeModel.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
              message: err.message,
            });
            return;
        }
        res.status(200).json({
            message: "Retrieved all employees",
            employees: data,
        });
    })
});

//Specific employee route
router.post('/specific', async (req, res) => {
    employeeModel.find({_id: req.body._id}, (err, data) => {
        if (err) {
            res.status(500).json({
              message: err.message,
            });
            return;
        }
        res.status(200).json({
            message: "Retrieved specific employee",
            data
        });
    })
});

module.exports = router;