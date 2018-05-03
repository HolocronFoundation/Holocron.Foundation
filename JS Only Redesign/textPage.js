var id = prompt('Please enter a book ID');

document.body.id = 'textBody';
document.body.innerHTML = '<div id="Holocron Info"><p>Welcome to the <a href="./">holocron.foundation library</a>.</p></div><div id="download" class="center"></div><div id="bookText"></div>';
loadCSS();
loadJS();
start();

function loadCSS(){
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = `#@charset "utf-8";.splitSlider{justify-content:center;display:flex}.blankFlex1{flex:1}.splitSlider .left{flex:2}.splitSlider .slider{flex:3}.splitSlider .right{flex:2}#fullAuthorInfo{border-bottom:5px groove burlywood}#pageNavigation div{display:inline-block;margin-left:.25vw;margin-right:.25vw}#pageNavigation{padding-top:1vh}#searchSettings div{display:inline-block}#searchBar{width:50em}#searchButton{width:10em}.title{white-space:pre-wrap}.name a{text-decoration:none;color:black}ul.bullet{list-style-type:circle;margin:.75em;padding-top:.25em;padding-bottom:.25em;padding-right:2em;padding-left:2em}#logo{display:block;margin-left:auto;margin-right:auto;width:6em;height:auto}li.bookInfo{max-height:0;overflow:hidden;opacity:0;padding-bottom:1.5vh;text-align:center;border-bottom:5px groove burlywood;transition-timing-function:ease-out}li.bookInfo.loaded{max-height:1000px;opacity:1;transition:opacity 3s,max-height 4s}#fullBookInfo{padding-bottom:1.5vh;text-align:center}li.bookInfo.sample{border-bottom:2px groove rgb(104,185,255)}section{display:flex;flex-flow:column;height:100vh}header{background:rgb(104,185,255)}header.library{background:navajowhite}#content{background:rgb(156,217,255);overflow-y:auto;overflow-x:hidden;width:80vw;margin:auto;padding-left:3.75vw;padding-right:3.75vw;padding-top:1vh;padding-bottom:1vh;max-width:666px;flex-direction:column;flex:1}#content.library{background:bisque}#content.phoenix{background:mistyrose}footer{background:rgb(57,157,255)}footer.library{background:navajowhite}footer.library p{color:black}footer.library p a{color:black}footer.phoenix{background-color:rgb(232,85,74)}#search div{padding-bottom:.5vh}.center{text-align:center}.logosmall{margin-left:auto;margin-right:auto;height:3em;width:auto;vertical-align:middle;padding-bottom:.4em}ul.navbar{overflow:hidden;background-color:rgb(57,157,255);top:0;left:0;width:100vw}ul.navbar.library{background-color:rgb(227,186,143)}ul.navbar.phoenix{background-color:rgb(232,85,74)}li.navbar.phoenix{background-color:rgb(232,85,74)}li.navbar.phoenix a:hover{background-color:rgb(233,92,85)}li.navbar.reincarnationline{background-color:white}li.navbar.reincarnationline a{color:black}li.navbar.reincarnationline a:hover{background-color:whitesmoke}li.navbar.library{background-color:rgb(227,186,143)}li.navbar.library a:hover{background-color:rgb(229,190,151)}li.navbar{float:left}li.navbar a{display:block;text-align:center;padding:14px 16px;text-decoration:none;color:white}li.navbar.holocron{background-color:rgb(57,157,255)}li.navbar.holocron a:hover{background-color:rgb(71,166,255)}ul{list-style-type:none;margin:0;padding:0}body{margin:0;background-color:rgb(104,185,255)}body.library{background-color:maroon}body.phoenix{background-color:firebrick}body#textBody{margin-left:2.5vw;margin-right:2.5vw;margin-top:1.5vh;margin-bottom:1.5vh;background-color:beige}footer p{color:white}footer p a{text-decoration:none;color:white}footer p a:hover{color:silver}#bookText{text-align:center}#bookText p{white-space:pre-wrap;display:inline-block;text-align:left}`;
	document.getElementsByTagName('head')[0].appendChild(style);
}

