//Javascript for the holocron.foundation, written by Samuel Troper

//Upon first loading, this checks if this file is being executed in a JS thread that has windows
//If so, it goes ahead and sets up an event listener for the page load.
//When the page loads, it goes ahead and sets up web3 and pulls variables like the max index from the blockchain.
//Following the aquisition of data from the blockchain, it goes ahead and starts the page.
if (typeof window !== 'undefined'){
	window.addEventListener('load', function() {
		web3 = setupWeb3();
		libraryContract.methods.maxIndex().call().then(function(res){
			maxIndex = parseInt(res);
			start();
		})
	});
}

//Represents the current page number
var currentPage = null;

//Represents the current page type
//r = random, a = author, s = search
var currentPageType = null;

//Represents books that are loaded on a given page
//The books loaded on page x are stored in pagebooks[x]
var pageBooks = [[]];

//This represents the ids of books that do not need to be cached
var skipCache = [];

//Represents any ID that doesn't have a corresponding book
var badID = [];

var searchValue;

//Filters for the library
var currentFilters = new Map([['server', true], ['blockchain', true]]);

var web3;

//The wait time for worker threads
var workerTimeOut = 100;

//The wait time for the main thread
var mainTimeOut = 0;

//The maximum index that books are stored at
var maxIndex;

//The maximum number of items to be listed in the library on a page
//Add option to change later
var maxEntries = 5;

function loadLibraryContractABI() {
	//This function returns the ABI for the library contract
	return [{"name": "Donation", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "int128", "name": "_value", "indexed": false}, {"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "BookUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "TextUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "getTextAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 672}, {"name": "getBookAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 702}, {"name": "addBook", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "bookAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22006}, {"name": "getAuthorAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "authorID"}], "constant": true, "payable": false, "type": "function", "gas": 762}, {"name": "addAuthor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "authorAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22066}, {"name": "getSubjectAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "subjectID"}], "constant": true, "payable": false, "type": "function", "gas": 822}, {"name": "getLoCAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "LoCID"}], "constant": true, "payable": false, "type": "function", "gas": 852}, {"name": "__init__", "outputs": [], "inputs": [{"type": "address[3]", "name": "_foundationAddresses"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeFoundationAddresses", "outputs": [], "inputs": [{"type": "int128", "name": "index"}, {"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22310}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 41441}, {"name": "donateWithDifferentDonor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}, {"type": "address", "name": "donorAddress"}], "constant": false, "payable": true, "type": "function", "gas": 41416}, {"name": "setUpdateAddress", "outputs": [], "inputs": [{"type": "address", "name": "newUpdateAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22069}, {"name": "setTextAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "_textAddress"}], "constant": false, "payable": false, "type": "function", "gas": 26206}, {"name": "setExpansionAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 4811}, {"name": "withdrawFunds", "outputs": [], "inputs": [{"type": "int128", "name": "bookID"}, {"type": "address", "name": "withdrawalAddress"}, {"type": "int128", "name": "withdrawal"}], "constant": false, "payable": false, "type": "function", "gas": 37154}, {"name": "setMaxIndex", "outputs": [], "inputs": [{"type": "int128", "name": "_maxIndex"}], "constant": false, "payable": false, "type": "function", "gas": 22240}, {"name": "foundationAddresses", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1150}, {"name": "maxIndex", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 963}, {"name": "updateAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 993}, {"name": "updatedContract", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1023}, {"name": "books", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1242}, {"name": "textAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1272}, {"name": "authors", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1302}, {"name": "subjects", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1332}, {"name": "LoC", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1362}];
}

