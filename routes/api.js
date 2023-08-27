const userRoute = require("./userRoutes")
const taskRoute = require("./taskRoutes")
const express = require("express");
let app = express()
app.use('/user', userRoute)
app.use('/tasks', taskRoute)
module.exports=app