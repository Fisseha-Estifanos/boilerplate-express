let express = require('express');
let app = express();
console.log("Hello World")
//app.get("/", function(req, res) {
//  res.send('Hello Express');
//})

// path for the views folder,
// contating html files
indexHtmlabsolutePath = __dirname + '/views/index.html'


// path for the css file
cssFolderAbsolutePath = __dirname + '/public'

// add css to the express web application frame work and
// mount the css to the web applicatio frame work
app.use('/public', express.static(cssFolderAbsolutePath))


// serve HTML file from views folder
app.get("/", function(req, res) {
  res.sendFile(indexHtmlabsolutePath);
})

// serve JSON from method to the /json path
app.get('/json', function(req, res){
  res.json({"message": "Hello json",
           "desription": "express training from free code camp"
           });
})




































 module.exports = app;
