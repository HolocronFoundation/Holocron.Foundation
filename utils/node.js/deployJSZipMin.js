//Requires node.js
//Deployment Code:

var path = require('path');
var fs = require('fs');
const readline = require('readline');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var totalGas = 0;
var bookAddress;
var _senderAddress = '0x8378C65a0c83675AcF509fF3F9f48DEC7898EEbA';


var fileLoc = '/Users/us.tropers/Desktop/prepped/main/';

//need to create files var
var files = fs.readdirSync(fileLoc);

//gets byte files
var byteExtension = '.byte';
var byteFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === byteExtension;
});

//gets abi files
var abiExtension = '.json';
var abiFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === abiExtension;
});

//gets zip bytes files
var zbExtension = '.jsb';
var zbFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === zbExtension;
});

console.log(zbFiles);

var abiFile;



function prepFile(){
	
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.question('Input password: ', (answer) => {
		deployContract(answer);
		rl.close();
	});
}

function deployContract(password){
	_password = password;
	web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
		deployBookContract();																		
	});
}

var deployed = false;

function deployBookContract(){
	web3.eth.personal.unlockAccount(_senderAddress, _password);
	var currentContract = new web3.eth.Contract(abiFile);
	var gasEstimate;
	if(zbFiles.length == 1){
		currentContract.deploy({
			data: byteFile,
		})
		.estimateGas(function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
			totalGas += gas;
		}).then(function(){
			currentContract.deploy({
				data: byteFile,
			})
			.send({
				from: _senderAddress,
				gas: gasEstimate,
			},
			function(error, transactionHash){})
			.on('error', function(error){ console.log('Error: ' + error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
				console.log('Stored book at address: ' + receipt.contractAddress);
				bookAddress = receipt.contractAddress;
				deployed = true;
				web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
				web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
					updateLibrary();
				});
			});
		});
	}
	else{
		currentContract.deploy({
			data: byteFile,
			arguments: [_senderAddress]
		})
		.estimateGas(function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
			totalGas += gas;
		}).then(function(){
			currentContract.deploy({
				data: byteFile,
				arguments: [_senderAddress]
			})
			.send({
				from: _senderAddress,
				gas: gasEstimate,
			},
			function(error, transactionHash){})
			.on('error', function(error){ console.log('Error: ' + error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
				bookAddress = receipt.contractAddress;
				console.log('Stored book at address: ' + receipt.contractAddress);
				deployed = true;
				web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
				web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
					addZips(bookAddress, 0);
				});
			});
		});
	}
}

var zipsStored = 0;

function addZips(address, fileIndex){
	if (fileIndex+1 != zbFiles.length) {
		web3.eth.personal.unlockAccount(_senderAddress, _password);
		var currContract = new web3.eth.Contract(abiFile, address);
		var currCall = currContract.methods.setjsBytes(fileIndex, processedFiles[fileIndex]);
		var gasEstimate;
		currCall.estimateGas({from: _senderAddress}, function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
			totalGas += gas;
		}).then(function(){
			currCall.send({from: _senderAddress, gas: gasEstimate})
			.on('error', function(error){ console.log('Error: ' + error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
				console.log('Stored zb file ' + fileIndex);
				zipsStored++;
			})
			waitThenStoreMore(address, fileIndex+1)
		});
	}
	else {
		console.log('Done, stored at: ' + bookAddress);
	}
}

function waitThenStoreMore(address, nextIndex){
	if (zipsStored == nextIndex){
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
			addZips(address, nextIndex);
		});
	} else {
		setTimeout(function(){waitThenStoreMore(address, nextIndex);}, 100);
	}
}


function waitThenAddZips(){
	web3.eth.personal.unlockAccount(_senderAddress, _password);
	if (!deployed){
		setTimeout(function(){waitThenAddZips();}, 100);
	}
}

function waitThenUpdateLibrary(){
	web3.eth.personal.unlockAccount(_senderAddress, _password);
	if (zipsStored == zbFiles.length){
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
			updateLibrary();
		});
	} else {
		setTimeout(function(){waitThenUpdateLibrary();}, 100);
	}
}

var _password
var byteFile;
var processedFiles = [];

function processZB(index){
	if(index < zbFiles.length){
		fs.readFile(fileLoc + zbFiles[index], function(err, data){
			var result = '0x' + data.toString('hex');
			processedFiles.push(result);
			processZB(index+1);
		});
	}
	else{
		proceed();
	}
}

function proceed(){
	fs.readFile(fileLoc + byteFiles[0], 'utf-8', function(err, data){
		byteFile = data.trim();
		fs.readFile(fileLoc + abiFiles[0], 'utf-8', function(err, data2){
			abiFile = JSON.parse(data2);
			console.log(abiFile);
			prepFile();
		});
	});
}

processZB(0);