let express = require('express');
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

function getDateTimeNow()
  {
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
app.use("/", rootLevelLoggerMiddleware)

// add css to the express web application frame work and
// mount the css to the web applicatio frame work
app.use("/public", express.static(cssFolderAbsolutePath))


// adding a chained middleware as a time display
// on the 'now' route
app.get('/now', function chainedMiddleware(req, res, next) {
                  req.time = new Date().toString();
                  next();
                }, function middleHandler(req, res, next) {
                      console.log('middle handler: passing handle to final handle');
                      next();
                }, function finalHandler(req, res) {
                      res.json({time: req.time})
                      console.log('final handler: over and out')
                }
);


// serve JSON from method to the /json path
app.get('/json', function(req, res) {
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
});


// the echo server route endpoint
app.get("/:word/echo", function sendEcho(req, res, next) {
  // Eg. https://boilerplate-express.fisseha-estifan.repl.co/freecodecamp/echo
  // will return: {
  // "echo": "freecodecamp"
  //  }
  // get the word to echo
  wordToEcho = req.params.word
  // send the json formated response 
  // echo using the res.json function
  res.json({echo: wordToEcho})
});


// serve HTML file from views folder
app.get("/", function(req, res) {
  //console.log(req, res)
  res.sendFile(indexHtmlAbsolutePath);
})



































 module.exports = app;
