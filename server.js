var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var router = express.Router();
var exphbs = require("express-handlebars");

// Initialize Express
var app = express();
var PORT = process.env.port || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(router);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require routes file
require("./config/routes")(router);

// Connect to the Mongo DB
var databaseUri = "mongodb://127.0.0.1/mongoHeadlines";
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect(databaseUri);
}

var db = mongoose.connection;

db.on("error", function(err){
  console.log("Mongoose Error: ", err);
});

db.once("open", function(){
  console.log("Mongoose connection successful.");
});

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/mongoHeadlines";
// mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, function(error){
//   if(error){
//     console.log(error);
//   }
//   else {
//     console.log("mongoose connection is successful")
//   }
// })

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

  module.exports = app;
