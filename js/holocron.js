//Javascript for the holocron.foundation

function loadLibraryContractABI() {
	return [{"name": "Donation", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "int128", "name": "_value", "indexed": false}, {"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "BookUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "TextUploaded", "inputs": [{"type": "int128", "name": "_bookID", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "getBookAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "bookID"}], "constant": true, "payable": false, "type": "function", "gas": 672}, {"name": "addBook", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "bookAddress"}], "constant": false, "payable": false, "type": "function", "gas": 21976}, {"name": "getAuthorAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "authorID"}], "constant": true, "payable": false, "type": "function", "gas": 732}, {"name": "addAuthor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "authorAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22036}, {"name": "getSubjectAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "subjectID"}], "constant": true, "payable": false, "type": "function", "gas": 792}, {"name": "getLoCAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "LoCID"}], "constant": true, "payable": false, "type": "function", "gas": 822}, {"name": "__init__", "outputs": [], "inputs": [{"type": "address[3]", "name": "_foundationAddresses"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeFoundationAddresses", "outputs": [], "inputs": [{"type": "int128", "name": "index"}, {"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22280}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 41411}, {"name": "donateWithDifferentDonor", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}, {"type": "address", "name": "donorAddress"}], "constant": false, "payable": true, "type": "function", "gas": 41386}, {"name": "setUpdateAddress", "outputs": [], "inputs": [{"type": "address", "name": "newUpdateAddress"}], "constant": false, "payable": false, "type": "function", "gas": 22039}, {"name": "setTextAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "textAddress"}], "constant": false, "payable": false, "type": "function", "gas": 6101}, {"name": "setExpansionAddress", "outputs": [], "inputs": [{"type": "int128", "name": "id"}, {"type": "address", "name": "expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 4781}, {"name": "foundationAddresses", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1060}, {"name": "updateAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 873}, {"name": "updatedContract", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 903}, {"name": "books", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1122}, {"name": "authors", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1152}, {"name": "subjects", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1182}, {"name": "LoC", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "int128", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1212}];
}

