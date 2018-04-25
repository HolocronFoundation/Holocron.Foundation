// JavaScript Document

var web3;
var window;

if( 'function' === typeof importScripts) {
	window = self;
	importScripts("../../js/holocron.js");
	importScripts("../../js/min/web3.min.js");
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	libraryContract = new web3.eth.Contract(loadLibraryContractABI(), libraryAddress);
	self.addEventListener('message', function(e){
		var bookID = e.data;
		if(e.data instanceof Web3){
			web3 = e.data;
		}
		loadInfo('b', bookID);
	});
}

function loadInfo(tag, ID){
	loadInfoAddress(tag, ID, false).then(function(res){
		var promisedInfo = loadData(tag, ID, false);
		promisedInfo.then(function(values){
			if(tag == 'b'){
				self.postMessage([[ID, 'infoAddress', res], [ID, 'title', values[0]], [ID, 'language', values[1]], [ID, 'size', values[2]], [ID, 'authors', values[3]], [ID, 'authorRoles', values[5]], [ID, 'authorIDs', values[6]]]);
			}
			else if(tag =='a'){
				//do author stuff here
			}
		}).catch(function(error){
			self.postMessage([error.toString(), ID]);
		});
	}).catch(function(error){
		self.postMessage([error.toString(), ID]);
	});
}