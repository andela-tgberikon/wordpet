global._ = require('lodash');
global.t = require('moment');
Firebase = require('firebase');

// Here I want to use the 3scale to expose my app's public API as a service.
// var ThreeScale = require('3scale').Client;
// // keep your provider key secret
// var client = new ThreeScale("b32b1c3fd27678d3e0b09eb6c4167c36");

var firebaseRef = require('./firebase-ref');
var bodyParser = require('body-parser');
var needle = require('needle');

function run(appdir) {
  var express = require('express');
  var app = express();

  app.dir = process.cwd();
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  // things to do on each request

  //This code block creates a backend route that the user posts to, the app then makes the API call and sends the result in JSON format to the user. the successful call would then send the result to firebase so that the user doesn't bugg the server with trivial requests.

  app.use(function(req, res, next) {
    // tell the client what firebase to use
    if (process.env.NODE_ENV === 'production') {
      res.cookie('rootRef', firebaseRef.prod);
    } else {
      // development mode
      res.cookie('rootRef', firebaseRef.dev);
      // log the request
      console.log(t().format('HH:MM'), req.method, '\n' + req.url, req.socket.bytesRead);
    }
    next();
  });

  // static files
  app.use(express.static(app.dir + '/public'));
  //handle all routes with frontend angular ui route
  app.get('/*', function(req, res) {
    res.sendFile('index.html', {
      root: './public/'
    });
  });
  // Standard error handling
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // Fire up server
  var server = app.listen(process.env.PORT || 5555, function() {
    console.log('Listening on port %d', server.address().port);
  });


  app.post('/findword', function(req, res) {
      //Inside here, when the user posts to the backend, the app then proceeds to make an app.get to the words API, possibly a needle.get() because it's way cooler! on success or error, it should send the result to the frontend. 'process worker/node clusters' should be utilised heavily here

      // This function saves the searched word to firebase, but a check would be performed in the front end to get the word from firebase, if it exists it would pull the word from firebase, if it doesn't it would post to the backend and node would make the API call.
      function saveToFirebase(word) {
        console.log(word);
        firebase = new Firebase(firebaseRef.prod);
        firebase.child('words').push(word);
      };

      var url = 'https://wordsapiv1.p.mashape.com/words/' + req.body.word;
      var options = {
        headers: {
          'X-Mashape-Key': '2uCGpQErvimshoZje9kdIyxYfZ5np1S8rShjsn96Kwo2GgeASC',
          'Accept': 'application/json'
        }
      };
      needle.get(url, options, function(err, resp) {
        if (resp.statusCode === 200) {
          console.log(resp.statusCode, 'this is statusCode');
          console.log(firebaseRef.prod, 'This is firebaseRef.prod');
          console.log(Firebase);
          saveToFirebase(resp.body);
          res.send(JSON.stringify(resp.body));
        } else {
          console.log('Yeet');
          console.log(resp.statusCode, ' This is the Error code');

          //send custom error page to user when word is not found on WordsAPI, instead of sending the error body.
          //res.send(resp.body);
        }
      });
    })
    .on('error', function(req, res) {
      console.log('this is a server error of : ', req.body);
    });
}

run(process.cwd());
