//Requires node.js
//Deployment Code:

var path = require('path');
var fs = require('fs');
const readline = require('readline');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var bookContract;

var _parentAddress = '0x41Ea336a5b7Dd1b4Fc71E837c23349C17A87f6E6';
var _senderAddress = '0x96164079bf312E80e061b226ccF27f143cf3f3ff';
var _parentABI = [{"name": "Donation", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "int128", "name": "_value", "indexed": false}, {"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "BookUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "TextUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "getBookAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 672}, {"name": "addBook", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "bookAddress"}], "constant": false, "payable": false, "type": "function", "gas": 21976}, {"name": "getAuthorAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "authorID"}], "constant": true, "payable": false, "type": "function", "gas": 732}, {"name": "addAuthor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "authorAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22036}, {"name": "getSubjectAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "subjectID"}], "constant": true, "payable": false, "type": "function", "gas": 792}, {"name": "getLoCAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "LoCID"}], "constant": true, "payable": false, "type": "function", "gas": 822}, {"name": "__init__", "outputs": [], "inputs": [{"type": "address[3]", "name": "_foundationAddresses"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeFoundationAddresses", "outputs": [], "inputs": [{"type": "int128", "name": "index"}, {"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22280}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 41411}, {"name": "donateWithDifferentDonor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}, {"type": "address", "name": "donorAddress"}], "constant": false, "payable": true, "type": "function", "gas": 41386}, {"name": "setUpdateAddress", "outputs": [], "inputs": [{"type": "address", "name": "newUpdateAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22039}, {"name": "setTextAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "textAddress"}], "constant": false, "payable": false, "type": "function", "gas": 6101}, {"name": "setExpansionAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 4781}, {"name": "foundationAddresses", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1060}, {"name": "updateAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 873}, {"name": "updatedContract", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 903}, {"name": "books", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1122}, {"name": "authors", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1152}, {"name": "subjects", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1182}, {"name": "LoC", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1212}];

var libraryContract = new web3.eth.Contract(_parentABI, _parentAddress);

//CHANGE BOOK ID HERE |							<--------
var bookID = 1;//<----/        <------
//DON'T FORGET MOTHERFUCKER				<-----

var fileLoc = '/Users/us.tropers/Desktop/gutenbergNoSubs/' + bookID.toString + '/';

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
var zbExtension = '.zb';
var zbFiles = files.filter(function(file) {
	return path.extname(file).toLowerCase() === abiExtension;
});

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
		deployContract();																		
	});
}


function deployContract(index){
	web3.eth.personal.unlockAccount(_senderAddress, _password);
	var currentContract = new web3.eth.Contract(abiFiles[0]);
	var gasEstimate;
	if(zbFiles.length == 1){
		currentContract.deploy({
			data: byteFiles[0],
			arguments: [_parentAddress]
		})
		.estimateGas(function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
		}).then(function(){
			currentContract.deploy({
				data: byteFiles[0],
				arguments: [_parentAddress]
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
				bookContract = new web3.eth.Contract(abiFiles[0], receipt.contractAddress);
				addBookToLibrary(receipt.contractAddress);
			});
		});
	}
	else{
		currentContract.deploy({
			data: byteFiles[0],
			arguments: [_parentAddress, _senderAddress]
		})
		.estimateGas(function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
		}).then(function(){
			currentContract.deploy({
				data: byteFiles[0],
				arguments: [_parentAddress, _senderAddress]
			})
			.send({
				from: _senderAddress,
				gas: gasEstimate,
			},
			function(error, transactionHash){})
			.on('error', function(error){ console.log('Error: ' + error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
				zipsStored++;
				console.log('Stored book at address: ' + receipt.contractAddress);
				bookContract = new web3.eth.Contract(abiFiles[0], receipt.contractAddress);
				addZips(receipt.contractAddress, 0);
			});
		});
	}
}

var zipsStored = 0;

function addZips(address, fileIndex){
	if (index+1 != zbFiles.length) {
		web3.eth.personal.unlockAccount(_senderAddress, _password);
		var currentCall = bookContract.methods.setZipBytes(fileIndex, zbFiles[fileIndex]);
		var gasEstimate;
		currentCall.estimateGas({from: _senderAddress}, function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
		}).then(function(){
			currentCall.send({from: _senderAddress, gas: gasEstimate})
			.on('error', function(error){ console.log('Error: ' + error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
				console.log('Stored zb file ' + fileIndex);
				zipsStored++;
			})
			addZips(receipt.contractAddress, fileIndex+1);
		});
	}
	else {
		waitThenUpdateLibrary();
	}
}

var updated = 0;
var updatedLib = false;

function updateLibrary(){
	web3.eth.personal.unlockAccount(_senderAddress, _password);
	var currentCall = parentContract.methods.setTextAddress(bookID, bookContract.address);
	var gasEstimate;
	currentCall.estimateGas({from: _senderAddress}, function(err, gas){
		console.log('Gas Estimate: ' + gas);
		gasEstimate = gas;
	}).then(function(){
		currentCall.send({from: _senderAddress, gas: gasEstimate})
		.on('error', function(error){ console.log('Error: ' + error); })
		.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
		.on('receipt', function(receipt){
			updated = true;
		})
		waitThenDone();
	});
}

function waitThenUpdateLibrary(){
	web3.eth.personal.unlockAccount(_senderAddress, _password);
	if (updated == zbFile.length){
		updateLibrary;
	} else {
		setTimeout(function(){waitThenUpdateLibrary();}, 100);
	}
}

function waitThenDone(){
	if (updatedLib){
		console.log('Done!!!')
	} else {
		setTimeout(function(){waitThenDone();}, 100);
	}
}

var _password

prepFile();