var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  //Takes current URl
  var parsedUrl = url.parse(request.url);

//Gives the response the JSON data only if it is a get request and the url is /listings
  if( parsedUrl.pathname == '/listings' && request.method == 'GET'){
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(listingData);
    //response.end();
  }
  else{
    //the 404 error will be sent with error text
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Bad gateway error');
    //response.end();
  }

};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable,
    then start the server.

   */

    //Check for errors
    if(err){
      throw err;
    }


   //Save the data in the listingData variable already defined
   listingData = data;

  //Creates the server
  var server = http.createServer(requestHandler);

  //Start the server
  server.listen(port, function() {
    //once the server is listening, this callback function is executed
    console.log('Server listening on: http://127.0.0.1:' + port);
  });

});
