// JavaScript Document

importScripts(web3.min.js);
importScripts(holocron.js);

web3 = new Web3(new Web3.providers.HttpProvider("https://api.myetherapi.com/rop")); //Currently set to ropsten

function loadBookInfo(bookID){
	loadInfoAddress(bookID, false).then(function(res){
		var titlePromise = loadBookVariable(bookID, 'title', false, true);
		var langPromise = loadBookVariable(bookID, 'language', false, true);
		var sizePromise = loadBookVariable(bookID, 'size', false);
		var authorsPromise = getAuthors(bookID, false);
		var authorsRoles = getAuthorRoles(bookID, false);
		var authorIDs = loadBookVariable(bookID, 'authorIDs', false);
		Promise.all([titlePromise, langPromise, sizePromise, authorsPromise, authorsRoles, authorIDs]).then(function(values){
			self.postMessage([[bookID, 'infoAddress', res], [bookID, 'title', values[0]], [bookID, 'language', values[1]], [bookID, 'size', values[2]], [bookID, 'authors', values[3]], [bookID, 'authorRoles', values[4]], [bookID, 'authorIDs', values[5]]]);
		}).catch(function(error){
			self.postMessage(error);
		});
	}).catch(function(error){
		self.postMessage(error);
	});
}

self.addEventListener('message', function(e){
	var bookID = e.data;
	loadBookInfo(bookID);
});