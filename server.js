"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */

var http = require('http');
var fs = require('fs');
var port = 3000;

var stylesheet = fs.readFileSync('gallery.css');

var imageNames = ['ace.jpg', 'chess.jpg', 'fern.jpg', 'mobile.jpg', 'bubble.jpg'];

var chess = fs.readFileSync('images/chess.jpg');
var fern = fs.readFileSync('images/fern.jpg');
var ace = fs.readFileSync('images/ace.jpg');
var mobile = fs.readFileSync('images/mobile.jpg');
var bubble = fs.readFileSync('images/bubble.jpg');

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
			case "/gallery":
				var gHtml = imageNames.map(function(fileName){
		 			return '<img src="'+ fileName +'" alt="a fishing ace at work">'
	 			}).join('');
				var html = '<!doctype html>';
					html += '<head>';
					html += 	'<title>Dynamic Page</title>';
					html += 	'<link href="gallery.css" rel="stylesheet" type="text/css">';
					html += '</head>';
					html += '<body>';
					html += '  <h1>Gallery</h1>';
					html += gHtml;
					html += '  <h1>Hello</h1> Time is ' + Date.now();
					html += '</body>';
				res.setHeader('Content-Type', 'text/html');
				res.end(html);
				break;
			case "/chess":
			case "/chess/":
			case "/chess.jpg":
			case "/chess.jpeg":
				res.end(chess);
				//serveImage('chess.jpg', req, res);
				break;
			case "/ace":
			case "/ace/":
			case "/ace.jpg":
			case "/ace.jpeg":
				res.end(ace);
				//serveImage('ace.jpg', req, res);
				break;
			case "/bubble":
			case "/bubble/":
			case "/bubble.jpg":
			case "/bubble.jpeg":
				res.end(bubble);
				//serveImage('bubble.jpg', req, res);
				break;
			case "/mobile":
			case "/mobile/":
			case "/mobile.jpg":
			case "/mobile.jpeg":
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
			case "/gallery.css":
				res.setHeader('Content-Type', 'text/css');
				res.end(stylesheet);
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
