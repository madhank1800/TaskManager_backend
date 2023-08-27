const mongoose = require("mongoose");
// import mongoose from "mongoose";
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    confirmPassword: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", function save(next) {
  const user = this;
  // console.log("user", user);
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    // console.log(salt);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      // console.log("hash", hash);
        user.password = hash;
         user.confirmPassword = hash;
      next();
    });
    //   bcrypt.hash(user.confirmPassword, salt, (err, hash) => {
    //     if (err) throw err;
    //     // console.log("hash", hash);
    //     user.confirmPassword = hash;
    //     next();
    //   });
  });
});

userSchema.pre("findOneAndUpdate", function findOneAndUpdate(next) {
  const user = this;
  console.log("user***", user._update["$set"].password);
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    // console.log(salt);
    bcrypt.hash(user._update["$set"].password, salt, (err, hash) => {
      if (err) throw err;
      // console.log("hash", hash);
      user._update["$set"].password = hash;
      next();
    });
  });
});
module.exports = mongoose.model("user", userSchema);
