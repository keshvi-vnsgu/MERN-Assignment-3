const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const session = require("express-session");
const AuthRoutes = require("./routes/AuthRoutes");
const AdminRoutes = require("./routes/AdminRoutes");

const PORT = process.env.PORT || 8000;

connectDB();

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "SecretKey",
    saveUninitialized: false,
    resave: false,
  }),
);

app.use(AuthRoutes);
app.use(AdminRoutes);

app.listen(PORT, () => {
  console.log(`Server Listening on http://localhost:${PORT}`);
});
