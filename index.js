const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes/api");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
//const files = require("express-fileupload");
//const path = require("path");
const bodyParser = require("body-parser");
const port = 8080;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
try {
  // mongoose.connect("mongodb://127.0.0.1:27017/madhandatabase", options);
  mongoose.connect(
    "mongodb+srv://madhan:Madhan123@cluster0.jlzoiqw.mongodb.net/taskdb",
    options
  );
} catch (error) {
  throw new Error("invalid database namae");
}
const con = mongoose.connection;
con.on("open", (req, res) => {
  console.log("connected");
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
  AccessControlAllowOrigin: "http://localhost:3000/",
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));



app.use("/", router);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
