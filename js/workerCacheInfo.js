// JavaScript Document

var web3;
var window;

if( 'function' === typeof importScripts) {
	window = self;
	importScripts("./holocron.js");
	importScripts("./web3.js");
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	libraryContract = new web3.eth.Contract(loadLibraryContractABI(), libraryAddress);
	self.addEventListener('message', function(e){
		var bookID = e.data;
		loadInfo('b', bookID);
	});
}

function loadInfo(tag, ID){
	loadInfoAddress(tag, ID, false).then(function(res){
		promisedInfo = loadData(tag, ID, false);
		promiseInfo.then(function(values){
			if(tag == 'b'){
				self.postMessage([[bookID, 'infoAddress', res], [bookID, 'title', values[0]], [bookID, 'language', values[1]], [bookID, 'size', values[2]], [bookID, 'authors', values[3]], [bookID, 'authorRoles', values[5]], [bookID, 'authorIDs', values[6]]]);
			}
			else if(tag =='a'){
				//do author stuff here
			}
		}).catch(function(error){
			self.postMessage(error.toString());
		});
	}).catch(function(error){
		self.postMessage(error.toString());
	});
}