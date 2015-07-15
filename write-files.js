var http = require('http') ;
var url = require('url') ;
var fs = require('fs') ;

if (process.env.VCAP_APP_PORT) { var port = process.env.VCAP_APP_PORT ;}
else { var port = 8080 ; }
var data = "" ;

writeServer = http.createServer(function (request, response) {
    data = "" ;
    rootCall = request.url.match(/([^&]+)/)[0] ;
    console.log("Recieved request for: " + rootCall) ;
    switch (rootCall) {
    case "/write":
	fs.writeFile("/tmp/write-files.log", "This is a string written by the write-files server", function(err) {
		if (err) {
		    console.log("ERROR: " + err);
		    data = "<p>ERROR: " + err + "<br>\n" ;
		} else {
		    data = "<p>OK, data written.\n" ; 
		}
		response.end(data + '\n') ;
	    }) ;
	break ;
    case "/read":
	fs.readFile("/tmp/write-files.log", function(err, contents) {
		if (err) {
		    console.log(err) ;
		    data = "<p>ERROR: " + err + "<br>\n" ;
		} else {
		    data = "<p>Contents of file are: <br>\n" + contents + "\n\n<p>EOF\n" ;
		}
		response.end(data + '\n') ;
	    }) ;
	break ;
    case "/favicon.ico":
	break ;
    default:
	data = "<h1>A Top-Level Page</h1>\n" ;
    }

    // console.log("Time to return a web page.\nData contents are:\n" + data + "\n") ;
    }) ;

writeServer.listen(port) ;
console.log("Server up and listening on port: " + port) ;
