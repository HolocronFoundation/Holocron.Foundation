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

var deployedArr = [[11, "0xE37A2c1Fa111Af3eA0F315C8c5d24cEC9F273120"],[12, "0x814701E65123F445d494046cB1eC3ce38De3E85B"],[13, "0xDD7eE5c8E3DA40632C02c0e9E8c345B99FCB0218"],[14, "0xf870E3D6A2A8e6f1597163Aa4a2D01FAB4658F66"],[15, "0x249B266C0C242dE1035A10DF30D8b5FB52aDe711"],[17, "0x8c30DFcA65a4fF0f3BDB0724dbe8CdF644c12817"]];
				   
				   
//,[18 "0x4BF3250b470d1a2Ad3fF9b78F8F6F02eCFe741f1"],[19, "0x578f98932FC69A1981AF9BE09de8078f8F75e7c2"],[20, "0xa684FfE1C136F117096202fFbac73290dE781C68"],[21, "0xa75070DEd12A2B0803b48b2130C1D46c54B31AAF"],[22, "0x04Ca5Ff7A5641DB00Ee9DB42211B940ece1bFFD2"],[23, "0x5282C75Ca20C9c26626523d67976eDBA26c62E26"],[24, "0x0F96F5C9e4720Eeb684f5F69451EDAf7A7910A48"],[25, "0x8017a78228fe2610902AD86Ca0B487dE803bDC09"],[26, "0x117d73B9446084A8552d2c5A07A321C9A51fA22B"],[27, "0xd2AD6B9A011081De834D0488fC6Fd6FceE669277"],[28, "0x3dcCfB6bF2EBEF397EE9780944A24493eB1712f6"],[29, "0x004b4B52CfEe137518c8033865B3837B760844D7"],[30, "0x1de5f81cf6db7c24679b49521d0c76302f5c4168"],[31, "0x9b941a9bfba785dcfc49018f55e809ca6582ef3d"],[32, "0x5e8f6ee5732932bc4369fa7116e88ff49da26e88"],[33, "0x486c3d951a4b921d2f95d1101776b781644286a4"],[35, "0x2aa7fb2af298c46a6cc7a58d42928ca5dede3d99"],[36, "0xbb771306c56470d2bdb1914b6459608a13704c48"],[37, "0xcc0e3706781ca5d7b54abdcc2b3f6e8717be1df3"],[38,	"0xc47a8cd9c1c99264c122304c6f78944a36ef6931"],[41, "0x18057f7f4f841c62c0d15edabfc1733c0e7aa829"],[42, "0xe371d2ab1416154cfe4a4580dd993b0525d97b73"],[43, "0x180c130fd1891a4e84d227c416422f0d929848c1"],[44, "0x36602de8ecf819db1a49fa82d148a9c4e752e3b2"],[45,	"0xfe877ec41030e4f8bb7a348a48f43f656eb1e59c"],[46, "0xd806f05dac8c9fbe2f099c8422645f65830f6da7"],[47, "0x295064df99be371e9684c4a6571479962c205c05"],[48, "0x08712f8d3a9ea520bc8910184b88ee588cee939c"],[50, "0xbed6e9ab4dd26ad6e91f1e3e8e50d600179f21c9"],[51, "0x571bca9693bfb43174dae9489e0fed12b596da8e"],[52, "0x740e02cfc40fca8753386cae86d754c5a203d1f8"],[53, "0x77b164e8b4a03b47a3d69635c38408968e6a9a88"],[54, "0x555f48bcafee032cfabe02057c1467e88ed13368"],[55, "0x9dd5011f3f9392d9b68128da4d696eac25b0c76f"],[57, "0x0553432595636cfc8e8c3cca6f8c36c2e0660489"],[58, "0x93cde584eeb4502d6b573411502d118c91b7a82f"],[59, "0x9b8c0b1744601687b40574bcc4ce7595f2f4a699"],[60, "0x0395a673cb1d3183b17d19de9135aa4fba4a48f7"],[61, "0xd7cb6e467a669cf6f81fc0e07d35642479d018fd"],[62, "0x1bc42f0626f31a6aef27e7fbb044a56d0293f4b7"],[63, "0x13c6c8e897f7f598649f1a541d0a89af28d99939"],[64, "0x9b75c2ebaf57844d8dcd260d2d78a4251119041b"],[65, "0x5c9ad9e4a2735e3f309339da1f43d64a43a396c2"],[68, "0x0adc8614c9c50e2164bb7e328d5d3e775f581fe1"],[69, "0xe608c34d447d65d2fd6147b70a20173f5d4e1802"],[70, "0x8c1f8f78b97a27e96cc68e9400f31ab62defa70f"],[71, "0x85e088d2b9b04d75f6c4fee9dda91f2ee4b8c5e3"],[72, "0xe6f6a37d9bfe72b60e990121d0a5a965c6136463"],[73, "0xcee6d327ca83aca4136376ed8efa074c13f1c004"],[74, "0xd44d358e5b5f556dad7b42b5fac9c5745d657c04"],[76, "0x881309efc19c81e445c451002142fc276b1eeeda"],[77, "0x4c80e604b6d5aa7476c8b1abcd4c7c5959520732"],[78, "0xe7d3b45cdb947a80521a09ec1edd39e992f2fa49"],[81, "0x09cb16a575a01433276d5086efde2e5b20e70496"],[82, "0xfdc8dbdd4a437eae858fb6a20f56a0ba1860bb10"],[83, "0x3c76e66aa89a35fd22bb427125bffb99db9b6abd"],[84, "0xe3ead51a8626e4889eed300489b83354fb3873b7"],[85, "0xaaf021e08ec11ce30ca2e95a8d2db499b6da6a32"],[86, "0x6f47f0ccfc35020fa13a2049842d7330cad2c52d"],[87,	"0xa214259f9a99fd5481eeec782959647a41ca2f56"],[88, "0x97fd5edc9efa531220096f236f1ff4368f2db0e0"],[90, "0x75728554aaee42b1ef0e6dd054614889d0c68b26"],[91, "0xc6d65ad805ec5226cc1f1a4024f7dfabb163feba"],[92, "0x90133b86e3fe6e14aaff6d3ef3cd4c5bb342d1ec"],[93, "0x10a3ba4c413fdf3144bf83dfa977adee72d69c9e"],[94, "0xbc2efa21f6527bfa0df18674ca5db2bddd922c6a"],[95, "0x0f1eefef1b014ce54c7367ba12ef9385ac267841"],[96, "0xd0d1b1cbc6095c3efd30a70a7dc6158594e3dfa7"],[97, "0xc293f13b89eb8e95e2af7c8aa71f82c743224a20"],[98, "0xdcdd3e84b968660f07325ef223f0d66436dc7535"],[99, "0x315e4fc0da4f4b8a4031dff7fc21fb762cb721cd"],[102, "0x46dDe5777D87a778E82a2032dFf9663AD3715C7a"],[103, "0x2F0c5cc365880b5fAbDe4bb471C2c799264520c3"],[104, "0xDe7449E05CFe8e335996766E8BEB080Ae96F4834"],[105, "0xCD1d63CfE3B615e62D21797c1efed8b47438D479"],[106, "0x9eCAD409eDb21F2Abf2220e8E555Fb8Cb1080E98"],[107, "0xB27095ce46f52D8fF13929Ce1E143FA9aa43C093"],[108, "0xeD15FBE1c46C0a82a40DE772A904481bEB656EFE"],[109, "0x7B7F9d399F0EE87E30469A065863dC8c5731AcFa"],[110, "0x36134703E05BA44cc4B456685d08342E043ffdF4"],[111, "0x11dfaE14AB1e0A470c5Cfb91529a5969b8395E12"],[113, "0xAC85bC370A00bf5eEF905f82ADf96BEC185D5714"],[114, "0x169844Eb8E12eb64FAfE0bADb08b67B1B56F6A1A"]];

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