function loadBookABI(){
	return [{"name": "__init__", "outputs": [], "inputs": [{"type": "address", "name": "_parentAddress"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "donate", "outputs": [], "inputs": [{"type": "int128", "name": "foundationSplitNumerator"}, {"type": "int128", "name": "foundationSplitDenominator"}], "constant": false, "payable": true, "type": "function", "gas": 3050}, {"name": "changeParentAddress", "outputs": [], "inputs": [{"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 20657}, {"name": "addExpansionAddress", "outputs": [], "inputs": [{"type": "address", "name": "_expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 40693}, {"name": "addText", "outputs": [], "inputs": [{"type": "address", "name": "_textAddress"}], "constant": false, "payable": false, "type": "function", "gas": 40879}, {"name": "recieveDonation", "outputs": [], "inputs": [{"type": "int128", "name": "value"}], "constant": false, "payable": false, "type": "function", "gas": 21242}, {"name": "version", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "parentAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 663}, {"name": "expansionAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 693}, {"name": "usesExpansion", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 723}, {"name": "book__id", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 831}, {"name": "book__title", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2180}, {"name": "book__copyright", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 891}, {"name": "book__language", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1866}, {"name": "book__libraryOfCongress", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1896}, {"name": "book__subjects", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1926}, {"name": "book__authorIDs", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1950}, {"name": "book__authorRoles", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1986}, {"name": "book__size", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1071}, {"name": "book__donations", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1101}, {"name": "book__textAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1131}, {"name": "book__uploaded", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1161}];

}

function loadAuthorABI(){
	return [{"name": "__init__", "outputs": [], "inputs": [{"type": "address", "name": "_parentAddress"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeParentAddress", "outputs": [], "inputs": [{"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 20627}, {"name": "addExpansionAddress", "outputs": [], "inputs": [{"type": "address", "name": "_expansionAddress"}], "constant": false, "payable": false, "type": "function", "gas": 40663}, {"name": "version", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 543}, {"name": "parentAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 573}, {"name": "expansionAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 603}, {"name": "usesExpansion", "outputs": [{"type": "bool", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "author__name", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1686}, {"name": "author__alias", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 2084}, {"name": "author__birthdate", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1746}, {"name": "author__deathdate", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1776}, {"name": "author__id", "outputs": [{"type": "int128", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 861}];
}

function loadZipABI(){
	return 'FIX THIS'
}

var bookABI = loadBookABI();

var authorABI = loadAuthorABI();

var zipABI;

var libraryAddress = '0xdA0835F4Ea95231B1CED731Ecd7B691139D6B4F5';

var thirdPartyProvider;
var web3 = setupWeb3();

var libraryContract = new web3.eth.Contract(loadLibraryContractABI(), libraryAddress); //This loads the library ABI, responsible for most functions on our site

function checkIfUploaded(bookID) {
	"use strict";
	var bookContract = web3.eth.contract(bookABI).at(); //update
	return bookContract.book.uploaded();
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
		thirdPartyProvider = true;
		return new Web3(web3.currentProvider); //If you already have a web3 provider (e.g. metamask) uses that
	}
	else {
		thirdPartyProvider = false;
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

function getAuthors(bookID){
	var localStorageName = '<' + bookID.toString() + '>authors';
	var localItem = localStorage.getItem(localStorageName);
	if(localItem != null){
		return Promise.resolve(parseLocalStorage(localItem));
	}
	return loadInfoAddress(bookID).then(function(res){
		currentContract = new web3.eth.Contract(bookABI, res);
		return currentContract.methods.book__authorIDs().call().then(async function(res){
			if(res == null){
				storeBookInfo(bookID, 'authors', 'None');
				return 'None';
			}
			else{
				var authorIDArray =  res.slice(2).match(/.{1,4}/g);
				var authorNameArray = [];
				for(var j = 0; j<authorIDArray.length; j++){
					var addr = await libraryContract.methods.getAuthorAddress(parseInt(authorIDArray[j], 16)).call();
					var authorContract = new web3.eth.Contract(authorABI, addr);
					var name = await authorContract.methods.author__name().call();
					authorNameArray.push(hex2a(name));
				}
				storeBookInfo(bookID, 'authors', authorNameArray);
				return authorNameArray;
			}
		});
	});
}

function getAuthorRoles(bookID){
	return loadInfoAddress(bookID).then(function(res){
		currentContract = new web3.eth.Contract(bookABI, res);
		return currentContract.methods.book__authorRoles().call().then(function(res1){
			if(res1 == null){
				return 'None';
			}
			var authorRolesIDArray = res1.slice(2).match(/.{1,2}/g);
			storeBookInfo(bookID, 'authorRoles', authorRolesIDArray);
			return authorRolesIDArray;
		});
	});
}

function loadBookInfoBox(bookID){
	loadInfoAddress(bookID)
	.then(function(res){
		var titlePromise = loadBookVariable(bookID, 'title', true);
		var langPromise = loadBookVariable(bookID, 'language', true);
		var sizePromise = loadBookVariable(bookID, 'size');
		var authorPromise = getAuthors(bookID); //works
		var weiPromise = loadBookVariable(bookID, 'donations');
		var authorRolePromise = getAuthorRoles(bookID); //works
		var authorIDsPromise = loadBookVariable(bookID, 'authorIDs');
		Promise.all([titlePromise, authorPromise, langPromise, sizePromise, weiPromise, authorRolePromise, authorIDsPromise]).then(async function(values) {
			console.log(values[0]);
			console.log(values[1]); //works
			console.log(values[2]);
			console.log(values[3]);
			console.log(values[4]);
			console.log(values[5]); //works
			console.log(values[6]);
				
			var titleClean = values[0];
			var languageClean = values[2];
			var size = values[3];
			var authorRolesIDArray = values[5];
			var donationsETH = web3.utils.fromWei(values[4].toString(), "ether");
			var gweiStorageCost = calculateStorageCost(size, web3.utils.toWei("9", "gwei"));
			var newHTML = '<p class="title"><a href="./book.html?bookID=' + bookID.toString() + '"><b>' + titleClean + '</b></a></p> ';
			if(authorRolesIDArray != 'None'){
				var authorIDArray =  values[6].slice(2).match(/.{1,4}/g);
				var authorNameArray = values[1];
				console.log(authorNameArray);
				console.log(typeof(authorNameArray));
				newHTML += '<p class="author">';
				var lastRole = -1;
				for (var k = 0; k<authorNameArray.length; k++){
					var currentRoleID = authorRolesIDArray[k];
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
					newHTML += '<a href="./author.html?authorID=' + parseInt(authorIDArray[k], 16) + '">' + authorNameArray[k] + '</a>';
				}
				newHTML += '</p>';
			}
			newHTML += '<p class="lang">Language: ' + languageClean + '</p>';
			newHTML += '<meter value="' + donationsETH + '" min="0" max="2.3"></meter>';
			newHTML += '<p class="recieved">' + donationsETH + ' Ξ Recieved / ≈' + web3.utils.fromWei(gweiStorageCost.toString(), "ether") + ' Ξ Needed</p>';
			newHTML += '<div class="splitSlider"><p class="blankFlex1"></p><p class="left">Foundation</p><input type="range" min="0" max="100" value="30" class="slider"><p class="right">Book</p><p class="blankFlex1"></p></div>';
			newHTML += '<p>Donate with Ξ</p>';
			newHTML += '<p><a href="./donate.html?bookID=' + bookID.toString() + '">Donate with BTC, LTC, or USD</a></p>';
			infoItem = document.getElementsByName(bookID.toString())[0];
			infoItem.innerHTML = newHTML;
			storeBookInfo(bookID, 'basicInfo', true);
		}).catch(function(error){
			console.log(error);
			removeBookEntry(bookID);
		});
	});
}

function loadInfoAddress(bookID){
	localStorageName = '<' + bookID.toString() + '>infoAddress';
	var localItem = localStorage.getItem(localStorageName);
	if(localItem != null){
		return Promise.resolve(parseLocalStorage(localItem));
	}
	return libraryContract.methods.getBookAddress(bookID).call()
	.then(function(res){
		storeBookInfo(bookID, 'infoAddress', res);
		return res;
	});
}

function loadBookVariable(bookID, infoName, hexEncodedInContract=false){
	var localStorageName = '<' + bookID.toString() + '>' + infoName;
	var localItem = localStorage.getItem(localStorageName);
	if(localItem != null){
		return Promise.resolve(parseLocalStorage(localItem));
	}
	return loadInfoAddress(bookID).then(function(res){
		currentContract = new web3.eth.Contract(bookABI, res);
		if(hexEncodedInContract){
			var tempFunction = new Function("contract", "return contract.methods.book__" + infoName + "().call().then(function(success){ var decodedInfo = hex2a(success); storeBookInfo(" + bookID + ", '" + infoName + "', decodedInfo); return decodedInfo;}).catch(function(error){ console.log(error); removeBookEntry(" + bookID + ");});");
			return tempFunction(currentContract);
		}
		var tempFunction = new Function("contract", "return contract.methods.book__" + infoName + "().call().then(function(success){storeBookInfo(" + bookID + ", '" + infoName + "', success); return success;}).catch(function(error){ console.log(error); removeBookEntry(" + bookID + ");});");
		return tempFunction(currentContract);
	});
}

function parseLocalStorage(localItem){
	if(localItem.charAt(0) == '[' && localItem.charAt(localItem.length-1) == ']'){
		localItem = localItem.substring(1,localItem.length-1);
		return localItem.split('|');
	}
	return localItem;
}

function storeBookInfo(bookID, infoName, info){
	var storeName = '<' + bookID.toString() + '>' + infoName;
	if(Array.isArray(info)){
		if(info.length == 0){
			localStorage.setItem(storeName, 'None');
			//console.log('Cached item with name: ' + storeName + ', Data: None');
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
			//console.log('Cached item with name: ' + storeName + ', Data: ' + storeArrStr);
		}
	}
	else{
		localStorage.setItem(storeName, info);
		//console.log('Cached item with name: ' + storeName + ', Data: ' + info);
	}
}

function removeBookEntry(bookID){
	entry = document.getElementsByName(bookID.toString())[0];
	if(entry != undefined){
		entry.remove()
	}
}

function donate(){
	//need bookID, foundationSplitNumerator, foundationSplitDenominator, donationvalue
	libraryContract.methods.donate(bookID, foundationSplitNumerator, foundationSplitDenominator).send({
		value: donationValue
	}).on('transactionHash', function(hash){
		alert('Your donation has sent! The transaction hash is: ' + hash);
	}).on('error', function(error){
		alert('There was an error sending your donation. Error message: ' + error);
	});
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

function calculateStorageCost(size, gasPrice) {
	//size in bytes, gasPrice in wei
	return 625*size*gasPrice;
}

function populateRandomContent(loadItems, maxIndex) {
	populateList = document.getElementById("booksList");
	var randomArray = genUniqueRandomNumberArray(loadItems, maxIndex);
	for (var i = 0; i < randomArray.length; i++){
		populateList.innerHTML += '<li class="bookInfo" name="' + randomArray[i] + '"></li>';
	}
	loadBookInfoBoxes();
}

function genUniqueRandomNumberArray(arrayLength, max){
	var arr = [];
	while(arr.length < arrayLength){
		var randomnumber = Math.floor(Math.random()*max) + 1;
		if(arr.indexOf(randomnumber) == -1){
			arr[arr.length] = randomnumber;
		}
	}
	return arr;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}