var http = require("http")
var fs = require('fs');

http.createServer(function (request, response) {
    var img = fs.readFileSync('./static/images/logo-jewel.png');

    response.writeHeader(200, {"Content-Type": "image/png"});
    response.end(img);

}).listen(8000);

console.log("Server is running at: http://localhost:8000/");