function loadBookABI(){
	//This function returns the ABI for a book contract
	return [{"name": "__init__", "outputs": [], "inputs": [{"type": "address", "name": "_parentAddress"}, {"type": "address", "name": "_modifierAddress"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 3368}, {"name": "changeParentAddress", "outputs": [], "inputs": [{"type": "address", "name": "newAddress"}, {"type": "int128", "name": "index"}], "constant": false, "payable": false, "type": "function", "gas": 21587}, {"name": "addExpansionAddress", "outputs": [], "inputs": [{"type": "address", "name": "_expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 41418}, {"name": "addText", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 21460}, {"name": "recieveDonation", "outputs": [], "inputs": [{"type": "int128", "name": "value"}], "constant": false, "payable": false, "type": "function", "gas": 21967}, {"name": "version", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "modifierAddresses", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 880}, {"name": "expansionAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 693}, {"name": "usesExpansion", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 723}, {"name": "book__id", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 831}, {"name": "book__title", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2180}, {"name": "book__copyright", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 891}, {"name": "book__language", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1866}, {"name": "book__libraryOfCongress", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1896}, {"name": "book__subjects", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1926}, {"name": "book__authorIDs", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1950}, {"name": "book__authorRoles", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1986}, {"name": "book__size", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1071}, {"name": "book__donations", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1101}, {"name": "book__textAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1131}, {"name": "book__uploaded", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1161}];

}

function loadAuthorABI(){
	//This function returns the ABI for an author contract
	return [{"name": "__init__", "outputs": [], "inputs": [{"type": "address", "name": "_parentAddress"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeParentAddress", "outputs": [], "inputs": [{"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 20627}, {"name": "addExpansionAddress", "outputs": [], "inputs": [{"type": "address", "name": "_expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 40663}, {"name": "version", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 543}, {"name": "parentAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 573}, {"name": "expansionAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 603}, {"name": "usesExpansion", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "author__name", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1686}, {"name": "author__alias", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2084}, {"name": "author__birthdate", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1746}, {"name": "author__deathdate", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1776}, {"name": "author__id", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 861}];
}

function loadZipABI(){
	//This function returns the ABI for a zipped text contract
	return [{"name": "__init__", "outputs": [], "inputs": [{"type": "address", "name": "_listingAddress"}, {"type": "address", "name": "_modifierAddress"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "setZipBytes", "outputs": [], "inputs": [{"type": "int128", "name": "_index"}, {"type": "bytes", "name": "newZip"}], "constant": false, "payable": false, "type": "function", "gas": 5187494}, {"name": "listingAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 513}, {"name": "modifierAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 543}, {"name": "zipBytes", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 97105}, {"name": "zipBytesFinal", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 28850}];
}

var libraryAddress = '0x240Ffc557848b5a28bB2df8370B35e7a1B35797D';

//This boolean is set to true when the user is injecting web3 (metamask or mist, etc.)
var thirdPartyProvider;

var libraryContract;

function loadBookTextChunk(bookID, chunk){
	//This function returns a chunk of a book text located at index chunk for book with bookID
	
	//Calls the textAddress function to find the eth address for a books text
	return libraryContract.methods.getTextAddress(bookID).call().then(function(res){
		//Creates a text contract instance at the returned eth address
		var textContract = new web3.eth.Contract(loadZipABI(), res);
		//Calls the zip bytes stored at chunk and then returns them
		return textContract.methods.zipBytes(chunk).call().then(function(success){return success;});
	});
}

function loadFinalBookTextChunk(bookID){
	//This function returns the final chunk of a book text located at index chunk for book with bookID
	
	//Calls the textAddress function to find the eth address for a books text
	return libraryContract.methods.getTextAddress(bookID).call().then(function(res){
		//Creates a text contract instance at the returned eth address
		var textContract= new web3.eth.Contract(loadZipABI(), res);
		//Calls the final zip bytes stored and then returns them
		return textContract.methods.zipBytesFinal().call().then(function(success){return success;})
	});
}

async function getBookTextBlockchain(bookID) {
	//This function loads a book text with id bookID from the ethereum blockchain
	
	//Loads the size of a given book, which determines how many chuncks there are.
	//A book will have size/4096 (truncated to an integer) 4096 kb chunks, and
	//a variable size final chunk
	var size = await loadVariable('b', bookID, 'size');
	//Determines how many chunks there are, and creates an array to store each chunk
	var numByteArrays = Math.floor(size/4096);
	if (size%255 !== 0) {
		numByteArrays++;
	}
	
	//Creates an array of promises in order to use Promise.all to wait for the entirety of a zipped text
	bytePromises = [];
	
	//Loops through the number of byte arrays and begins loading them
	for(var i = 0; i<numByteArrays; i++){
		if(i!=numByteArrays-1){
			bytePromises.push(await loadBookTextChunk(bookID, i));
		}
		else{
			bytePromises.push(await loadFinalBookTextChunk(bookID));
		}
	}
	
	//Stops execution until all byte arrays for a zip file are returned
	var promises = await Promise.all(bytePromises);
	
	//The processed arrays, converted from hex to bytes
	var arrays = []
	
	//Loops through and converts the hex representation of a zip chunk to bytes
	for(var i = 0; i<promises.length; i++){
		var newArray = hexStringToByte(promises[i].substring(2));
		arrays.push(newArray);
	}
	
	//Concatenates all of the byte arrays as a Uint8Array, then returns said array
	var returnArray = new Uint8Array([].concat.apply([], arrays));
	return returnArray;
}

function hexStringToByte(str) {
  //This function converts a string that is a hex number to bytes
  var result = [];
  for (var i = 0, len = str.length; i < len; i+=2) {
    result.push(parseInt(str.substr(i,2),16));
  }
  return result;
}

function getBookTextServer(bookID) {
	//This function uses jszip to load a text that hasn't been uploaded to the blockchain from our servers
	//See https://stuk.github.io/jszip/ for more information and documentation for this
	
	return new JSZip.external.Promise(function(resolve, reject) {
		var folderID = Math.floor(bookID/100)
		JSZipUtils.getBinaryContent('/library/zip/' + folderID + '/' + bookID +'.zip', function(err, data) {
			if(err) {
				reject(err);
			}

			else {
				resolve(data);
			}
		});
	});
}

async function loadTextPage(bookID) {
	//This function preps the HTML of the text page and loads the full text of a given book
	
	//Starts loading HTML
	document.getElementById('Holocron Info').innerHTML = '<p>Welcome to the <a href="./">holocron.foundation library</a>.</p>';
	
	//Sets up a blank paragraph for the text
	document.getElementById('bookText').innerHTML = '<p></p>';
	
	//Creates an instance of JSZip, an implementation of zip algorithms in JavaScript
	//This is used both for texts on the web server and for texts on the blockchain.
	var zip = new JSZip();
	
	//Loads the name of bookID
	var bookName = await loadVariable('b', bookID, 'title', true, true);
	
	//Updates the tile with bookID's name
	document.title = 'Holocron.Foundation ♢ ' + bookName;
	

	var holocronInfoText = 'Welcome to the <a href="./">holocron.foundation library</a>. You are reading <a href="./?bookID=' + bookID + '">' + bookName + '</a>. To the best of our knowledge, this text is Public Domain within the United States, so feel free to use the text however you would like.';
	

	document.getElementById('Holocron Info').innerHTML = '<p>' + holocronInfoText + '</p>';
	
	//Checks if the book is on the blockchain, then informs the user of that.
	var uploaded = await loadVariable('b', bookID, 'uploaded', false);
	if (uploaded) {
		holocronInfoText += ' This text has been uploaded to the Ethereum Blockchain. You are viewing the copy stored there. Enjoy!';
	}
	else {
		holocronInfoText += ' This text has <b>NOT</b> been uploaded to the Ethereum Blockchain. You are viewing a copy stored on our server. If you would like to contribute Ethereum <a href="#" onclick="donate(' + bookID + ', false, true)">click here</a> to immeadiately send a donation with our default fee, or head to <a href="./?bookID=' + bookID + '">this books page</a> to change it. If you would like to give Bitcoin, Litecoin, or USD please see our <a href="../donate.html">donations page</a>.';
	}
	document.getElementById('Holocron Info').innerHTML = '<p>' + holocronInfoText + '<p>';

	//Informs the user the text is loading
	document.getElementById('bookText').innerHTML = '<p>The text is loading...</p>';
	
	//Loads the text in zip format
	var fullTextZip;
	if (uploaded) {
		fullTextZip = await getBookTextBlockchain(bookID);
	}
	else {
		fullTextZip = await getBookTextServer(bookID);
	}
	
	//Unzips the file and converts it to a string
	JSZip.loadAsync(fullTextZip)
	.then(function(zip){
		return zip.file(bookID + '.txt').async('string');
	})
	.then(function success(text) {
		
		//Creates a download link
		var downloadDiv = document.getElementById('download');
		var downloadLink = document.createElement('a');
		downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		downloadLink.setAttribute('download', bookName + '.txt');
		downloadLink.appendChild(document.createTextNode('Download this text'));
		downloadDiv.appendChild(downloadLink);
		
		//Loads the text on the page
		document.getElementById('bookText').innerHTML = '<p>' + text + '</p>';
	},    function error(e) {
		//Error catch
   		document.getElementById('bookText').innerHTML = '<p> An error has occurred. Please refresh the page and check your connection. If this error persists please let us know about it at samuel.troper@holocron.founcation and note the following error: ' + e + '</p>';
	});
}

function setupWeb3() {
	//This function sets up web3 based upon whether the user is injecting it or not, as well as setting up key variables
	//which require web3
	
	if (typeof web3 !== 'undefined') {
		//Sets web3 if the user is injecting it
		thirdPartyProvider = true;
		console.log('Using users web3!')
		result = new Web3(web3.currentProvider); //If you already have a web3 provider (e.g. metamask) uses that
	}
	else {
		//Sets web3 if the user is not injecting it. Also increases timeout time for the main thread to be corteous.
		thirdPartyProvider = false;
		console.log('Using external web3. :( Check out Metamask or Mist.')
		mainTimeOut = 500;
		result = new Web3(new Web3.providers.HttpProvider("https://api.myetherapi.com/eth"));
	}
	//Initializes the library contract
	libraryContract = new result.eth.Contract(loadLibraryContractABI(), libraryAddress);
	
	//Returns the proper web3 instance
	return result;
}

function getAuthors(bookID, localStorageAccess=true){
	//Gets authors of a given book.
	
	//Checks if there is access to localStorage. If so, this will search localstorage before checking the blockchain.
	if(localStorageAccess){
		var localStorageName = '<b' + bookID.toString() + '>authors';
		var localItem = localStorage.getItem(localStorageName);
		if(localItem != null){
			return Promise.resolve(parseLocalStorage(localItem));
		}
	}
	//Otherwise, this function pulls the books address
	return loadInfoAddress('b', bookID, localStorageAccess).then(function(res){
		
		//Creates a book contract for the current book.
		currentContract = new web3.eth.Contract(loadBookABI(), res);
		
		//Searches a given book for its authors.
		return currentContract.methods.book__authorIDs().call().then(async function(res){
			//If there are no authors, records that in localstorage when possible, then returns None
			if(res == null){
				if(localStorageAccess){
					storeInfo('b', bookID, 'authors', 'None');
				}
				return 'None';
			}
			else{
				//Parsing through author IDs
				var authorIDArray =  res.slice(2).match(/.{1,4}/g);
				var authorNameArray = [];
				
				//Gets each authors name from the blockchain
				for(var j = 0; j<authorIDArray.length; j++){
					var addr = await libraryContract.methods.getAuthorAddress(parseInt(authorIDArray[j], 16)).call();
					var authorContract = new web3.eth.Contract(loadAuthorABI(), addr);
					var name = await authorContract.methods.author__name().call();
					authorNameArray.push(hex2a(name));
				}
				
				//Stores authors if there is local storage access
				if(localStorageAccess){
					storeInfo('b', bookID, 'authors', authorNameArray);
				}
				
				//Returns an array of author names.
				return authorNameArray;
			}
		});
	});
}

function getAuthorRoles(bookID, localStorageAccess=true){
	//This functions in a nearly identical way to getAuthors
	
	if(localStorageAccess){
		var localStorageName = '<b' + bookID.toString() + '>authorRoles';
		var localItem = localStorage.getItem(localStorageName);
		if(localItem != null){
			return Promise.resolve(parseLocalStorage(localItem));
		}
	}
	return loadInfoAddress('b', bookID, localStorageAccess).then(function(res){
		currentContract = new web3.eth.Contract(loadBookABI(), res);
		return currentContract.methods.book__authorRoles().call().then(function(res1){
			if(res1 == null){
				return 'None';
			}
			var authorRolesIDArray = res1.slice(2).match(/.{1,2}/g);
			if(localStorageAccess){
				storeInfo('b', bookID, 'authorRoles', authorRolesIDArray);
			}
			return authorRolesIDArray;
		});
	});
}

function loadData(tag, ID, useCache=true){
	//Returns all the data fields for a given book or author using Promise.all
	
	promiseData = []
	if(tag == 'b'){
		promiseData.push(loadVariable(tag, ID, 'title', useCache, true));
		promiseData.push(loadVariable(tag, ID, 'language', useCache, true));
		promiseData.push(loadVariable(tag, ID, 'size', useCache));
		promiseData.push(getAuthors(ID, useCache));
		promiseData.push(loadVariable(tag, ID, 'donations', false));
		promiseData.push(getAuthorRoles(ID, useCache));
		promiseData.push(loadVariable(tag, ID, 'authorIDs', useCache));
		promiseData.push(loadVariable(tag, ID, 'uploaded', false))
	}
	else if(tag == 'a'){
		promiseData.push(loadVariable(tag, ID, 'name', useCache, true));
		promiseData.push(loadVariable(tag, ID, 'alias', useCache, true));
		promiseData.push(loadVariable(tag, ID, 'birthdate', useCache, true));
		promiseData.push(loadVariable(tag, ID, 'deathdate', useCache, true));
	}
	
	return Promise.all(promiseData);
}

function loadInfoBox(tag, ID, modifiedURL='.'){
	//Loads an info box for either authors or pieces of text
	
	//Loads the info address for ID
	loadInfoAddress(tag, ID)
	.then(function(res){
		//Loads all data needed
		promisedInfo = loadData(tag, ID);
		promisedInfo.then(async function(values) {
			//Book implementation
			if(tag == 'b'){
				var titleClean = values[0];
				var languageClean = values[1];
				var size = values[2];
				//Converts donations from Wei to ETH
				var donationsETH = web3.utils.fromWei(values[4].toString(), "ether");
				var authorRolesIDArray = values[5];
				//Calculates the storage cost size
				var gweiStorageCost = calculateStorageCost(size, web3.utils.toWei("4", "gwei"));
				var uploaded = values[7];
				
				//Checks filters
				if((currentFilters.get('blockchain') && uploaded) || (currentFilters.get('server') && !uploaded)){
					//Clears the book section if it needs to be cleared
					if(clearBooksSection){
						booksList.innerHTML = '';
						clearBooksSection = false;
					}
					
					//Sets the title HTML
					var newHTML = '<p class="title">';
					//Adds a link to the book page if you're not on it
					if(getPageName() != 'book.html'){
						newHTML += '<a href="' + modifiedURL + '/?bookID=' + ID.toString() + '">';
					}
					newHTML += '<b>' + titleClean + '</b>';
					//Finished the link tag
					if(getPageName() != 'book.html'){
						newHTML += '</a>';
					}
					newHTML += '</p> ';

					
					//Checks if there are authors, if so, adds them to the page
					if(authorRolesIDArray != 'None'){
						var authorNameArray = values[3];
						//Splits the custom ID array
						var authorIDArray =  values[6].slice(2).match(/.{1,4}/g);
						newHTML += '<p class="author">';
						var lastRole = -1;
						//Loops through each author and adds them to the page
						for (var k = 0; k<authorNameArray.length; k++){
							var currentRoleID = authorRolesIDArray[k];
							//Adds info about roles whenever the role changes
							if(currentRoleID != lastRole){
								if (k!=0){
									newHTML += ', ';
								}
								if(currentRoleID == 0){
									newHTML += 'Authored by: ';
								}
								else if (currentRoleID == 1){
									newHTML += 'Translated by: ';
								}
								else if (currentRoleID == 2){
									newHTML += 'Edited by: ';
								}
								else if (currentRoleID == 3){
									newHTML += 'Illustrated by: ';
								}
								lastRole = currentRoleID;
							}
							else if(k!=0){
								newHTML += ' & ';
							}
							newHTML += '<a href="' + modifiedURL + '/?authorID=' + parseInt(authorIDArray[k], 16) + '">' + decodeURIComponent(escape(authorNameArray[k])) + '</a>';
						}
						newHTML += '</p>';
					}
					//Language Info
					newHTML += '<p class="lang">Language: ' + languageClean + '</p>';

					//Link to text page
					newHTML += '<p class="textLink"><a href="' + modifiedURL + '/text.html?bookID=' + ID.toString() + '">View the text</a></p>';

					//If the text is uploaded, informs the user
					if(uploaded){
						newHTML += '<p>This text has been uploaded to the blockchain. Donations may still be made in the name of the text.</p>';
						//Donation stats
						newHTML += '<p class="recieved">' + donationsETH + ' Ξ Recieved</p>';

					}
					//If not, checks the3 current donation stats
					else{
						newHTML += '<p>This text is <b>not</b> yet uploaded to the blockchain.</p>';

						if(donationsETH > web3.utils.fromWei(gweiStorageCost.toString(), "ether")){
							newHTML += '<p>Enough donations have been recieved to upload the text to the blockchain!<br>It will be available shortly. Donations may still be made in the name of the text.</p>'

							newHTML += '<p class="recieved">' + donationsETH + ' Ξ Recieved</p>';
						}
						else{
							//Donation meter
							newHTML += '<meter value="' + donationsETH + '" min="0" max="' + web3.utils.fromWei(gweiStorageCost.toString(), "ether") + '"></meter>';

							//Donation stats
							newHTML += '<p class="recieved">' + donationsETH + ' Ξ Recieved / ≈' + web3.utils.fromWei(gweiStorageCost.toString(), "ether") + ' Ξ Needed</p>';
						}
					}

					//Donation slider
					newHTML += '<div class="splitSlider" style="display: flex;"><p class="blankFlex1"></p><p class="left" id="bookSplit' + ID + '">Book: 70%</p><input type="range" min="0" max="100" value="30" class="slider" id="slider' + ID +'" onchange="updateSplitValues(this.value, ' + ID + ');"><p class="right" id="foundationSplit' + ID + '">Foundation: 30%</p><p class="blankFlex1"></p></div>';

					//ETH donate
					newHTML += '<p><a href="javascript:donate(' + ID + ');">Donate with Ξ</a></p>';

					//Other donate
					newHTML += '<p><a href="../donate.html?ID=' + ID.toString() + '">Donate with BTC, LTC, or USD</a></p>';
					
					///Sets the HTML
					infoItem = document.getElementsByName(ID.toString())[0];
					infoItem.innerHTML = newHTML;
					infoItem.className = infoItem.className + ' loaded';

					//Stores that the info has been succesfully saved locally
					storeInfo(tag, ID, 'basicInfo', true);
				}
				else {
					//Removes an entry if it is filtered out
					removeEntry(ID);
				}
			}
			//Author implementation
			else if(tag =='a'){
				var name = values[0];
				var alias = values[1];
				var birthdate = values[2];
				var deathdate = values[3];
				
				//Name
				var newHTML = '<p class="authorName">';
				//If the page is not the author's page, adds links to the authors page
				if(getPageName() != 'author.html'){
					newHTML += '<a href="./?authorID=' + ID.toString() + '">';
				}
				//This decodeURIComponent(escape()) thing effectively works to display proper encoding
				newHTML += '<b>' + decodeURIComponent(escape(name)) + '</b>';
				if(getPageName() != 'author.html'){
					newHTML += '</a>';
				}
				newHTML += '</p> ';
				
				//Birthdate
				if(birthdate != null){
					newHTML += '<p class="birthYear">Birth Year: ' + birthdate + '</p>';
				}
				
				//Deathdate
				if(deathdate != null){
					newHTML += '<p class="deathYear">Death Year: ' + deathdate + '</p>';
				}
				
				//Aliases
				if(alias != null){
					var aliases;
					if(typeof alias == 'string'){
						aliases = decodeURIComponent(escape(alias.substring(1, alias.length-1))).replace('|', ', ');
					}
					else{
						aliases = '';
						first = true;
						for(var q = 0; q < alias.length; q++){
							if(!first){
								aliases += ', '
							}
							first = false;
							aliases += decodeURIComponent(escape(alias[q]));
						}	
					}
					newHTML += '<p class="alias">Alias(es): ' + aliases + '</p>';
				}
				
				//Adds the new HTML to the page
				infoItem = document.getElementsByName(ID.toString())[0];
				infoItem.innerHTML = newHTML;
				storeInfo(tag, ID, 'basicInfo', true);
			}
		}).catch(function(error){
			//Error catch, removes entry if they do not exist or can not be loaded, logs the error otherwise.
			if(error.toString() != "Error: Couldn't decode bytes from ABI: 0x"){
				console.log(error);
			}
			else{
				removeEntry(ID);
			}
		});
	});
}

//Updates the split values when the slider is moved
function updateSplitValues(newValue, bookID){
	document.getElementById('foundationSplit'+bookID).innerHTML = "Foundation: " + newValue + "%";
	document.getElementById('bookSplit'+bookID).innerHTML = "Book: " + (100-newValue) + "%";
}

//Loads the address that information is stored at.
function loadInfoAddress(tag, ID, localStorageAccess=true){
	//If there is local storage, checks there for the info
	if(localStorageAccess){
		localStorageName = '<' + tag + ID.toString() + '>infoAddress';
		var localItem = localStorage.getItem(localStorageName);
		if(localItem != null){
			return Promise.resolve(parseLocalStorage(localItem));
		}
	}
	//Getting a book
	if(tag == 'b'){
		return libraryContract.methods.getBookAddress(ID).call()
		.then(function(res){
			if(localStorageAccess){
				storeInfo('b', ID, 'infoAddress', res);
			}
			return res;
		});
	}
	//Getting an author
	if(tag == 'a'){
		return libraryContract.methods.getAuthorAddress(ID).call()
		.then(function(res){
			if(localStorageAccess){
				storeInfo('a', ID, 'infoAddress', res);
			}
			return res;
		});
	}
}

//Loads a variable of a given type
function loadVariable(typeLetter, ID, infoName, useCache=true, hexEncodedInContract=false){
	//If the item can access local storage, first checks there.
	if(useCache){
		var localStorageName = '<' + typeLetter + ID.toString() + '>' + infoName;
		var localItem = localStorage.getItem(localStorageName);
		if(localItem != null){
			return Promise.resolve(parseLocalStorage(localItem));
		}
	}
	//Otherwise, pulls from the info address
	return loadInfoAddress(typeLetter, ID, useCache).then(function(res){
		//Creates a contract and a sdtring to be executed.
		var currentContract;
		var contractString;
		
		//Preps in the case of a book
		if(typeLetter == 'b'){
			currentContract = new web3.eth.Contract(loadBookABI(), res);
			contractString = "return contract.methods.book__" + infoName + "().call().then(function(success){"
		}
		//Preps in the case of an author
		else if(typeLetter == 'a'){
			currentContract = new web3.eth.Contract(loadAuthorABI(), res);
			contractString = "return contract.methods.author__" + infoName + "().call().then(function(success){"
		}
		//Adds a line to decode from hex when needed
		if(hexEncodedInContract){
			contractString += "success = hex2a(success);"
		}
		//Adds a line to store info if allowed
		if(useCache){
			contractString += "storeInfo('" + typeLetter + "', " + ID + ", '" + infoName + "', success);"
		}
		//Adds the final returns and error catched
		contractString += "return success;}).catch(function(error){if((error.toString() != \"Error: Couldn't decode bytes from ABI: 0x\") && (error.toString() != \"ReferenceError: name is not defined\") && (error.toString() != \"Error: Couldn't decode  from ABI: 0x\") && (error.toString() != \"Error: Couldn't decode bool from ABI: 0x\")){ console.log(error); } else{removeEntry(" + ID + ");}});";
		//Creates and then returns a function using the code generated above and the contract created above
		var tempFunction = new Function("contract", contractString);
		return tempFunction(currentContract);
	});
}

//Parses local storage for a given item
function parseLocalStorage(localItem){
	//Catching arrays
	if(localItem.charAt(0) == '[' && localItem.charAt(localItem.length-1) == ']'){
		localItem = localItem.substring(1,localItem.length-1);
		return localItem.split('|');
	}
	//Catching booleans
	if(localItem =='true'){
		return true;
	}
	if(localItem == 'false'){
		return false;
	}
	return localItem;
}

//Stores info based upon tags, name and the info itself
function storeInfo(tag, ID, infoName, info){
	//Generates the name to be stored - a custom tag is used at the start of each name
	var storeName = '<' + tag + ID + '>' + infoName;
	//If the info is an array, parses it based upon our custom representation of an array
	if(Array.isArray(info)){
		if(info.length == 0){
			localStorage.setItem(storeName, 'None');
		}
		else {
			storeArrStr = '[';
			for(var i = 0; i < info.length; i++){
				if(i != 0){
					storeArrStr += '|';
				}
				storeArrStr += info[i];
			}
			storeArrStr += ']';
			localStorage.setItem(storeName, storeArrStr);
		}
	}
	//Otherwise simply stores it
	else{
		localStorage.setItem(storeName, info);
	}
}

//Removes an entry with ID from the page
function removeEntry(ID){
	//Checks if the page actually exists
	if((typeof(document) !== "undefined") && (document != null)){
		//Finds the index of the book
		index = pageBooks[currentPage].indexOf(ID);
		//Adds the ID to bad IDs
		badID.push(ID);
		//Pushes to skipcache if it isn't there
		if(!skipCache.includes(ID)){
			skipCache.push(ID);
		}
		//If it is in pagebooks, it is spliced out
		if(index > -1){
			pageBooks[currentPage].splice(index, 1);
		}
		//Searches the page to check for the entry
		entry = document.getElementsByName(ID.toString())[0];
		//If the entry exists, it is removed
		if(entry != undefined){
			entry.remove()
			if(currentPage != null && currentPageType == 'r'){
				addRandomEntry();
			}
		}
	}
}

//Designed to recieve donations
function donate(bookID, invalidNumber=false, defaultSplit=false){
	//Sets up the donation value string
	var donationValueString;
	//If the user previously entered an invalid amound, tells them that.
	if(invalidNumber){
		donationValueString = prompt("You entered an invalid number. Please enter the size of your donation, in ETH:", "0");
	}
	//Otherwise puts a simple request for the value
	else{
		donationValueString = prompt("Please enter the size of your donation, in ETH:", "0");
	}
	//Turns the string to a float
	var donationValue = parseFloat(donationValueString);
	//I think this catches hitting cancel?
	if (donationValueString == null){
	}
	//Reprompts the user if the value isn't a number or if it's less than 0
	else if(isNaN(donationValue) || donationValue <= 0){
		donate(bookID, true);
	}
	//Otherwise completes the donation
	else {
		var foundationSplitNumerator;
		var foundationSplitDenominator = 100;
		//The default split is 30%, but the user may specify otherwise
		if(!defaultSplit){
			//Pulls a customn split from the slider
			foundationSplitNumerator = document.getElementById('slider'+bookID).value;
		}
		else{
			foundationSplitNumerator = 30;
		}
		//Gets the accounts to send a donation. accounts[0] generally contains the main user account
		web3.eth.getAccounts(function(error, accounts) {
			if(!error){
				//Sends the donation!
				libraryContract.methods.donate(bookID, foundationSplitNumerator, foundationSplitDenominator).send({
					from: accounts[0],
					value: web3.utils.toWei(donationValueString)
				}).on('transactionHash', function(hash){
					//Returns the tx hash to the user.
					alert('Your donation has sent! The transaction hash is: ' + hash);
				}).catch(function(fuck){
					if(fuck == 'Error: No "from" address specified in neither the given options, nor the default options.'){
						alert("You were unable to send an Ξ donation because you don't have a default address set. Consider downloading the Metamask Extension (for Chrome, Firefox, Opera, or Brave) or the Mist Browser.\nMetamask: https://metamask.io/\nMist: https://github.com/ethereum/mist")
					}
					else if(fuck.toString().indexOf("Error: Returned error: Error: MetaMask Tx Signature: User denied transaction signature." == -1)){
						alert("You cancelled your donation.");
					}
					else {
						alert('There was an error sending your donation. Error message: ' + fuck);
					}

				});
			}
			else{
				console.log(error)
			}
		});
	}
}

//Converts hex to ascii when needed
function hex2a(hex) {
	//removes the 0x at the start if needed
	if(hex.indexOf('0x')==0){
		hex = hex.substring(2);
	}
	//Turns it to a string 2 hex numerals at a time
	var str = '';
	for (var i = 0; i < hex.length; i += 2) {
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
	return str.trim();
}

//Calculates a storage cost based upon size and gas price
function calculateStorageCost(size, gasPrice) {
	//size in bytes, gasPrice in wei
	return 625*size*gasPrice;
}

//Starts a search
function searchBooks(){
	
	window.location.href = window.location.origin + window.location.pathname + '?search=' + document.getElementById("searchBar").value.toLowerCase();

}

function startSearch(searchString){
	//Empties the books array
	pageBooks = [[]];
	//Sets the page to 0 and resets the page numbers
	currentPage = 0;

	resetPageNumber();
	
	clearItems();

	//Sets the page type to s for search
	currentPageType = 's';
	//Resets the booksList
	booksList = document.getElementById("booksList");
	booksList.innerHTML = '';

	searchLocalStorage(searchString, booksList);
}

function clearItems(){
	authorInfo = document.getElementById("fullAuthorInfo");
	if (authorInfo != null){
		authorInfo.remove();
	}
}

//Pulls an authors books by ID
async function loadAuthorBooks(ID){
	//Empties the books array
	pageBooks = [[]];
	//Sets the page to 0
	currentPage = 0;
	//Sets the page type to a for author
	currentPageType = 'a';
	//Pulls the authors name then searches via name
	booksList = document.getElementById("booksList");
	searchLocalStorage((await loadVariable('a', ID, 'name', true, true)).toLowerCase(), booksList);
}

//Populates a page with random content
function populateRandomContent() {
	for(var i = 0; i < maxEntries; i++){
		addRandomEntry()
	}
}

function loadBooksByPage(){
	populateList = document.getElementById("booksList");
	var pageArray = pageBooks[currentPage];
	if(pageArray.length < maxEntries){
		displayNextButton(false);
	}
	for (var i = 0; i < pageArray.length; i++){
		populateList.innerHTML += '<li class="bookInfo" name="' + pageArray[i] + '"></li>';
		loadInfoBox('b', pageArray[i]);
	}
}

function genUniqueRandomNumberArray(arrayLength, max){
	var arr = [];
	while(arr.length < arrayLength){
		var randomnumber = Math.floor(Math.random()*max);
		if(arr.indexOf(randomnumber) == -1){
			arr[arr.length] = randomnumber;
		}
	}
	return arr;
}

function addRandomEntry(){
	var randomNumber = Math.floor(Math.random()*maxIndex);
	var i = 0;
	while(i < pageBooks.length){
		if(pageBooks[i].indexOf(randomNumber) != -1 || badID.indexOf(randomNumber) != -1){
			i = -1;
			randomNumber = Math.floor(Math.random()*maxIndex);
			if(badID.length >= maxIndex){
				i = pageBooks.length + maxEntries;
			}
		}
		i++;
	}
	if(i == pageBooks.length){
		populateList = document.getElementById("booksList");
		pageBooks[currentPage].push(randomNumber);
		populateList.innerHTML += '<li class="bookInfo" name="' + randomNumber + '"></li>';
		loadInfoBox('b', randomNumber);
	}
	else if (pageBooks[currentPage].length == 0){
		booksList.innerHTML = '<p class="center">No results found!</p>';
	}
}

var clearBooksSection = false;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function insertParameter(key, value, state=null){
	var searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
	var url = window.location.pathname + '?' + searchParams.toString();
	window.history.pushState(state, document.title, url);
}

function searchLocalStorage(searchString, booksList, start=0, retries=0){
	//currently only searches for books
	localStorageString = JSON.stringify(localStorage).toLowerCase();
	nextIndex = localStorageString.indexOf(searchString, start);
	if(nextIndex != -1 && pageBooks[currentPage].length < maxEntries){
		//Add item to result box
		var lastAuthorTag = localStorageString.lastIndexOf('<a', nextIndex);
		var lastBookTag = localStorageString.lastIndexOf('<b', nextIndex);
		
		if(lastBookTag > lastAuthorTag){
			var endOfBookTag = localStorageString.indexOf('>', lastBookTag);
			var ID = parseInt(localStorageString.slice(lastBookTag+2,endOfBookTag));
			var j = 0;
			while(j < pageBooks.length && !pageBooks[j].includes(ID) && !badID.includes(ID)){
				j++;
			}
			if(j == pageBooks.length){
				var endOfBookTag = localStorageString.indexOf('>', lastBookTag);
				booksList.innerHTML += '<li class="bookInfo" name="' + ID + '"></li>';
				pageBooks[currentPage].push(ID);
				loadInfoBox('b', ID);
			}
		}
		
		searchLocalStorage(searchString, booksList, nextIndex+1);
	}
	else{
		if(retries < 10){
			//Hides the next button if there are not enough entries on this page
			if(pageBooks[currentPage].length < maxEntries){
				displayNextButton(false);
			}
			if(pageBooks[currentPage].length == 0){
				booksList.innerHTML = '<p class="center">No results found!<br>We\'ll try checking again in a few seconds!</p>';
				clearSection = true;
				setTimeout(function(){searchLocalStorage(searchString, booksList, 0, retries+1);}, 250);
			}	
			else{
				setTimeout(function(){searchLocalStorage(searchString, booksList, 0, retries+1);}, 250);
			}
		}
		else{
			if(booksList.innerHTML == '<p class="center">No results found!<br>We\'ll try checking again in a few seconds!</p>'){
				booksList.innerHTML = '<p class="center">No results found!</p>';
			}
			console.log("Done searching!");
		}
	}
}

function checkIfCached(tag, ID){
	var localStorageName = '<' + tag + ID.toString() + '>basicInfo';
	var localItem = localStorage.getItem(localStorageName);
	//Need to double check how true is actually stored. Is it "true" or "1"?
	if(localItem == 'true'){
		return true;
	}
	return false;
}

function workerCacheBooks(existingWorker=null){
	if(existingWorker==null){
		existingWorker = new Worker('./js/workerCacheInfo.js');
		existingWorker.onmessage = function(e){
			logData = e.data;
			if(typeof logData[0] == 'string'){
				removeEntry(logData[1]);
				if(!skipCache.includes(logData[1])){
					skipCache.push(logData[1]);
				}
				if(logData[0] != 'Error: Invalid JSON RPC response: ""'){
					setTimeout(function(){workerCacheBooks(existingWorker);}, workerTimeOut);
				}
				else{
					console.log("Error connecting workers to a web3 endpoint. Stopping cacheing now...");
					existingWorker.terminate();
				}
			}
			else{
				for(var i = 0; i<logData.length; i++){
					if(typeof(logData[i][1]) !== 'undefined'){
						storeInfo('b', logData[i][0], logData[i][1], logData[i][2]);
					}
				}
				if(Array.isArray(logData)){
					storeInfo('b', logData[0][0], 'basicInfo', true);
				}
				setTimeout(function(){workerCacheBooks(existingWorker);}, workerTimeOut);
			}
		}
	}
	
	var randomnumber = Math.floor(Math.random()*maxIndex+1);
	if(!skipCache.includes(randomnumber)){
		if(checkIfCached('b', randomnumber)){
			skipCache.push(randomnumber);
			workerCacheBooks(existingWorker);
		}
		else{
			existingWorker.postMessage(randomnumber);
		}
	}
	else{
		if(skipCache.length < maxIndex){
			setTimeout(function(){workerCacheBooks(existingWorker);}, workerTimeOut);
		}
		else{
			console.log('Cached all books...');
			existingWorker.terminate();
		}
	}
}

function mainCacheBooks(index=-1){
	if(index == -1){
		var randomnumber = Math.floor(Math.random()*maxIndex+1);
		if(!skipCache.includes(randomnumber)){
			if(checkIfCached('b', randomnumber)){
				skipCache.push(randomnumber);
				mainCacheBooks();
			}
			else{
				loadData('b', randomnumber)
				.then(function(res){
					storeInfo('b', randomnumber, 'basicInfo', true);
					setTimeout(function(){mainCacheBooks()}, mainTimeOut);
				}).catch(function(error){
					skipCache.push(randomnumber);
					setTimeout(function(){mainCacheBooks()}, mainTimeOut);
				});
			}
		}
		else{
			if(skipCache.length < maxIndex){
				mainCacheBooks();
			}
			else{
				console.log('Cached all books...');
			}
		}
	}
	else{
		if(!skipCache.includes(index)){
			if(checkIfCached('b', index)){
				skipCache.push(index);
				mainCacheBooks();
			}
			else{
				loadData('b', index)
				.then(function(res){
					storeInfo('b', randmnumber, 'basicInfo', true);
					setTimeout(function(){mainCacheBooks(index+1)}, mainTimeOut);
				}).catch(function(error){
					skipCache.push(randomnumber);
					setTimeout(function(){mainCacheBooks(index+1)}, mainTimeOut);
				});
			}
		}
		else{
			if(index < maxIndex){
				setTimeout(function(){mainCacheBooks(index+1);}, 25);
			}
			else{
				console.log('Cached all books...');
			}
		}
	}
}

function cacheBooks(workerThreads) {
	if (window.Worker) {
		for(var i = 0; i < workerThreads; i++){
			workerCacheBooks();
		}
	}
	mainCacheBooks();
	mainCacheBooks(1);
}

function getPageName(){
	return window.location.pathname.split("/").pop();
}

function displayNextButton(yeaOrNo){
	var nextButton = document.getElementById("nextButton");
	if(yeaOrNo){
		nextButton.style.visibility = "visible";
	}
	else{
		nextButton.style.visibility = "hidden";
	}
}

function displayBackButton(yeaOrNo){
	var backButton = document.getElementById("backButton");
	if(yeaOrNo){
		backButton.style.visibility = "visible";
	}
	else{
		backButton.style.visibility = "hidden";
	}
}

function goToPage(page){
	if(page == 0){
		//Removes back button
		displayBackButton(false);
	}
	else{
		displayBackButton(true);
	}
	displayNextButton(false);
	
	currentPageNumber = document.getElementById('pageNumber' + currentPage);
	currentPageNumber.innerHTML = '<a href="javascript:goToPage(' + (currentPage).toString() + ');" title="' + (currentPage+1).toString() + '"> ' + (currentPage+1).toString() +' </a>'
	

	if(page > pageBooks.length-1){
		//Adds a link to generated pages
		var nextButton = document.getElementById("nextButton");
		var newPageNum = document.createElement("div");
		var nextPage = page + 1;
		newPageNum.appendChild(document.createTextNode(' ' + nextPage.toString() + ' '));
		newPageNum.id = 'pageNumber' + page.toString();
		nextButton.parentNode.insertBefore(newPageNum, nextButton);
		pageBooks.push([]);
	}
	else{
		newPageNumber = document.getElementById('pageNumber' + page);
		newPageNumber.innerHTML = page+1;
	}
	
	currentPage = page;
	populateList = document.getElementById("booksList");
	populateList.innerHTML = '';
	
	if(pageBooks[page].length > 0){
		loadBooksByPage();
	}
	else if(currentPageType == 'r'){
		populateRandomContent();
	}
	else if(currentPageType == 's'){
		searchLocalStorage(searchValue, populateList);
	}
}

var unchecked = null;

function setStorageFilter(){
	var reset = false;
	if(unchecked == null){
		if(!document.getElementById('uploaded').checked){
			unchecked = 'uploaded';
		}
		else if(!document.getElementById('notUploaded').checked){
			unchecked = 'notUploaded';
		}
		reset = true;
	}
	else if (unchecked == 'uploaded'){
		if(!document.getElementById('notUploaded').checked){
			document.getElementById('notUploaded').checked = true;
		}
		else if(document.getElementById('uploaded').checked){
			unchecked = null;
			reset = true;
		}
	}
	else if (unchecked == 'notUploaded'){
		if(!document.getElementById('uploaded').checked){
			document.getElementById('uploaded').checked = true;
		}
		else if(document.getElementById('notUploaded').checked){
			unchecked = null;
			reset = true;
		}
	}
	if(reset){
		currentFilters.set('blockchain', document.getElementById('uploaded').checked);
		currentFilters.set('server', document.getElementById('notUploaded').checked);
		reloadPage();
	}
}

function reloadPage(){
	resetPageNumber();
	populateList = document.getElementById("booksList");
	populateList.innerHTML = '';
	pageBooks = [[]];
	badID = [];
	skipCache = [];
	currentPage = 0;
	if(currentPageType == 'r'){
		populateRandomContent();
	}
	else if(currentPageType == 's'){
		searchBooks();
	}
	else if(currentPageType == 'a'){
		loadAuthorBooks(getParameterByName('authorID'));
	}
}

function resetPageNumber(){
	document.getElementById('pageNavigation').innerHTML = 
	'<div id="backButton" style="visibility: hidden;"><form action="javascript:goToPage(currentPage-1);" class="center"><button type="submit">Last Page</button></form></div><div id="pageNumber0">1</div><div id="nextButton" style="visibility: hidden;"><form action="javascript:goToPage(currentPage+1);" class="center"><button type="submit">Next Page</button></form></div>';
}
