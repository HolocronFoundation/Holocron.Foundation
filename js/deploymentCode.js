//Requires node.js
//Deployment Code:

var path = require('path');
var fs = require('fs');

var contractDeploymentArray = [];

//need to create files var
var files = fs.readdirSync('C:/Users/Sam Troper/Desktop/Holocron/www/py/vyperFilesGenerated');

var byteExtension = '.byte';
var byteFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === byteExtension;
});

var abiExtension = '.abi';
var abiFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === abiExtension;
});

//Check to make sure items are the same length
if (byteFiles.length != abiFiles.length) {
	console.log('Fuck!!!');
}
else {
	console.log('Good');
}

var deploymentArr = [];
var searchStr = 'vyperOutput.v.py';
var length = byteFiles.length;


for (var i = 0; i < length; i++){
	var entry = [];
	entry.push(byteFiles[i].slice(item.search(searchStr)));
	entry.push(byteFiles[i]);
	entry.push(abiFiles[i]);
	deploymentArr.push(entry);
	console.log(entry);
}