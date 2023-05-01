const express = require("express");
const app = express();
var http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userAPI = require("./API/userAPI")();
const projectAPI = require("./API/projectAPI")();
const taskAPI = require("./API/taskAPI")();
require("dotenv").config();
const dbConnection = require("./DBConnection/db");
const { API_PORT } = process.env;


console.log("API_port ---> " + process.env.API_PORT);

let portNumber = process.env.API_PORT || 3000;
server.listen(portNumber, async function () {
  console.log("Server is running on " + portNumber);
  await dbConnection();
  app.use(bodyParser.json());
  app.use("/api/user/", userAPI);
  app.use("/api/project/", projectAPI);
  app.use("/api/task/", taskAPI);
});


/*
app.use() is a method in the Express framework used to register middleware functions. 
Middleware functions are functions that have access to the request and response objects and can execute any
 code, make changes to the request and response objects, and call the next middleware function in the chain.

Middleware functions are registered using app.use() by passing them as arguments to the method. 
They are executed in the order in which they are registered.

For example, in the given code, app.use(bodyParser.json()) is used to register the middleware that
 parses incoming JSON payloads, and app.use("/api/user/", userAPI) is used to register the route for 
 handling requests for user APIs. When a request is received by the server, it will first be processed by 
 the bodyParser.json() middleware to parse the JSON payload, and then it will be handled by the appropriate API
  route middleware registered with app.use().
*/