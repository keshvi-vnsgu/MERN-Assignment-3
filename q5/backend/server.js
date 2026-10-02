require("dotenv").config()
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const employeeRoutes = require("./routes/empRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();


app.use("/api/employee", employeeRoutes);

app.get("/", (req, res) => {
    res.send("Employee API running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});