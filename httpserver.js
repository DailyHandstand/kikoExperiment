var vertx = require('vertx/http');
var console = require('vertx/console');

console.log("hello server");


/**
  Create an HttpServer to server static web pages so we no longer have to load the from the local file system.
  This should finally eliminate the CORS issue!!
*/
vertx.createHttpServer().requestHandler(function(req) {

  console.log("responding to static content request: " + req.path());

  var webRoot = '/Users/ifollend/tddTraining/tddjs/source/KikoExperiment3/';

  if (req.path().indexOf('/data') < 0) {
    // Send the file back based on webRoot and the path requested
    req.response.sendFile(webRoot + req.path());
  } else {
    console.log("responding to data request: " + req.path());

    // Create the HttpClient to call out to catalog
    var client = vertx.createHttpClient().port(80).host("catalog.lv3.hbogo.com");

    // Call the landing service and return it in the response
    client.getNow('/apps/mediacatalog/rest/landingService/HBO/landing/DO', function(resp) {
      resp.bodyHandler(function(body) {
        console.log('The total body received was ' + body.length() + ' bytes');

        req.response.end(body);
      });

    });
  }

}).listen(8080, "localhost", function(err) { // Add a callback to confirm the server is listenting
    if (!err) {
        console.log("Listen succeeded! on 8080");
    }
  }
);


/**
  Create an HttpServer that is a HttpClient to catalog to actually get the data.
  This server sets the Access-Control-Allow-Origin header so the browser doesn't have to worry about CORS
*/
vertx.createHttpServer().requestHandler(function(req, landingPage) {


}).listen(8085, "localhost", function(err) { // Add a callback to confirm the server is listenting
    if (!err) {
        console.log("Listen succeeded! on 8085");
    }
  }
);

