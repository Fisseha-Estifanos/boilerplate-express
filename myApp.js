let express = require('express');
var bodyParser = require('body-parser');
let app = express();
console.log("Hello World")
//app.get("/", function(req, res) {
//  res.send('Hello Express');
//})

// path for the views folder,
// contating html files
indexHtmlAbsolutePath = __dirname + '/views/index.html'

// path for the css file
cssFolderAbsolutePath = __dirname + '/public'

function getDateTimeNow() {
  var currentdate = new Date(); 
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
              + (currentdate.getMonth()+1)  + "/" 
              + currentdate.getFullYear() + " @ "  
              + currentdate.getHours() + ":"  
              + currentdate.getMinutes() + ":" 
              + currentdate.getSeconds();
  return datetime
}

// a root level middleware to log stuff
function rootLevelLoggerMiddleware(req, res, next) {
  method = req.method;
  path = req.path;
  ip = req.ip;

  datetime = getDateTimeNow()
  console.log(datetime);

  console.log(method + " " + path + " - " + ip);
  next();
}

// mount root level midleware function
app.use("/", rootLevelLoggerMiddleware);

// add css to the express web application frame work and
// mount the css to the web applicatio frame work
app.use("/public", express.static(cssFolderAbsolutePath));


// some handlers to test the chain middleware in other method
// base handler
function chainedMiddleware(req, res, next) {
  req.time = new Date().toString();
  next();
};

// second/middle handler
function middleHandler(req, res, next) {
  console.log('middle handler: passing handle to final handle');
  next();
}

// last/final handler
function finalHandler(req, res) {
  res.json({time: req.time})
  console.log('final handler: over and out')
}

// adding a chained middleware as a time display
// on the 'now' route
app.get('/now', chainedMiddleware, middleHandler, finalHandler);


// the Json formated Data endpoint handler
function getJsonFormatedData(req, res) {
  // secreates demonstaration using the .env file
  if(process.env.MESSAGE_STYLE == 'uppercase'){
    jsonResponse = 'Hello json'.toUpperCase()
  }
  // secreates demonstaration using the .env file
  else if (process.env.MESSAGE_STYLE == 'lowercase') {
    jsonResponse = 'Hello json'.toLowerCase()
  }
  else {
    jsonResponse = 'Hello json'
  }
  res.json({"message": jsonResponse,
           "desription": "express training from free code camp",
           //"req": req,
           //"res": res
           });
}

// serve JSON from method to the /json path
app.get('/json', getJsonFormatedData);

// Get Route Parameter Input from the Client
// the echo server handler
function sendEcho(req, res, next) {
  // Eg. https://boilerplate-express.fisseha-estifan.repl.co/freecodecamp/echo
  // will return: {
  // "echo": "freecodecamp"
  //  }
  // get the word to echo
  wordToEcho = req.params.word
  // send the json formated response 
  // echo using the res.json function
  res.json({echo: wordToEcho})
}

// the echo server endpoint
app.get("/:word/echo", sendEcho);


// mount the body parser, both for JSON and default string
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// the get query string parameter handler
function queryStringHandlerGet(req, res, next) {
  fname = req.query.first;
  lname = req.query.last;
  res.json({ name: '' + fname + ' ' + lname,
             response: 'GET'});
}

// the post query string parameter handler
function queryStringHandlerPost(req, res, next) {
  fname = req.body.first;
  lname = req.body.last;
  res.json({ name: '' + fname + ' ' + lname,
             response: 'POST'});
}

// get query string parameter from the client end point
// both for the get and post requestes chained into one
// line of command
app.route("/name").get(queryStringHandlerGet).post(queryStringHandlerPost);

// serve HTML file from views folder
app.get("/", function(req, res) {
  //console.log(req, res)
  res.sendFile(indexHtmlAbsolutePath);
})



































 module.exports = app;
