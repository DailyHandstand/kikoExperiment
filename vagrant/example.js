var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  console.log('received request: ' + req.url);

  var webRoot = '/Users/ifollend/tddTraining/tddjs/source/kikoExperiment/';

  if (req.url.indexOf('/data') < 0) {
  	// Not data, so server static web page
  	console.log('serving static file');
    // Send the file back based on webRoot and the path requested
 //   res.writeHead(200, {'Content-Type': 'text/plain'});
    var fileIndex = fs.readFileSync(webRoot + req.url);
    res.end(fileIndex);

  } else {

  	 console.log('serving catalog data hello world');

  	// /data requested, so call out to catalog
  	http.get('http://catalog.hbogo.com/apps/mediacatalog/rest/landingService/HBO/landing/DO', function(getResponse) {
      var body;
      getResponse.on('data', function(chunk) {
//        console.log("BODY: " + chunk);
        body += chunk;
      });
      getResponse.on('end', function() {
        res.end(body);
      });
      getResponse.on('error', function(e) {
        console.log('ERROR: ' + e);
      });
//	  res.writeHead(200, {'Content-Type': 'text/plain'});
//	  res.end('Hello World\n');

  	}).on('error', function(e) {
      console.log('ERROR on GET: ' + e);
    });


  }
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
