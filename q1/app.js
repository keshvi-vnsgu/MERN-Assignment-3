const express = require("express");
const multer = require("multer");
const path = require("path");
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

var options = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      return cb("Invalid file type");
    }

    cb(null, "./public/uploads");
  },

  filename: (req, file, cb) => {
    console.log(file);

    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({
  storage: options,
});

app.get("/", (req, res) => {
  res.render("register");
});

app.post(
  "/register",

  upload.fields([
    {
      name: "profilePic",
      maxCount: 1,
    },
    {
      name: "otherPics",
      maxCount: 5,
    },
  ]),

  body("username").trim().notEmpty().withMessage("Username is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),

  body("email").isEmail().withMessage("Enter a valid email"),

  body("gender").notEmpty().withMessage("Please select gender"),

  body("hobbies").notEmpty().withMessage("Please select at least one hobby"),

  function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("register", {
        errors: errors.array(),
        oldData: req.body,
      });
    }

    return res.render("result", {
      data: req.body,
      files: req.files,
    });
  },
);

app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;

  const filePath = path.join(__dirname, "./public/uploads", filename);

  console.log("Filename:", filename);
  console.log("File path:", filePath);

  res.download(filePath);
  
});

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
