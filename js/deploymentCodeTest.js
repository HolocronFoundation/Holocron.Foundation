//Requires node.js
//Deployment Code:

var path = require('path');
var fs = require('fs');

var _parentAddress = //ADD ADDRESS HERE
var _senderAddress = //ADD ADDRESS HERE
var _parentABI = //ADD ABI HERE

var contractDeploymentArray = [];

//need to create files var
var files = fs.readdirSync('F:\Vyper Files\Small Working Files\info');

//gets byte files
var byteExtension = '.byte';
var byteFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === byteExtension;
});

//gets abi files
var abiExtension = '.abi';
var abiFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === abiExtension;
});


var deploymentArr = [];
var searchStr = 'vyperOutput.v.py';
var length = byteFiles.length;

//creates a deployment array
for (var i = 0; i < length; i++){
	var entry = [];
	entry.push(byteFiles[i].slice(item.search(searchStr)));
	entry.push(byteFiles[i]);
	entry.push(abiFiles[i]);
	deploymentArr.push(entry);
	console.log(entry);
}

var parentContract = web3.eth.contract(_parentABI, _parentAddress)

for (var j = 0; j < entry.length; j++) {
	var currentContract = web3.eth.contract(deploymentArr[j][2]);
	var deployment = currentContract.new(_parentAddress,{from:_senderAddress, gasPrice:'2', data:deploymentArr[j][1]}, function(e, contract){
		if(!e) {
			if(!contract.address) {
				console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
			}
			else {
				console.log("Contract mined! Address: " + contract.address);
      				console.log(contract);
				parentContract.addBook(deploymentArr[j][0], contract.address, {from:_senderAddress, gasPrice:'2'} function(e, result){
					if(!e) {
						if(!result.address){

						}
						else {
							console.log('Book added to library in transaction ' + result.address)
						}
					}
				);
			}
		}
	})
}

