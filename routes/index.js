

//***************************************************** */

var express = require("express");
var router = express.Router();
var session = require("express-session");
var comeon = require("../Models/mongodb");
var products = require("../Models/products");

const auth = function (req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/');
  }
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.session.loggedIn) {
    res.redirect("/home");
  } else {
    res.render("login");
  }
});

// Home route
router.get("/home", auth, async function (req, res, next) {
  try {
    const data = await products.find({});
    if (req.session.loggedIn) {
      res.render("home", { items: data });
    } else {
      res.render("login");
    }
  } catch (error) {
    console.log(error);
    res.render("login");
  }
});

// Sign out route
router.get("/signout", function (req, res) {
  req.session.destroy();
  res.redirect('/');
});

// Submit route
router.post("/submit", async function (req, res) {
  try {
    console.log(req.body);
    const email = req.body.email;
    const pass = req.body.password;
    const confirm = await comeon.findOne({ email: email });
    console.log(confirm);
    if (!confirm) {
      res.render("login", { invalid: "invalid  user id" });
    }
    else {
      if (req.body.password == confirm.password) {
        req.session.user = req.body;
        req.session.loggedIn = true;
        console.log(req.session);
        console.log('hello');
        console.log(confirm.role);
        if (confirm.role == 'admin') {
          console.log("i am admin");
          res.redirect("/admin")
        } else {
          res.redirect('/home')

        }

      } else {
        res.render("login", { invalid: "Invalid password" })
      }
    }
  } catch (error) {
    console.log(error);
    res.render("login", { invalid: "invalid" });
  }
});

// Sign up route
router.get("/signup", function (req, res) {
  res.render("signup");
});

// Register route
router.post("/register", async function (req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    await comeon.create({ name, email, password, gender });
    req.session.user = req.body;
    req.session.loggedIn = true;
    res.redirect('/signout');
  } catch (error) {
    console.log(error);
    res.render("index", { invalid: "invalid" });
  }
});

module.exports = router;

