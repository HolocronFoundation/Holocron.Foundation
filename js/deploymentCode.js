//Requires node.js
//Deployment Code:

var path = require('path');

var byteExtension = '.byte';

var contractDeploymentArray = [];
var byteFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === byteExtension;
});

var abiExtension = '.abi';
var abiFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === abiExtension;
});

var deploymentArr = [];
var searchStr = 'vyperOutput.v.py'
for (var item in byteFiles){
	var entry = [];
	entry.push(item.slice(item.search(searchStr)));
	entry.push(item);
	//entry.push(
	deploymentArr.push(entry)
}