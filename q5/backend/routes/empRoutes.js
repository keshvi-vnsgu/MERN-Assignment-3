const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth");

const Employee = require("../models/Employee");
const Leave = require("../models/Leave");

const router = express.Router();

router.post("/login", async (req, res) => {

    const { empid, password } = req.body;

    const employee = await Employee.findOne({ empid: empid });

    if (!employee) {
        return res.status(401).json({
            message: "Invalid Employee ID or Password"
        });
    }

    const validPassword = await bcrypt.compare(
        password,
        employee.password
    );

    if (!validPassword) {
        return res.status(401).json({
            message: "Invalid Employee ID or Password"
        });
    }

    const token = jwt.sign(
        { id: employee._id },
        "mysecretkey",
        { expiresIn: "1h" }
    );

    res.json({
        message: "Login successful",
        token: token
    });
});

router.get("/profile", verifyToken, async (req, res) => {

    const employee = await Employee.findById(req.employeeId)
        .select("-password");

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    res.json(employee);
});

router.post("/leave/add", verifyToken, async (req, res) => {

    const { date, reason, grant } = req.body;

    const leave = new Leave({
        employeeId: req.employeeId,
        date: date,
        reason: reason,
        grant: grant
    });

    await leave.save();

    res.json({
        message: "Leave application submitted",
        leave: leave
    });
});

router.get("/leave/list", verifyToken, async (req, res) => {

    const leaves = await Leave.find({
        employeeId: req.employeeId
    });

    res.json(leaves);
});

module.exports = router;