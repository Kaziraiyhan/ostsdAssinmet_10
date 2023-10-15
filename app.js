// Basic Lib Import
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

// Security Middleware 
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");

// Database 
const mongoose = require("mongoose");

// Security Middleware 
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Mongo DB Database Connection
let URI =
  "mongodb+srv://kaziraiyhan:Password121@raihan.em8rhjj.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(URI);

// Routing
app.use("/api/v1", router);

// Undefined Route
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

module.exports = app;
