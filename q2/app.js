const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new FileStore({
      path: "./sessions",
    }),
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
  }),
);

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "admin" && password === "1234") {
    req.session.username = username;

    res.redirect("/home");
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/home", (req, res) => {
  if (req.session.username) {
    res.render("home", {
      username: req.session.username,
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/profile", (req, res) => {
  if (req.session.username) {
    res.render("profile", {
      username: req.session.username,
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error while logging out");
    }

    res.redirect("/login");
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