function loadLibraryContractABI() {
	return [{"name": "Donation", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "int128", "name": "_value", "indexed": false}, {"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "BookUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "TextUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "getTextAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 672}, {"name": "getBookAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 702}, {"name": "addBook", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "bookAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22006}, {"name": "getAuthorAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "authorID"}], "constant": true, "payable": false, "type": "function", "gas": 762}, {"name": "addAuthor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "authorAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22066}, {"name": "getSubjectAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "subjectID"}], "constant": true, "payable": false, "type": "function", "gas": 822}, {"name": "getLoCAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "LoCID"}], "constant": true, "payable": false, "type": "function", "gas": 852}, {"name": "__init__", "outputs": [], "inputs": [{"type": "address[3]", "name": "_foundationAddresses"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeFoundationAddresses", "outputs": [], "inputs": [{"type": "int128", "name": "index"}, {"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22310}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 41441}, {"name": "donateWithDifferentDonor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}, {"type": "address", "name": "donorAddress"}], "constant": false, "payable": true, "type": "function", "gas": 41416}, {"name": "setUpdateAddress", "outputs": [], "inputs": [{"type": "address", "name": "newUpdateAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22069}, {"name": "setTextAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "_textAddress"}], "constant": false, "payable": false, "type": "function", "gas": 26206}, {"name": "setExpansionAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 4811}, {"name": "withdrawFunds", "outputs": [], "inputs": [{"type": "int128", "name": "bookID"}, {"type": "address", "name": "withdrawalAddress"}, {"type": "int128", "name": "withdrawal"}], "constant": false, "payable": false, "type": "function", "gas": 37154}, {"name": "setMaxIndex", "outputs": [], "inputs": [{"type": "int128", "name": "_maxIndex"}], "constant": false, "payable": false, "type": "function", "gas": 22240}, {"name": "foundationAddresses", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1150}, {"name": "maxIndex", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 963}, {"name": "updateAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 993}, {"name": "updatedContract", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1023}, {"name": "books", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1242}, {"name": "textAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1272}, {"name": "authors", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1302}, {"name": "subjects", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1332}, {"name": "LoC", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1362}];
}

