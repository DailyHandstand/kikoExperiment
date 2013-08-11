var vertx = require('vertx/http');
var console = require('vertx/console');

console.log("hello server");

/**
  Create an HttpServer that is a HttpClient to catalog to actually get the data.
  This server sets the Access-Control-Allow-Origin header so the browser doesn't have to worry about CORS
*/
vertx.createHttpServer().requestHandler(function(req, landingPage) {

  console.log("responding");

  // Create the HttpClient to call out to catalog
  var client = vertx.createHttpClient().port(80).host("catalog.lv3.hbogo.com");

  // Call the landing service and return it in the response
  client.getNow('/apps/mediacatalog/rest/landingService/HBO/landing/DO', function(resp) {
    resp.bodyHandler(function(body) {
      console.log('The total body received was ' + body.length() + ' bytes');

      // Avoid the CORS problem with this accept-all header
      req.response.putHeader("Access-Control-Allow-Origin", "*");
      req.response.end(body);
    });

  });

}).listen(8080, "localhost", function(err) { // Add a callback to confirm the server is listenting
    console.log("listening...");
    if (!err) {
        console.log("Listen succeeded!");
    }
  }
);

