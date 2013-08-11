load ('vertx.js')
load ('/Users/ifollend/tddTraining/tddjs/source/KikoExperiment/jquery.js')

vertx.createHttpServer().requestHandler(function(req) {
            var webroot = '/Users/ifollend/tddTraining/tddjs/';
                                        
                                        
                                        req.response.putHeader("Access-Control-Allow-Origin", "*");
                                        $.get("http://catalog.lv3.hbogo.com/apps/mediacatalog/rest/landingService/HBO/landing/DO", function(data) {
                                              var returnHtml = "";
                                              var sections = $(data).find("sectionContentResponses");
                                              $(sections).each( function(index) {
                                                               var titleText = ($(this).find("title"))[0].textContent;
                                                               
                                                               var images = $(this).find("resourceUrl");
                                                               $(images).each( function(index) {
                                                                              var imageUrl = $(images)[index].textContent;
                                                                              if ( ( imageUrl.indexOf("default") <= 0 ) && ( imageUrl.indexOf("754x424") >= 0 ) ) {
                                                                              returnHmtl = returnHtml + "<img src=" + imageUrl + " title= \"" + titleText + "\"\/>";
                                                                              };
                                                                              });
                                                               
                                                               
                                                               });
                                              
                                              });
                                        req.response.write(returnHtml);

                                        
        }).listen(8080, "localhost");

function comments() {
    var file = webroot + req.path;
    if (file.indexOf('.js') > 0) {
        req.response.putHeader("Content-type", "application/json").putHeader("Access-Control-Allow-Origin", "*");
    }
    file = req.path === '/' ? 'index.html' : req.path;
    req.response.sendFile('/Users/ifollend/tddTraining/tddjs/source/KikoExperiment/sampleclient.html');

}
