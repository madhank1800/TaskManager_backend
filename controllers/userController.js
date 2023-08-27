const user = require("../models/user");
const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// login api
exports.login = async (req, res) => {
  try {
    let details = await user.findOne({
      //firstname: req.body.email
      email: req.body.email,
    });

    if (details === null) {
      res.send("incorrect details");
    } else {
      const hash = details.password; //taking hash format of password from db to compare with current password.
      const myPlaintextPassword = req.body.password;

      const match = bcrypt.compare(myPlaintextPassword, hash);
      match.then((result) => {
        let response = result;

        // console.log("result", result);
        if (response === true) {
          // console.log("success");
          //create token
          const token = jwt.sign({ user }, process.env.SECRET_KEY);
          // console.log("token", token);
          // res.json({ token });
          res.status(200).send({ token: token, name: details.firstname });
        } else {
          console.log("failed");
          res.status(401).send("incorrect details!");
        }
      });
    }
  } catch (err) {
    throw new Error(err)
  }
};

// register api
exports.register = async (req, res) => {
  try {
    //checking user already existed or not.
    let findingValue = await user.find({
      //  firstname: req.body.firstname,
      email: req.body.email,
    });
    // console.log("findingValue", findingValue);
    if (
      findingValue[0] !== undefined &&
      findingValue[0].email === req.body.email
    ) {
      // console.log("user already existed");
      res.send("user already existed");
    } else {
      let signinList = new user({
        firstname: req.body.firstname,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });
      // console.log("inside :", req.body);

      signinList.save();

      // console.log(req.body);
      res.status(201).send("signed up succesfully");
    }
  } catch (err) {
    throw new Error(err);
  }
};
