"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
 
 var http = require('http');
 var url = require('url');
 var fs = require('fs');
 var port = 3000;
 /*var defaultConfig = {
 	title: "Gallery"
 }*/
 var config = JSON.parse(fs.readFileSync('config.json')/* || defaultConfig*/);

 var stylesheet = fs.readFileSync('gallery.css');
 var imageNames = ['images/ace.jpg', 'bubble.jpg', 'chess.jpg', 'fern.jpg', 'mobile.jpg'];
 
 function getImageNames(callback) {
	 fs.readdir('images/', function(err, fileNames) {
		 if(err) callback(err, undefined);
		 else callback(false, fileNames);
		 
	 });
 }
 
 function imageNamesToTags(fileNames) {
	return fileNames.map(function(fileName) {
		 return `<img src="${fileName}" alt="${fileName}">`;
	 });
	 
 }
 
 function buildGallery(imageTags) {
	var html = '<!doctype html>';
		html += '<head>';
		html += 	'<title>' + config.title + '</title>';
		html += 	'<link href="gallery.css" rel="stylesheet" type="text/css">';
		html += '</head>';
		html += '<body>';
		html += 	'<h1>' + config.title + '</h1>';
		html += '<form>';
		html += 	'<input type="text" name="title">';
		html += 	'<input type="submit" value="Change Gallery Title">'
		html += '</form>'
		html += imageNamesToTags(imageTags).join('');
		html += '<form action="" method="POST">';
		html += 	'<input type="file" name="image">';
		html += 	'<input type="submit" value="Upload image">';
		html += '  <h1>Hello</h1> Time is ' + Date.now();
		html += '</body>';
	return html;
 }
 
 function serveGallery(req,res) {
	 getImageNames(function(err, imageNames) {
		if(err) {
			console.error(err);
			res.statusCode = 500;
			res.statusMessage = 'Server error';
			res.end();
			return;
		} 
		res.setHeader('Content-Type', 'text/html');
		res.end(buildGallery(imageNames));
	});
 }
 
  function serveImage(filename, req, res) {
	fs.readFile('images/' + filename, function(err, body){
		if(err) {
			console.error(err);
			res.statusCode = 404;
			res.statusMessage = "Resource not found";
			res.end("Silly me, I made a mistake!" + filename);
			return;
		}
	res.setHeader("Content-Type", "image/jpeg");
	res.end(body); 
	});
 }

 function uploadImage(req, res) {
 	var body='';
 	req.on('error', function(){
 		req.statusCode = 500;
 		res.end();
 	});
 	req.on('data', function(data){
 		body += data;
 	});
 	req.on('end', function(){
 		fs.writeFile('filename', data, function(err){
 			if(err){
 				console.error(err);
 				res.statusCode = 500;
 				res.end();
 				return;
 			}
 			serveGallery(req,res);
 		});
 	});
 }
 
 var fern = fs.readFileSync('images/fern.jpg');
 var chess = fs.readFileSync('images/chess.jpg');
 var mobile = fs.readFileSync('images/mobile.jpg');
 var ace = fs.readFileSync('images/ace.jpg');
 var bubble = fs.readFileSync('images/bubble.jpg');
 
 var server = http.createServer(function(req, res) {
 	// at most, the url should have two parts - 
 	// a resource and a querystring separated by a ?
 	//var url = req.url.split('?');
 	var urlParts = url.parse(req.url);
 	//var resource = url[0];
 	//var queryString = decodeURIComponent(url[1]);

 	if(urlParts.query){
 		// javascript regular expression
		var matches = /title=(.+)($|&)/.exec(urlParts.query);	
		if(matches && matches[1]){
			config.title = decodeURIComponent(matches[1]);
			fs.writeFile('config.json', JSON.stringify(config));
		}
 	}



	switch(urlParts.pathName){
	 case '/':
	 case '/gallery':
	 if(req.method == 'GET') {
	 	serveGallery(req,res);
	 } else if(req.method == 'POST'){
	 	uploadImage(req,res);
	 }
		//serveGallery(req, res);
		break;
	 case '/gallery.css':
		res.setHeader('Content-Type', 'text/css');
		res.end(stylesheet);
		break;
	 default:
	 serveGallery(req, res);
	 //serveImage(req.url, req, res);
	}
 });
 
 
  

  server.listen(port, function(){
	console.log("Server is listening on port " + port);
 });