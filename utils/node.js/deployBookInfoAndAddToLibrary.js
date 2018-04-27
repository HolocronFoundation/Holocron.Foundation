//Requires node.js
//Deployment Code:

var path = require('path');
var fs = require('fs');
const readline = require('readline');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var _parentAddress = '0x7c42F6386E2693F413dd8F09AF1e34D7b5De104B';
var _senderAddress = '0x96164079bf312E80e061b226ccF27f143cf3f3ff';
var _parentABI = [{"name": "Donation", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "int128", "name": "_value", "indexed": false}, {"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "BookUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "TextUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "getBookAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 672}, {"name": "addBook", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "bookAddress"}], "constant": false, "payable": false, "type": "function", "gas": 21976}, {"name": "getAuthorAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "authorID"}], "constant": true, "payable": false, "type": "function", "gas": 732}, {"name": "addAuthor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "authorAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22036}, {"name": "getSubjectAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "subjectID"}], "constant": true, "payable": false, "type": "function", "gas": 792}, {"name": "getLoCAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "LoCID"}], "constant": true, "payable": false, "type": "function", "gas": 822}, {"name": "__init__", "outputs": [], "inputs": [{"type": "address[3]", "name": "_foundationAddresses"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeFoundationAddresses", "outputs": [], "inputs": [{"type": "int128", "name": "index"}, {"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22280}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 41411}, {"name": "donateWithDifferentDonor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}, {"type": "address", "name": "donorAddress"}], "constant": false, "payable": true, "type": "function", "gas": 41386}, {"name": "setUpdateAddress", "outputs": [], "inputs": [{"type": "address", "name": "newUpdateAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22039}, {"name": "setTextAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "textAddress"}], "constant": false, "payable": false, "type": "function", "gas": 6101}, {"name": "setExpansionAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 4781}, {"name": "foundationAddresses", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1060}, {"name": "updateAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 873}, {"name": "updatedContract", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 903}, {"name": "books", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1122}, {"name": "authors", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1152}, {"name": "subjects", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1182}, {"name": "LoC", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1212}];

var parentContract = new web3.eth.Contract(_parentABI, _parentAddress);

var fileLoc = '/Users/us.tropers/Desktop/Formatted for Upload/BookInfo/0/';

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

var deploymentArr = [];
var searchStr = 'bookInfoContract';

function prepFile(index){
	if (index != byteFiles.length){
		var entry = [];
		console.log(byteFiles[index]);
		console.log((byteFiles[index].slice(0, -10)).slice(16));
		entry.push((byteFiles[index].slice(0, -10)).slice(16));
		fs.readFile(fileLoc + byteFiles[index], 'utf-8', function(err, data){
			entry.push(data.slice(0, data.length-1));
			fs.readFile(fileLoc + abiFiles[index], 'utf-8', function(err, data2){
				entry.push(JSON.parse(data2));
				deploymentArr.push(entry);
				prepFile(index + 1);
			});
		});
	}
	else {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		rl.question('Input password: ', (answer) => {
			deployContracts(answer);
			rl.close();
		});
	}
}

deployedArr = [];

function deployContract(index){
	if (index != deploymentArr.length){
		web3.eth.personal.unlockAccount(_senderAddress, _password);
		var currentContract = new web3.eth.Contract(deploymentArr[index][2]);
		var gasEstimate;
		currentContract.deploy({
			data: deploymentArr[index][1],
			arguments: [_parentAddress]
		})
		.estimateGas(function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
		}).then(function(){
			currentContract.deploy({
				data: deploymentArr[index][1],
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
				console.log('Id: ' + deploymentArr[index][0] + ', Address: ' + receipt.contractAddress); // contains the new contract address
				var done = [];
				done.push(deploymentArr[index][0]);
				done.push(receipt.contractAddress);
				deployedArr.push(done);
			});
			deployContract(index + 1);
		});
	}
	else {
		waitThenUpdate();
	}
}

function waitThenUpdate(){
  if (deployedArr.length == deploymentArr.length){
    console.log(deployedArr);
	updateLibrary(0);
  } else {
    setTimeout(function(){waitThenUpdate()}, 100);
  }
}

var updated = 0;

function getCallStackSize() {
    var count = 0, fn = arguments.callee;
    while ( (fn = fn.caller) ) {
        count++;
    }
    return count;
}

function updateLibrary(index){
	if (index != deployedArr.length) {
		web3.eth.personal.unlockAccount(_senderAddress, _password);
		var currentCall = parentContract.methods.addBook(deployedArr[index][0], deployedArr[index][1]);
		var gasEstimate;
		currentCall.estimateGas({from: _senderAddress}, function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
		}).then(function(){
			currentCall.send({from: _senderAddress, gas: gasEstimate})
			.on('error', function(error){ console.log('Error: ' + error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
				console.log('Logged book with id: ' + deployedArr[index][0] + ', at address: ' + deployedArr[index][1]);
				updated += 1;
			});
			updateLibrary(index + 1);
		});
	}
	else {
		waitThenDone();
	}
}

function waitThenDone(){
  if (updated == deployedArr.length){
    console.log('Well we did it....');
  } else {
    setTimeout(function(){waitThenDone()}, 100);
  }
}

var _password;

function deployContracts(pw) {
	_password = pw;
	web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
		deployContract(0);
	});
}

prepFile(0);