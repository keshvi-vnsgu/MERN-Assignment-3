const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema({
  empid: {
    type: "string",
  },
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
  },
  department: {
    type: "string",
  },
  basicSalary: {
    type: "number",
    min: 2000,
  },
  hra: {
    type: "number",
  },
  da: {
    type: "number",
  },
  grossSalary: {
    type: "number",
  },
  password: {
    type: "string",
  },
});

const Employee = new model("Employees", EmployeeSchema);

module.exports = Employee;
