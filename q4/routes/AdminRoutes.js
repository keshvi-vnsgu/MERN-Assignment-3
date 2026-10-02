const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const validateSession = require("../middlewares/Auth");
const Employee = require("../models/Employee");
const transporter = require("../utils/mailer");
const nodemailer = require("nodemailer");

router.use(validateSession);

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/emp/add", (req, res) => {
  res.render("addEmp");
});

router.post("/emp/add", async (req, res) => {
  const { ename, email, dept, bs, hra, da } = req.body;
  const empid = "EMP-" + Date.now();
  const pw = Math.random().toString(36).slice(0, 6);
  const hashedpw = (await bcrypt.hash(pw, 10)).toString();

  const emp = new Employee({
    empid: empid,
    name: ename,
    email: email,
    department: dept,
    basicSalary: bs,
    password: hashedpw,
    hra: hra,
    da: da,
    grossSalary: Number(bs) + Number(hra) + Number(da),
  });

  await emp.save();

  const info = await transporter.sendMail({
    from: "your-ethereal-email",
    to: email,
    subject: "ERP Employee Account",
    text: `Hello ${ename},

Your employee account has been created.

Employee ID: ${empid}
Password: ${pw}

Please keep these details safe.`,
  });

  console.log("Email Preview:", nodemailer.getTestMessageUrl(info));
  res.redirect("/emp/list");
});

router.get("/emp/list", async (req, res) => {
  const emps = await Employee.find({});
  console.log(emps);
  res.render("empList", { empList: emps });
});

router.get("/emp/edit/:id", async (req, res) => {
  const emp = await Employee.findById(req.params.id);

  res.render("editEmp", { emp: emp });
});

router.post("/emp/edit/:id", async (req, res) => {
  const { ename, email, dept, bs, hra, da } = req.body;

  await Employee.findByIdAndUpdate(req.params.id, {
    name: ename,
    email: email,
    department: dept,
    basicSalary: bs,
    hra: hra,
    da: da,
    grossSalary: Number(bs) + Number(hra) + Number(da),
  });

  res.redirect("/emp/list");
});

router.post("/emp/delete/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);

  res.redirect("/emp/list");
});

module.exports = router;
