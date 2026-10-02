require("dotenv").config();

const express = require("express");
const session = require("express-session");
const { createClient } = require("redis");
const { RedisStore } = require("connect-redis");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis connecting...");
});

redisClient.on("ready", () => {
  console.log("Redis connected successfully!");
});

// Connect to Redis
redisClient.connect();

// Redis Session Store
const redisStore = new RedisStore({
  client: redisClient,
});

// Session
app.use(
  session({
    store: redisStore,
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
  console.log("Server running on htps://localhost:8000/");
});