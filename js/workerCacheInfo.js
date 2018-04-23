// JavaScript Document

var web3;
var window;

if( 'function' === typeof importScripts) {
	window = self;
	importScripts("./holocron.js");
	importScripts("./web3.js");
	web3 = new Web3(new Web3.providers.HttpProvider("https://api.myetherapi.com/rop"));
	libraryContract = new web3.eth.Contract(loadLibraryContractABI(), libraryAddress);
	self.addEventListener('message', function(e){
		var bookID = e.data;
		loadBookInfo(bookID);
	});
}

function loadBookInfo(bookID){
	loadInfoAddress('b', bookID, false).then(function(res){
		var titlePromise = loadVariable('b', bookID, 'title', false, true);
		var langPromise = loadVariable('b', bookID, 'language', false, true);
		var sizePromise = loadVariable('b', bookID, 'size', false);
		var authorsPromise = getAuthors(bookID, false);
		var authorsRoles = getAuthorRoles(bookID, false);
		var authorIDs = loadVariable('b', bookID, 'authorIDs', false);
		Promise.all([titlePromise, langPromise, sizePromise, authorsPromise, authorsRoles, authorIDs]).then(function(values){
			self.postMessage([[bookID, 'infoAddress', res], [bookID, 'title', values[0]], [bookID, 'language', values[1]], [bookID, 'size', values[2]], [bookID, 'authors', values[3]], [bookID, 'authorRoles', values[4]], [bookID, 'authorIDs', values[5]]]);
		}).catch(function(error){
			self.postMessage(error.toString());
		});
	}).catch(function(error){
		self.postMessage(error.toString());
	});
}
