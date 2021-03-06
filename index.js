
import * as api from 'api/handler';

export function run(appdir) {
  //start the server
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var cowsay = require('cowsay');
  app.dir = appdir;


  var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
   
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
  };
   
  // enable CORS!
  app.use(enableCORS);
  app.use(express.static(app.dir));
  app.use(bodyParser.json());
  
  app.set('port', (process.env.PORT || 5000));

  app.all('/api/:call/:mod*?', function(request, response) {
    //call the api handle function to handle the call. return responses where needed 
    api.handle(request).then(function(result) {
      response.status(200).json(result);
    }, function(err) {
      response.status(400).json({ err: err.message});
    });
      
  });

  app.listen(app.get('port'), function() {
    console.log('Up and running on all cylinders');
    console.log(cowsay.say({ text: 'mooooooo'}));
  });

}


