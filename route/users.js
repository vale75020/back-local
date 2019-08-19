const express = require("express"); // import express
const app = express.Router();

const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

app.post("/register", (req, res) => {
  // creer un nouveau utilisateur
  if (!req.body.username || !req.body.password)
    res.status(412).send("Enter Username and Password");
  User.findOne({
    username: req.body.username
  }).then(user => {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    user
      ? res.status(400).json({ username: "Username already exists!" })
      : bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log(err);
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
  });
});

app.post("/login", (req, res) => {
  //localStorage.removeItem(payload);
  User.findOne({
    username: req.body.username
  }).then(user => {
    //console.log(user);
    if (!user) {
      return res.status(404).json({
        username: "This account doesn't exists!"
      });
    }
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        // User Match
        const payload = {
          id: user.id,
          username: user.username,
          admin: user.admin
        };
        // Creation du JWT Payload
        //Sign Token
        //console.log(payload);
        jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
          // user:user
          if (err) console.log(err);
          res.json({
            success: true,
            token: token
            // username à recuperer en front pour affichage
          }); // post => res = token
        });
      } else {
        // errors.name = "Password incorrect";
        return res.status(400).json({
          password: "Password incorrect"
        });
      }
    });
  });
});

module.exports = app;
