//Javascript for the holocron.foundation

function loadLibraryContractABI() {
	return [{"name": "Donation", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "int128", "name": "_value", "indexed": false}, {"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "BookUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "TextUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "getBookAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "_bookID"}], "constant": true, "payable": false, "type": "function", "gas": 672}, {"name": "__init__", "outputs": [], "inputs": [{"type": "address[3]", "name": "_foundationAddresses"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeFoundationAddresses", "outputs": [], "inputs": [{"type": "int128", "name": "index"}, {"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22130}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 41261}, {"name": "donateWithDifferentDonor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}, {"type": "address", "name": "donorAddress"}], "constant": false, "payable": true, "type": "function", "gas": 41236}, {"name": "setUpdateAddress", "outputs": [], "inputs": [{"type": "address", "name": "newUpdateAddress"}], "constant": false, "payable": false, "type": "function", "gas": 21889}, {"name": "addBook", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "bookAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22096}, {"name": "setTextAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "textAddress"}], "constant": false, "payable": false, "type": "function", "gas": 5981}, {"name": "setExpansionAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 4661}, {"name": "foundationAddresses", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 940}, {"name": "updateAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 753}, {"name": "updatedContract", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 783}, {"name": "books", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1002}];
}

function loadBookABI(){
	return [{"name": "__init__", "outputs": [], "inputs": [{"type": "address", "name": "_parentAddress"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 3050}, {"name": "changeParentAddress", "outputs": [], "inputs": [{"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 20657}, {"name": "addExpansionAddress", "outputs": [], "inputs": [{"type": "address", "name": "_expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 40693}, {"name": "addText", "outputs": [], "inputs": [{"type": "address", "name": "_textAddress"}], "constant": false, "payable": false, "type": "function", "gas": 40879}, {"name": "recieveDonation", "outputs": [], "inputs": [{"type": "int128", "name": "value"}], "constant": false, "payable": false, "type": "function", "gas": 21242}, {"name": "version", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "parentAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 663}, {"name": "expansionAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 693}, {"name": "usesExpansion", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 723}, {"name": "book__id", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 831}, {"name": "book__title", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2180}, {"name": "book__copyright", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 891}, {"name": "book__language", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1866}, {"name": "book__libraryOfCongress", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1896}, {"name": "book__subjects", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1926}, {"name": "book__authorIDs", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1950}, {"name": "book__authorRoles", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1986}, {"name": "book__size", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1071}, {"name": "book__donations", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1101}, {"name": "book__textAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1131}, {"name": "book__uploaded", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1161}];

}

var bookABI = loadBookABI();

var zipABI;

var libraryAddress = '0xdA0835F4Ea95231B1CED731Ecd7B691139D6B4F5';

var web3 = setupWeb3();

var libraryContract = new web3.eth.Contract(loadLibraryContractABI(), libraryAddress); //This loads the library ABI, responsible for most functions on our site

function checkIfUploaded(bookID) {
	"use strict";
	var bookContract = web3.eth.contract(bookABI).at(); //update
	return bookContract.book.uploaded();
}

function getBookName(bookID) {
	"use strict";
	var bookContract = web3.eth.contract(bookABI).at(); //update
	return bookContract.book.title();
}

function getBookTextBlockchain(bookID) {
	"use strict";
	var bookContract = web3.eth.contract(bookABI).at(); //Update
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
	if (typeof web3 !== 'undefined') {
		return new Web3(web3.currentProvider); //If you already have a web3 provider (e.g. metamask) uses that
	}
	else {
		return new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); //sets us as the provider
		//To do: Disable donation without an external provider
	}
}

function loadBookInfoBoxes(){
	var elements = document.getElementsByClassName("bookInfo");
	for (var i = 0; i < elements.length; i++){
		loadBookInfoBox(parseInt(elements[i].getAttribute("name")));
	}
}

function loadBookInfoBox(bookID){
	libraryContract.methods.getBookAddress(bookID).call()
	.then(function(res){
		var bookContract = new web3.eth.Contract(bookABI, res);
		var titlePromise = bookContract.methods.book__title().call();
		var authorPromise = bookContract.methods.book__authorIDs().call()
		var langPromise = bookContract.methods.book__language().call();
		var sizePromise = bookContract.methods.book__size().call();
		var weiPromise = bookContract.methods.book__donations().call();
		Promise.all([titlePromise, authorPromise, langPromise, sizePromise, weiPromise]).then(function(values) {
			var ethRecieved = web3.utils.fromWei(values[4], "ether");
			var size = values[3];
			var gweiStorageCost = calculateStorageCost(size, web3.utils.toWei("9", "gwei"));
			var newHTML = '<h2 class="title">' + hex2a(values[0]) + '</h2> ';
			if(values[1] != null){
				var authorIDArray =  values[1].slice(2).match(/.{1,4}/g);
				var authorIDBase10Array = [];
				for(var j = 0; j<authorIDArray.length; j++){
					authorIDBase10Array.push(parseInt(authorIDArray[j], 16));
				}
				newHTML += '<h2 class="author">' + authorIDBase10Array + '</h2>';
			}
			newHTML += '<h2 class="lang">Language: ' + hex2a(values[2]) + '</h2>';
			newHTML += '<meter value="' + ethRecieved + '" min="0" max="2.3"></meter>';
			newHTML += '<h2 class="size">' + size +' Bytes</h2>';
			newHTML += '<h2 class="recieved">' + ethRecieved + ' Ξ Recieved</h2>';
			newHTML += '<h2 class="needed">' + web3.utils.fromWei(gweiStorageCost.toString(), "ether") + ' Ξ Needed</h2>';
			newHTML += '<p>Donate with Ξ</p>';
			newHTML += '<p>Donate with Ξ</p>';
			newHTML += '<p><a href="./donate.html?' + bookID.toString() + '">Donate with BTC, LTC, or USD</a></p>';
			var infoItem = document.getElementsByName(bookID.toString())[0];
			infoItem.innerHTML = newHTML;
		});
	});
}

function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
    return str;
}

function calculateStorageCost(size, gasPrice) {
	//size in bytes, gasPrice in wei
	return 625*size*gasPrice;
	
}