"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */

var http = require('http');
var fs = require('fs');
var port = 3000;

var chess = fs.readFileSync('images/chess.jpg');
var fern = fs.readFileSync('images/fern.jpg');

function serveImage(filename, req, res){
	fs.readFile('images/' + filename, function(err, body){
		if(err){
			console.error(err);
			res.statusCode = 500;
			res.statusMessage = "whoops";
			res.end("Silly me");
			return;
		}
	res.setHeader("Content-Type", "image/jpeg");
	res.end(body);	
});

}

var server = http.createServer(function(req, res) {

		switch(req.url){
			case "/chess":
				res.end(chess);
				//serveImage('chess.jpg', req, res);
				break;
			case "/ace":
				res.end(ace);
				//serveImage('ace.jpg', req, res);
				break;
			case "/bubble":
				res.end(bubble);
				//serveImage('bubble.jpg', req, res);
				break;
			case "/mobile":
				res.end(mobile);
				//serveImage('mobile.jpg', req, res);
				break;
			case "/fern":
			case "/fern/":
			case "/fern.jpg":
			case "/fern.jpeg":
				res.end(fern);
				//serveImage('fern.jpg', req, res);
				break;
			default:
				res.statusCode = 404;
				res.statusMessage = "Not found";
				res.end();
		}

	});
 
server.listen(port, ()=>{
	console.log("Listening on port" + port);
})
