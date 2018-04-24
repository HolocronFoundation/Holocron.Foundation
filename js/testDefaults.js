//Requires node.js with web3

var Web3 = require('web3');
const readline = require('readline');
var _parentAddress = '0xfeda81f064cb27c68e3906375aeb402429c138ee';
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var ABI = [{"name": "__init__", "outputs": [], "inputs": [{"type": "bytes", "name": "_cool"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "cool", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1428}];

var code = '0x600035601c52740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a05260206102776101403934156100a757600080fd5b6024602061027760c03960c05161027701610160396004602061027760c03960c0516004013511156100d857600080fd5b61016080600060c052602060c020602082510161010060006002818352015b8261010051602002111561010a5761012c565b61010051602002850151610100518501555b81516001018083528114156100f7575b50505050505061025f56600035601c52740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a05263dce5c75760005114156101275734156100ac57600080fd5b60008060c052602060c020610160602082540161010060006002818352015b826101005160200211156100de57610100565b61010051850154610100516020028501525b81516001018083528114156100cb575b50505050505060206101405260406101605160206001820306601f820103905001610140f3005b5b61013761025f0361013760003961013761025f036000f3';

function launchContract(password) {
	web3.eth.personal.unlockAccount(_parentAddress, password).then(function(){

		var currentContract = new web3.eth.Contract(ABI);
		var gasEstimate;

		currentContract.deploy({
			data: code
		})
		.estimateGas(function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
		}).then(function(){

			currentContract.deploy({
				data: libraryCode,
			})
			.send({
				from: _parentAddress,
				gas: gasEstimate,
				gasPrice: '30000000000000'
			},
			function(error, transactionHash){})
			.on('error', function(error){ console.log(error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
				console.log(receipt.contractAddress); // contains the new contract address
			})
			.on('confirmation', function(confirmationNumber, receipt){ })
			.then(function(newContractInstance){
				newContractInstance.methods.cool().call().then(function(err, dat){
					console.log('default');
					console.log(dat);
				});
			});
		});
		currentContract.deploy({
			data: code,
			arguments: 'fuck'
		})
		.estimateGas(function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
		}).then(function(){
			currentContract.deploy({
				data: code,
				arguments: 'fuck'
			})
			.send({
				from: _parentAddress,
				gas: gasEstimate,
				gasPrice: '30000000000000'
			},
			function(error, transactionHash){})
			.on('error', function(error){ console.log(error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
				console.log(receipt.contractAddress); // contains the new contract address
			})
			.on('confirmation', function(confirmationNumber, receipt){ })
			.then(function(newContractInstance){
				newContractInstance.methods.cool().call().then(function(err, dat){
					console.log('custom');
					console.log(dat);
				});
			});
		});
	});
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input password: ', (answer) => {
	launchContract(answer);
	rl.close();
});