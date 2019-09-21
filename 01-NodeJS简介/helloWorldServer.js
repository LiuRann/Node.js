var http = require('http');
var server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-type':'text/html'});
    res.write("hello world");
    res.end();
}).listen(8080);
