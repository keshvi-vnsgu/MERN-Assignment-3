const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { uname, passwd } = req.body;

  if (uname === "admin" && passwd === "admin")
  {
    req.session.username = "admin";
    req.session.isLoggedIn = true;
    res.redirect("/dashboard");
  }
  else res.render("login",{err:"Wrong Credentials"});
});

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;