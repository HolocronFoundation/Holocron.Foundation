//Requires node.js
//Deployment Code:

var path = require('path');
var fs = require('fs');
const readline = require('readline');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var _parentAddress = '0x240Ffc557848b5a28bB2df8370B35e7a1B35797D';
var _senderAddress = '0x8378C65a0c83675AcF509fF3F9f48DEC7898EEbA';
var _parentABI = [{"name": "Donation", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "int128", "name": "_value", "indexed": false}, {"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "BookUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "TextUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "getTextAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 672}, {"name": "getBookAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 702}, {"name": "addBook", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "bookAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22006}, {"name": "getAuthorAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "authorID"}], "constant": true, "payable": false, "type": "function", "gas": 762}, {"name": "addAuthor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "authorAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22066}, {"name": "getSubjectAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "subjectID"}], "constant": true, "payable": false, "type": "function", "gas": 822}, {"name": "getLoCAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "LoCID"}], "constant": true, "payable": false, "type": "function", "gas": 852}, {"name": "__init__", "outputs": [], "inputs": [{"type": "address[3]", "name": "_foundationAddresses"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeFoundationAddresses", "outputs": [], "inputs": [{"type": "int128", "name": "index"}, {"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22310}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 41441}, {"name": "donateWithDifferentDonor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}, {"type": "address", "name": "donorAddress"}], "constant": false, "payable": true, "type": "function", "gas": 41416}, {"name": "setUpdateAddress", "outputs": [], "inputs": [{"type": "address", "name": "newUpdateAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22069}, {"name": "setTextAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "_textAddress"}], "constant": false, "payable": false, "type": "function", "gas": 26206}, {"name": "setExpansionAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 4811}, {"name": "withdrawFunds", "outputs": [], "inputs": [{"type": "int128", "name": "bookID"}, {"type": "address", "name": "withdrawalAddress"}, {"type": "int128", "name": "withdrawal"}], "constant": false, "payable": false, "type": "function", "gas": 37445}, {"name": "setMaxIndex", "outputs": [], "inputs": [{"type": "int128", "name": "_maxIndex"}], "constant": false, "payable": false, "type": "function", "gas": 22240}, {"name": "foundationAddresses", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1150}, {"name": "maxIndex", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 963}, {"name": "updateAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 993}, {"name": "updatedContract", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1023}, {"name": "books", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1242}, {"name": "textAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1272}, {"name": "authors", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1302}, {"name": "subjects", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1332}, {"name": "LoC", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1362}];

var parentContract = new web3.eth.Contract(_parentABI, _parentAddress);

var deployedArr = [[35, "0x2aa7fb2af298c46a6cc7a58d42928ca5dede3d99"],[36, "0xbb771306c56470d2bdb1914b6459608a13704c48"],[37, "0xcc0e3706781ca5d7b54abdcc2b3f6e8717be1df3"],[38,	"0xc47a8cd9c1c99264c122304c6f78944a36ef6931"],[41, "0x18057f7f4f841c62c0d15edabfc1733c0e7aa829"],[42, "0xe371d2ab1416154cfe4a4580dd993b0525d97b73"],[43, "0x180c130fd1891a4e84d227c416422f0d929848c1"],[44, "0x36602de8ecf819db1a49fa82d148a9c4e752e3b2"],[45,	"0xfe877ec41030e4f8bb7a348a48f43f656eb1e59c"],[46, "0xd806f05dac8c9fbe2f099c8422645f65830f6da7"]];
				   
				   
//,[18 "0x4BF3250b470d1a2Ad3fF9b78F8F6F02eCFe741f1"],[19, "0x578f98932FC69A1981AF9BE09de8078f8F75e7c2"],[20, "0xa684FfE1C136F117096202fFbac73290dE781C68"],[21, "0xa75070DEd12A2B0803b48b2130C1D46c54B31AAF"],[22, "0x04Ca5Ff7A5641DB00Ee9DB42211B940ece1bFFD2"],[23, "0x5282C75Ca20C9c26626523d67976eDBA26c62E26"],[24, "0x0F96F5C9e4720Eeb684f5F69451EDAf7A7910A48"],[25, "0x8017a78228fe2610902AD86Ca0B487dE803bDC09"],[26, "0x117d73B9446084A8552d2c5A07A321C9A51fA22B"],[27, "0xd2AD6B9A011081De834D0488fC6Fd6FceE669277"],[28, "0x3dcCfB6bF2EBEF397EE9780944A24493eB1712f6"],[29, "0x004b4B52CfEe137518c8033865B3837B760844D7"],[30, "0x1de5f81cf6db7c24679b49521d0c76302f5c4168"],[31, "0x9b941a9bfba785dcfc49018f55e809ca6582ef3d"],[32, "0x5e8f6ee5732932bc4369fa7116e88ff49da26e88"],[33, "0x486c3d951a4b921d2f95d1101776b781644286a4"],[35, "0x2aa7fb2af298c46a6cc7a58d42928ca5dede3d99"],[36, "0xbb771306c56470d2bdb1914b6459608a13704c48"],[37, "0xcc0e3706781ca5d7b54abdcc2b3f6e8717be1df3"],[38,	"0xc47a8cd9c1c99264c122304c6f78944a36ef6931"],[41, "0x18057f7f4f841c62c0d15edabfc1733c0e7aa829"],[42, "0xe371d2ab1416154cfe4a4580dd993b0525d97b73"],[43, "0x180c130fd1891a4e84d227c416422f0d929848c1"],[44, "0x36602de8ecf819db1a49fa82d148a9c4e752e3b2"],[45,	"0xfe877ec41030e4f8bb7a348a48f43f656eb1e59c"],[46, "0xd806f05dac8c9fbe2f099c8422645f65830f6da7"]];

var updated = 0;

function updateLibrary(index){
	if (index != deployedArr.length) {
		web3.eth.personal.unlockAccount(_senderAddress, _password).then(function(){
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
				updateLibrary(index + 1);
			});

		});
		})
	}
	if(index == 0){
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

const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
});

rl.question('Input password: ', (answer) => {
	_password = answer;
	updateLibrary(0);
	rl.close();
});