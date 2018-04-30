//Requires node.js with web3

var Web3 = require('web3');
const readline = require('readline');
var _parentAddress = '0x8378C65a0c83675AcF509fF3F9f48DEC7898EEbA';
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var libraryABI = [{"name": "Donation", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "int128", "name": "_value", "indexed": false}, {"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "BookUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "TextUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "getTextAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 672}, {"name": "getBookAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 702}, {"name": "addBook", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "bookAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22006}, {"name": "getAuthorAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "authorID"}], "constant": true, "payable": false, "type": "function", "gas": 762}, {"name": "addAuthor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "authorAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22066}, {"name": "getSubjectAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "subjectID"}], "constant": true, "payable": false, "type": "function", "gas": 822}, {"name": "getLoCAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "LoCID"}], "constant": true, "payable": false, "type": "function", "gas": 852}, {"name": "__init__", "outputs": [], "inputs": [{"type": "address[3]", "name": "_foundationAddresses"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeFoundationAddresses", "outputs": [], "inputs": [{"type": "int128", "name": "index"}, {"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22310}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 41441}, {"name": "donateWithDifferentDonor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}, {"type": "address", "name": "donorAddress"}], "constant": false, "payable": true, "type": "function", "gas": 41416}, {"name": "setUpdateAddress", "outputs": [], "inputs": [{"type": "address", "name": "newUpdateAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22069}, {"name": "setTextAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "_textAddress"}], "constant": false, "payable": false, "type": "function", "gas": 26206}, {"name": "setExpansionAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 4811}, {"name": "withdrawFunds", "outputs": [], "inputs": [{"type": "int128", "name": "bookID"}, {"type": "address", "name": "withdrawalAddress"}, {"type": "int128", "name": "withdrawal"}], "constant": false, "payable": false, "type": "function", "gas": 37154}, {"name": "setMaxIndex", "outputs": [], "inputs": [{"type": "int128", "name": "_maxIndex"}], "constant": false, "payable": false, "type": "function", "gas": 22240}, {"name": "foundationAddresses", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1150}, {"name": "maxIndex", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 963}, {"name": "updateAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 993}, {"name": "updatedContract", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1023}, {"name": "books", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1242}, {"name": "textAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1272}, {"name": "authors", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1302}, {"name": "subjects", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1332}, {"name": "LoC", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1362}];

var libraryCode = '0x600035601c52740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a05260606111706101403934156100a757600080fd5b602061117060c03960c05160205181106100c057600080fd5b50602060206111700160c03960c05160205181106100dd57600080fd5b50602060406111700160c03960c05160205181106100fa57600080fd5b50600060c052602060c0206101408060006020020151600083015580600160200201516001830155806002602002015160028301555050600060035561115856600035601c52740100000000000000000000000000000000000000006020526f7fffffffffffffffffffffffffffffff6040527fffffffffffffffffffffffffffffffff8000000000000000000000000000000060605274012a05f1fffffffffffffffffffffffffdabf41c006080527ffffffffffffffffffffffffed5fa0e000000000000000000000000000000000060a052634350029260005114156100eb57602060046101403734156100b457600080fd5b606051600435806040519013585780919012156100d057600080fd5b5061014051600560c052602060c020015460005260206000f3005b63ba7b7a6d6000511415610143576020600461014037341561010c57600080fd5b6060516004358060405190135857809190121561012857600080fd5b5061014051600460c052602060c020015460005260206000f3005b63183ca6af6000511415610202576040600461014037341561016457600080fd5b6060516004358060405190135857809190121561018057600080fd5b50602435602051811061019257600080fd5b5060006101805261018061010060006003818352015b61010051600060c052602060c02001543314156101c857600183526101d9565b5b81516001018083528114156101a8575b505050610180516001146101ec57600080fd5b6101605161014051600460c052602060c0200155005b6314522597600051141561025a576020600461014037341561022357600080fd5b6060516004358060405190135857809190121561023f57600080fd5b5061014051600660c052602060c020015460005260206000f3005b630866cf456000511415610319576040600461014037341561027b57600080fd5b6060516004358060405190135857809190121561029757600080fd5b5060243560205181106102a957600080fd5b5060006101805261018061010060006003818352015b61010051600060c052602060c02001543314156102df57600183526102f0565b5b81516001018083528114156102bf575b5050506101805160011461030357600080fd5b6101605161014051600660c052602060c0200155005b6330a991646000511415610371576020600461014037341561033a57600080fd5b6060516004358060405190135857809190121561035657600080fd5b5061014051600760c052602060c020015460005260206000f3005b63ed1e3fed60005114156103c9576020600461014037341561039257600080fd5b606051600435806040519013585780919012156103ae57600080fd5b5061014051600860c052602060c020015460005260206000f3005b63a8d4dbaf60005114156104af57604060046101403734156103ea57600080fd5b6060516004358060405190135857809190121561040657600080fd5b50602435602051811061041857600080fd5b5060006101805261018061010060006003818352015b61010051600060c052602060c020015433141561044e576001835261045f565b5b815160010180835281141561042e575b5050506101805160011461047257600080fd5b600261014051131560006101405112151661048c57600080fd5b6101605161014051600381106104a157600080fd5b600060c052602060c0200155005b638bd942d860005114156106d7576060600461014037606051600435806040519013585780919012156104e157600080fd5b50606051602435806040519013585780919012156104fe57600080fd5b506060516044358060405190135857809190121561051b57600080fd5b506101805161016051131561052f57600080fd5b60035415610592576002543b61054457600080fd5b60025430141561055357600080fd5b600060006064638bd942d861028052610140516102a052610160516102c052610180516102e05261029c60006002545af161058d57600080fd5b6106d5565b6402540be400600160a05161018051806105ab57600080fd5b6402540be400606051610160513402806040519013585780919012156105d057600080fd5b0205806080519013585780919012156105e857600080fd5b02046101a05260006000600060006101a0516000600060c052602060c02001546000f161061457600080fd5b61014051600460c052602060c02001543b61062e57600080fd5b61014051600460c052602060c020015430141561064a57600080fd5b600060006024636237dd9c6101c0526060516101a05160013402038060405190135857809190121561067b57600080fd5b6101e0526101dc600061014051600460c052602060c02001545af161069f57600080fd5b34610240526101405161026052337f1e4e27e3d0ff7c90c9293487ee3fb6a47e0730e22d8c169e25abcdd34b6c8c196040610240a25b005b635615fbb860005114156109095760806004610140376060516004358060405190135857809190121561070957600080fd5b506060516024358060405190135857809190121561072657600080fd5b506060516044358060405190135857809190121561074357600080fd5b50606435602051811061075557600080fd5b50600354156107c1576002543b61076b57600080fd5b60025430141561077a57600080fd5b600060006084635615fbb86102a052610140516102c052610160516102e05261018051610300526101a051610320526102bc60006002545af16107bc57600080fd5b610907565b6402540be400600160a05161018051806107da57600080fd5b6402540be400606051610160513402806040519013585780919012156107ff57600080fd5b02058060805190135857809190121561081757600080fd5b02046101c05260006000600060006101c0516000600060c052602060c02001546000f161084357600080fd5b61014051600460c052602060c02001543b61085d57600080fd5b61014051600460c052602060c020015430141561087957600080fd5b600060006024636237dd9c6101e0526060516101c0516001340203806040519013585780919012156108aa57600080fd5b610200526101fc600061014051600460c052602060c02001545af16108ce57600080fd5b346102605261014051610280526101a0517f1e4e27e3d0ff7c90c9293487ee3fb6a47e0730e22d8c169e25abcdd34b6c8c196040610260a25b005b631a9faa80600051141561099e576020600461014037341561092a57600080fd5b600435602051811061093b57600080fd5b5060006101605261016061010060006003818352015b61010051600060c052602060c02001543314156109715760018352610982565b5b8151600101808352811415610951575b5050506101605160011461099557600080fd5b61014051600255005b634e087e746000511415610af157604060046101403734156109bf57600080fd5b606051600435806040519013585780919012156109db57600080fd5b5060243560205181106109ed57600080fd5b5060006101805261018061010060006003818352015b61010051600060c052602060c0200154331415610a235760018352610a34565b5b8151600101808352811415610a03575b50505061018051600114610a4757600080fd5b6101605161014051600560c052602060c020015561014051600460c052602060c02001543b610a7557600080fd5b61014051600460c052602060c0200154301415610a9157600080fd5b60006000600463a4606b3a6101a0526101bc600061014051600460c052602060c02001545af1610ac057600080fd5b61014051610200527f06dee5cfead0cfc8daa402069e1fa42fd9cdf46ce4d1211c43c5381c416c95f26020610200a1005b637b3a58eb6000511415610c095760406004610140373415610b1257600080fd5b60605160043580604051901358578091901215610b2e57600080fd5b506024356020518110610b4057600080fd5b5060006101805261018061010060006003818352015b61010051600060c052602060c0200154331415610b765760018352610b87565b5b8151600101808352811415610b56575b50505061018051600114610b9a57600080fd5b61014051600460c052602060c02001543b610bb457600080fd5b61014051600460c052602060c0200154301415610bd057600080fd5b60006000602463e74637956101a052610160516101c0526101bc600061014051600460c052602060c02001545af1610c0757600080fd5b005b63d54ab7536000511415610ced5760606004610140373415610c2a57600080fd5b60605160043580604051901358578091901215610c4657600080fd5b506024356020518110610c5857600080fd5b5060605160443580604051901358578091901215610c7557600080fd5b5060006101a0526101a061010060006003818352015b61010051600060c052602060c0200154331415610cab5760018352610cbc565b5b8151600101808352811415610c8b575b5050506101a051600114610ccf57600080fd5b600060006000600061018051610160516000f1610ceb57600080fd5b005b6343bdad546000511415610d8d5760206004610140373415610d0e57600080fd5b60605160043580604051901358578091901215610d2a57600080fd5b5060006101605261016061010060006003818352015b61010051600060c052602060c0200154331415610d605760018352610d71565b5b8151600101808352811415610d40575b50505061016051600114610d8457600080fd5b61014051600155005b638a1a5b6e6000511415610df25760206004610140373415610dae57600080fd5b60605160043580604051901358578091901215610dca57600080fd5b506101405160038110610ddc57600080fd5b600060c052602060c020015460005260206000f3005b632ca869bf6000511415610e18573415610e0b57600080fd5b60015460005260206000f3005b63d59768a36000511415610e3e573415610e3157600080fd5b60025460005260206000f3005b63126f30206000511415610e64573415610e5757600080fd5b60035460005260206000f3005b636c578b716000511415610ebc5760206004610140373415610e8557600080fd5b60605160043580604051901358578091901215610ea157600080fd5b5061014051600460c052602060c020015460005260206000f3005b63ffab984a6000511415610f145760206004610140373415610edd57600080fd5b60605160043580604051901358578091901215610ef957600080fd5b5061014051600560c052602060c020015460005260206000f3005b6381a7212d6000511415610f6c5760206004610140373415610f3557600080fd5b60605160043580604051901358578091901215610f5157600080fd5b5061014051600660c052602060c020015460005260206000f3005b63177f8fb96000511415610fc45760206004610140373415610f8d57600080fd5b60605160043580604051901358578091901215610fa957600080fd5b5061014051600760c052602060c020015460005260206000f3005b6359315b8e600051141561101c5760206004610140373415610fe557600080fd5b6060516004358060405190135857809190121561100157600080fd5b5061014051600860c052602060c020015460005260206000f3005b5b61013b6111580361013b60003961013b611158036000f3';

function launchContract(password) {
	web3.eth.getBalance(_parentAddress).then(console.log);
	web3.eth.personal.unlockAccount(_parentAddress, password).then(function(){

		var currentContract = new web3.eth.Contract(libraryABI);
		var gasEstimate;

		currentContract.deploy({
			data: libraryCode,
			arguments: [['0x8378C65a0c83675AcF509fF3F9f48DEC7898EEbA', '0xD44b32AD86Be526B4b2B552e5668E9126cc55B96', '0x4202a34B0c17541917CE559491Ae951A28De6256']]
		})
		.estimateGas(function(err, gas){
			console.log('Gas Estimate: ' + gas);
			gasEstimate = gas;
		}).then(function(){

			currentContract.deploy({
				data: libraryCode,
				arguments: [['0x8378C65a0c83675AcF509fF3F9f48DEC7898EEbA', '0xD44b32AD86Be526B4b2B552e5668E9126cc55B96', '0x4202a34B0c17541917CE559491Ae951A28De6256']]
			})
			.send({
				from: _parentAddress,
				gas: gasEstimate,
			},
			function(error, transactionHash){})
			.on('error', function(error){ console.log(error); })
			.on('transactionHash', function(transactionHash){ console.log('Tx hash:' + transactionHash); })
			.on('receipt', function(receipt){
			})
			.on('confirmation', function(confirmationNumber, receipt){
			})
			.then(function(newContractInstance){
				console.log(newContractInstance.options.address); // instance with the new contract address
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