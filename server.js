// Check if we are running in the dev or local
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require('method-override');

const morgan = require('morgan');
const helmet = require('helmet');


// Connect to db

// Check if we are running in the dev or local
if (process.env.NODE_ENV !== 'production') {
  mongoose.connect("mongodb://localhost/moe_gifted", { useNewUrlParser: true, useUnifiedTopology: true });
}else{
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}
const db = mongoose.connection;

//check for connection
db.once("open", () => console.log("Connected to Mongodb MOE Gifted"));

// Check for db errors
db.on("error", err => console.log(err));

// init express
const app = express();

// statics files like css, js, images
app.use(express.static("public"));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Body parser
app.use(express.urlencoded({ extended: false }));
// using method-override to send request to the server like 'delete' and 'put'
app.use(methodOverride('_method'));

app.use(morgan('common'));
app.use(helmet());

// Routes
app.use("/", require("./routes/index"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/students", require("./routes/students"));
app.use("/courses", require("./routes/courses"));
app.use("/exams", require("./routes/exams"));
app.use('/register', require('./routes/register'));


// Listen on Port 5000
// Run the server to listen on the PORT
app.listen(process.env.PORT || 5000);