function loadBookABI(){
	return [{"name": "__init__", "outputs": [], "inputs": [{"type": "address", "name": "_parentAddress"}, {"type": "address", "name": "_modifierAddress"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 3368}, {"name": "changeParentAddress", "outputs": [], "inputs": [{"type": "address", "name": "newAddress"}, {"type": "int128", "name": "index"}], "constant": false, "payable": false, "type": "function", "gas": 21587}, {"name": "addExpansionAddress", "outputs": [], "inputs": [{"type": "address", "name": "_expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 41418}, {"name": "addText", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 21460}, {"name": "recieveDonation", "outputs": [], "inputs": [{"type": "int128", "name": "value"}], "constant": false, "payable": false, "type": "function", "gas": 21967}, {"name": "version", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "modifierAddresses", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 880}, {"name": "expansionAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 693}, {"name": "usesExpansion", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 723}, {"name": "book__id", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 831}, {"name": "book__title", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2180}, {"name": "book__copyright", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 891}, {"name": "book__language", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1866}, {"name": "book__libraryOfCongress", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1896}, {"name": "book__subjects", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1926}, {"name": "book__authorIDs", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1950}, {"name": "book__authorRoles", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1986}, {"name": "book__size", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1071}, {"name": "book__donations", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1101}, {"name": "book__textAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1131}, {"name": "book__uploaded", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1161}];

}

function loadAuthorABI(){
	return [{"name": "__init__", "outputs": [], "inputs": [{"type": "address", "name": "_parentAddress"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeParentAddress", "outputs": [], "inputs": [{"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 20627}, {"name": "addExpansionAddress", "outputs": [], "inputs": [{"type": "address", "name": "_expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 40663}, {"name": "version", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 543}, {"name": "parentAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 573}, {"name": "expansionAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 603}, {"name": "usesExpansion", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "author__name", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1686}, {"name": "author__alias", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2084}, {"name": "author__birthdate", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1746}, {"name": "author__deathdate", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1776}, {"name": "author__id", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 861}];
}

function loadZipABI(){
	return [{"name": "__init__", "outputs": [], "inputs": [{"type": "address", "name": "_listingAddress"}, {"type": "address", "name": "_modifierAddress"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "setZipBytes", "outputs": [], "inputs": [{"type": "int128", "name": "_index"}, {"type": "bytes", "name": "newZip"}], "constant": false, "payable": false, "type": "function", "gas": 5187494}, {"name": "listingAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 513}, {"name": "modifierAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 543}, {"name": "zipBytes", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 97105}, {"name": "zipBytesFinal", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 28850}];
}

var authorABI = loadAuthorABI();

var zipABI = loadZipABI();

var libraryAddress = '0x240Ffc557848b5a28bB2df8370B35e7a1B35797D';

var thirdPartyProvider;

var libraryContract = new web3.eth.Contract(loadLibraryContractABI(), libraryAddress);

function loadBookTextChunk(bookID, chunk){
	return libraryContract.methods.getTextAddress(bookID).call().then(function(res){
		var textContract = new web3.eth.Contract(loadZipABI(), res);
		return textContract.methods.zipBytes(chunk).call().then(function(success){return success;});
	});
}

function loadFinalBookTextChunk(bookID){
	return libraryContract.methods.getTextAddress(bookID).call().then(function(res){
		var textContract= new web3.eth.Contract(loadZipABI(), res);
		return textContract.methods.zipBytesFinal().call().then(function(success){return success;})
	});
}

async function getBookTextBlockchain(bookID) {
	
	var size = await loadVariable('b', bookID, 'size');
	var numByteArrays = Math.floor(size/4096);
	if (size%255 !== 0) {
		numByteArrays++;
	}
	
	bytePromises = [];

	for(var i = 0; i<numByteArrays; i++){
		if(i!=numByteArrays-1){
			bytePromises.push(await loadBookTextChunk(bookID, i));
		}
		else{
			bytePromises.push(await loadFinalBookTextChunk(bookID));
		}
	}
	
	var promises = await Promise.all(bytePromises);
	
	var arrays = []
	
	for(var i = 0; i<promises.length; i++){
		var newArray = hexStringToByte(promises[i].substring(2));
		arrays.push(newArray);
	}
	
	var returnArray = new Uint8Array([].concat.apply([], arrays));
	
	return returnArray;
}

function hexStringToByte(str) {
  
  var a = [];
  for (var i = 0, len = str.length; i < len; i+=2) {
    a.push(parseInt(str.substr(i,2),16));
  }
  
  return a;
}

function getBookTextServer(bookID) {
	return new JSZip.external.Promise(function(resolve, reject) {
		var folderID = Math.floor(bookID/100)
		JSZipUtils.getBinaryContent('holocron.foundation/library/zip/' + folderID + '/' + bookID +'.zip', function(err, data) {
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
	
	document.getElementById('Holocron Info').innerHTML = '<p>Welcome to the <a href="./">holocron.foundation library</a>.</p>';
	
	document.getElementById('bookText').innerHTML = '<p></p>';
	
	var zip = new JSZip();
	
	var bookName = await loadVariable('b', bookID, 'title', true, true);
	
	document.title = 'Holocron.Foundation ♢ ' + bookName;
	
	var holocronInfoText = 'Welcome to the <a href="holocron.foundation/library/">holocron.foundation library</a>. You are reading <a href="holocron.foundation/library/book.html?bookID=' + bookID + '">' + bookName + '</a>. To the best of our knowledge, this text is Public Domain within the United States, so feel free to use the text however you would like.';
	
	document.getElementById('Holocron Info').innerHTML = '<p>' + holocronInfoText + '</p>';
	
	var uploaded = await loadVariable('b', bookID, 'uploaded', false);
	
	if (uploaded) {
		holocronInfoText += ' This text has been uploaded to the Ethereum Blockchain. You are viewing the copy stored there. Enjoy!';
	}
	else {
		holocronInfoText += ' This text has <b>NOT</b> been uploaded to the Ethereum Blockchain. You are viewing a copy stored on our server. If you would like to contribute Ethereum <a href="#" onclick="donate(' + bookID + ', false, true)">click here</a> to immeadiately send a donation with our default fee, or head to <a href="holocron.foundation/library/book.html?bookID=' + bookID + '">this books page</a> to change it. If you would like to give Bitcoin, Litecoin, or USD please see our <a href="../donate.html">donations page</a>.';
	}
	
	document.getElementById('Holocron Info').innerHTML = '<p>' + holocronInfoText + '<p>';
	
	document.getElementById('bookText').innerHTML = '<p>The text is loading...</p>';
	
	var fullTextZip;
	
	if (uploaded) {
		fullTextZip = await getBookTextBlockchain(bookID); //Loads the file from the blockchain
	}
	else {
		fullTextZip = await getBookTextServer(bookID); //Loads the file from the server
	}
	
	//unzip file here
	JSZip.loadAsync(fullTextZip)
	.then(function(zip){
		return zip.file(bookID + '.txt').async('string');
	})
	.then(function success(text) {
		
		var downloadDiv = document.getElementById('download');
		
		var downloadLink = document.createElement('a');
		downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		downloadLink.setAttribute('download', bookName + '.txt');
		downloadLink.appendChild(document.createTextNode('Download this text'));
		downloadDiv.appendChild(downloadLink);
		
		document.getElementById('bookText').innerHTML = '<p>' + text + '</p>';
	},    function error(e) {
   		document.getElementById('bookText').innerHTML = '<p> An error has occurred. Please refresh the page and check your connection. If this error persists please let us know about it at samuel.troper@holocron.founcation and note the following error: ' + e + '</p>';
	});
}

function loadVariable(typeLetter, ID, infoName, useCache=true, hexEncodedInContract=false){
	if(useCache){
		var localStorageName = '<' + typeLetter + ID.toString() + '>' + infoName;
		var localItem = localStorage.getItem(localStorageName);
		if(localItem != null){
			return Promise.resolve(parseLocalStorage(localItem));
		}
	}
	return loadInfoAddress(typeLetter, ID, useCache).then(function(res){
		
		var currentContract;
		var contractString;
		
		if(typeLetter == 'b'){
			currentContract = new web3.eth.Contract(loadBookABI(), res);
			contractString = "return contract.methods.book__" + infoName + "().call().then(function(success){"
		}
		else if(typeLetter == 'a'){
			currentContract = new web3.eth.Contract(authorABI, res);
			contractString = "return contract.methods.author__" + infoName + "().call().then(function(success){"
		}
		
		if(hexEncodedInContract){
			contractString += "success = hex2a(success);"
		}
		
		if(useCache){
			contractString += "storeInfo('" + typeLetter + "', " + ID + ", '" + infoName + "', success);"
		}
		
		contractString += "return success;}).catch(function(error){if((error.toString() != \"Error: Couldn't decode bytes from ABI: 0x\") && (error.toString() != \"ReferenceError: name is not defined\") && (error.toString() != \"Error: Couldn't decode  from ABI: 0x\") && (error.toString() != \"Error: Couldn't decode bool from ABI: 0x\")){ console.log(error); } else{removeEntry(" + ID + ");}});";
		
		var tempFunction = new Function("contract", contractString);
		
		return tempFunction(currentContract);
	});
}

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

function storeInfo(tag, ID, infoName, info){
	var storeName = '<' + tag + ID + '>' + infoName;
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
	else{
		localStorage.setItem(storeName, info);
	}
}

function donate(bookID, invalidNumber=false, defaultSplit=false){
	//need bookID, foundationSplitNumerator, foundationSplitDenominator, donationvalue
	var donationValueString;
	if(invalidNumber){
		donationValueString = prompt("You entered an invalid number. Please enter the size of your donation, in ETH:", "0");
	}
	else{
		donationValueString = prompt("Please enter the size of your donation, in ETH:", "0");
	}
	var donationValue = parseFloat(donationValueString);
	if (donationValueString == null){
	}
	else if(isNaN(donationValue) || donationValue <= 0){
		donate(bookID, true);
	}
	else {
		var foundationSplitNumerator;
		var foundationSplitDenominator = 100;
		if(!defaultSplit){
			foundationSplitNumerator = document.getElementById('slider'+bookID).value;
		}
		else{
			foundationSplitNumerator = 30;
		}
		web3.eth.getAccounts(function(error, accounts) {
			if(!error){
				libraryContract.methods.donate(bookID, foundationSplitNumerator, foundationSplitDenominator).send({
					from: accounts[0],
					value: web3.utils.toWei(donationValueString)
				}).on('transactionHash', function(hash){
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

function hex2a(hex) {
	if(hex.indexOf('0x')==0){
		hex = hex.substring(2);
	}
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
    return str.trim();
}

function loadInfoAddress(tag, ID, localStorageAccess=true){
	if(localStorageAccess){
		localStorageName = '<' + tag + ID.toString() + '>infoAddress';
		var localItem = localStorage.getItem(localStorageName);
		if(localItem != null){
			return Promise.resolve(parseLocalStorage(localItem));
		}
	}
	if(tag == 'b'){
		return libraryContract.methods.getBookAddress(ID).call()
		.then(function(res){
			if(localStorageAccess){
				storeInfo('b', ID, 'infoAddress', res);
			}
			return res;
		});
	}
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

function start(){
	if(parseInt(id) == null || parseInt(id) == ''){
		alert('That book ID does not exist!');
	}
	else{
		loadTextPage(parseInt(id));
	}
}
