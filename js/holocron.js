//Javascript for the holocron.foundation

var bookABI;

var zipABI;

var libraryAddress = 0; //ADD THIS LATER!!!

var web3 = setupWeb3();

var libraryContractABI = web3.eth.contract(loadLibraryContractABI()); //This loads the library ABI, responsible for most functions on our site

var libraryContract = web3.eth.contract(libraryContractABI).at(libraryAddress);

var books = libraryContract.books();

function checkIfUploaded(bookID) {
	"use strict";
	var bookContract = web3.eth.contract(bookABI).at(books[bookID]);
	return bookContract.book.uploaded();
}

function getBookName(bookID) {
	"use strict";
	var bookContract = web3.eth.contract(bookABI).at(books[bookID]);
	return bookContract.book.title();
}

function getBookTextBlockchain(bookID) {
	"use strict";
	var bookContract = web3.eth.contract(bookABI).at(books[bookID]);
	var textContract = web3.eth.contract(zipABI).at(bookContract.textAddress());
	var size = bookContract.size();
	var sizeByteArray = Math.floor(size/255);
	
	if (size%255 !== 0) {
		sizeByteArray++;
	}
	
	var outputBytes = textContract.zipBytes0();
	
	for (var i = 1; i < sizeByteArray; i++) {
		var evalString = 'textContract.zipBytes' + i.toString() + '()';
		outputBytes += eval(evalString);
	}
	
	return outputBytes;
}

function getBookTextServer(bookID) {
	"use strict";
	JSZipUtils.getBinaryContent('path/to/content.zip' + bookID, function(err, data) { //NEED TO UPDATE PATH TO CONTENT
		if(err) {
			//NEED TO FIX ERROR MESSAGE
		}

		else {
			return data;
		}
	});
}

function loadBookInfoBox(bookID){
	
}

function loadTextPage(bookID) {
	
	bookABI = loadBookABI(bookID); //This loads the individual book ABI, responsible primarily for getters	
	
	zipABI = loadZipABI(bookID); //This loads the zip files ABI, responsible for downloading zip files
	
	var zip = new JSZip();
	
	var bookName = getBookName(bookID);
	
	document.title = 'Holocron.Foundation ♢ ' + bookName;
	
	var uploaded = checkIfUploaded(bookID);
	
	var holocronInfoText = 'Welcome to the Holocron Foundation. You are reading ' + bookName + ' This text is Public Domain within the United States, so feel free to use the text however you would like.';
	
	document.getElementById('Holocron Info').innerHTML = '<p>' + holocronInfoText + '</p>';
	
	if (uploaded) {
		holocronInfoText += ' This text has been uploaded to the Ethereum Blockchain. You are viewing the copy stored there. Enjoy!';
	}
	else {
		holocronInfoText += ' This text has <b>NOT</b> been uploaded to the Ethereum Blockchain. You are viewing a copy stored on our server. If you would like to contribute Ethereum click here to send a donation. If you would like to give Bitcoin, Litecoin, or USD please see our donations page.';
	}
	
	document.getElementById('Holocron Info').innerHTML = '<p>' + holocronInfoText + '<p>';
	document.getElementById('bookText').innerHTML = '<p>The text is loading...</p>';
	
	var fullTextZip;
	
	if (uploaded) {
		fullTextZip = getBookTextBlockchain(bookID); //Loads the file from the blockchain
	}
	else {
		fullTextZip = getBookTextServer(bookID); //Loads the file from the server
	}
	
	//unzip file here
	JSZip.loadAsync(fullTextZip)
	.then(function(zip){
		return zip.file(bookID + '.txt').async('string');
	})
	.then(function success(text) {
		document.getElementById('bookText').innerHTML = '<p>' + text + '</p>';
	},    function error(e) {
   		document.getElementById('bookText').innerHTML = '<p> An error has occurred. Please refresh the page and check your connection. If this error persists please let us know about it at samuel.troper@holocron.founcation and note the following error: ' + e + '</p>';
	});
}

function setupWeb3() {
	"use strict";
	if (typeof web3 !== 'undefined') {
		return new Web3(web3.currentProvider); //If you already have a web3 provider (e.g. metamask) uses that
	}
	else {
		return new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); //sets us as the provider
		//To do: Disable donation without an external provider
	}
}

function loadBookABI(bookID) {
	
}

function loadLibraryContractABI() {
	return 
}

function loadZipABI(bookID) {
	
}