var id = prompt('Please enter a book ID');

document.body.id = 'textBody'
document.body.innerHTML = `<div id="Holocron Info">
			<p>Welcome to the <a href="./">holocron.foundation library</a>.</p>
		</div>
		
		<div id="download" class="center">
		
		</div>

		<div id="bookText">

		</div>
		<script>
		function start(){
			if(` + parseInt(id) + `== null ||` + parseInt(id) + `==''){
				document.location.href = "./";
			}
			loadTextPage(` + parseInt(id) + `);
		}
		</script>`;
loadCSS();
loadJS();
start();

function loadCSS(){
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = "#@charset "utf-8";.splitSlider{justify-content:center;display:flex}.blankFlex1{flex:1}.splitSlider .left{flex:2}.splitSlider .slider{flex:3}.splitSlider .right{flex:2}#fullAuthorInfo{border-bottom:5px groove burlywood}#pageNavigation div{display:inline-block;margin-left:.25vw;margin-right:.25vw}#pageNavigation{padding-top:1vh}#searchSettings div{display:inline-block}#searchBar{width:50em}#searchButton{width:10em}.title{white-space:pre-wrap}.name a{text-decoration:none;color:black}ul.bullet{list-style-type:circle;margin:.75em;padding-top:.25em;padding-bottom:.25em;padding-right:2em;padding-left:2em}#logo{display:block;margin-left:auto;margin-right:auto;width:6em;height:auto}li.bookInfo{max-height:0;overflow:hidden;opacity:0;padding-bottom:1.5vh;text-align:center;border-bottom:5px groove burlywood;transition-timing-function:ease-out}li.bookInfo.loaded{max-height:1000px;opacity:1;transition:opacity 3s,max-height 4s}#fullBookInfo{padding-bottom:1.5vh;text-align:center}li.bookInfo.sample{border-bottom:2px groove rgb(104,185,255)}section{display:flex;flex-flow:column;height:100vh}header{background:rgb(104,185,255)}header.library{background:navajowhite}#content{background:rgb(156,217,255);overflow-y:auto;overflow-x:hidden;width:80vw;margin:auto;padding-left:3.75vw;padding-right:3.75vw;padding-top:1vh;padding-bottom:1vh;max-width:666px;flex-direction:column;flex:1}#content.library{background:bisque}#content.phoenix{background:mistyrose}footer{background:rgb(57,157,255)}footer.library{background:navajowhite}footer.library p{color:black}footer.library p a{color:black}footer.phoenix{background-color:rgb(232,85,74)}#search div{padding-bottom:.5vh}.center{text-align:center}.logosmall{margin-left:auto;margin-right:auto;height:3em;width:auto;vertical-align:middle;padding-bottom:.4em}ul.navbar{overflow:hidden;background-color:rgb(57,157,255);top:0;left:0;width:100vw}ul.navbar.library{background-color:rgb(227,186,143)}ul.navbar.phoenix{background-color:rgb(232,85,74)}li.navbar.phoenix{background-color:rgb(232,85,74)}li.navbar.phoenix a:hover{background-color:rgb(233,92,85)}li.navbar.reincarnationline{background-color:white}li.navbar.reincarnationline a{color:black}li.navbar.reincarnationline a:hover{background-color:whitesmoke}li.navbar.library{background-color:rgb(227,186,143)}li.navbar.library a:hover{background-color:rgb(229,190,151)}li.navbar{float:left}li.navbar a{display:block;text-align:center;padding:14px 16px;text-decoration:none;color:white}li.navbar.holocron{background-color:rgb(57,157,255)}li.navbar.holocron a:hover{background-color:rgb(71,166,255)}ul{list-style-type:none;margin:0;padding:0}body{margin:0;background-color:rgb(104,185,255)}body.library{background-color:maroon}body.phoenix{background-color:firebrick}body#textBody{margin-left:2.5vw;margin-right:2.5vw;margin-top:1.5vh;margin-bottom:1.5vh;background-color:beige}footer p{color:white}footer p a{text-decoration:none;color:white}footer p a:hover{color:silver}#bookText{text-align:center}#bookText p{white-space:pre-wrap;display:inline-block;text-align:left}";
	document.getElementsByTagName('head')[0].appendChild(style);
}

function loadJS(){
	eval(`if(typeof window!=='undefined'){window.addEventListener('load',function(){web3=setupWeb3();libraryContract.methods.maxIndex().call().then(function(res){maxIndex=parseInt(res)})})}
var currentPage=null;var currentPageType=null;var pageBooks=[[]];var skipCache=[];var badID=[];var searchValue;var currentFilters=new Map([['server',!0],['blockchain',!0]]);var web3;var workerTimeOut=100;var mainTimeOut=0;var maxIndex;var maxEntries=5;function loadLibraryContractABI(){return[{"name":"Donation","inputs":[{"type":"address","name":"_from","indexed":!0},{"type":"int128","name":"_value","indexed":!1},{"type":"int128","name":"_bookID","indexed":!1}],"anonymous":!1,"type":"event"},{"name":"BookUploaded","inputs":[{"type":"int128","name":"_bookID","indexed":!1}],"anonymous":!1,"type":"event"},{"name":"TextUploaded","inputs":[{"type":"int128","name":"_bookID","indexed":!1}],"anonymous":!1,"type":"event"},{"name":"getTextAddress","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"int128","name":"bookID"}],"constant":!0,"payable":!1,"type":"function","gas":672},{"name":"getBookAddress","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"int128","name":"bookID"}],"constant":!0,"payable":!1,"type":"function","gas":702},{"name":"addBook","outputs":[],"inputs":[{"type":"int128","name":"id"},{"type":"address","name":"bookAddress"}],"constant":!1,"payable":!1,"type":"function","gas":22006},{"name":"getAuthorAddress","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"int128","name":"authorID"}],"constant":!0,"payable":!1,"type":"function","gas":762},{"name":"addAuthor","outputs":[],"inputs":[{"type":"int128","name":"id"},{"type":"address","name":"authorAddress"}],"constant":!1,"payable":!1,"type":"function","gas":22066},{"name":"getSubjectAddress","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"int128","name":"subjectID"}],"constant":!0,"payable":!1,"type":"function","gas":822},{"name":"getLoCAddress","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"int128","name":"LoCID"}],"constant":!0,"payable":!1,"type":"function","gas":852},{"name":"__init__","outputs":[],"inputs":[{"type":"address[3]","name":"_foundationAddresses"}],"constant":!1,"payable":!1,"type":"constructor"},{"name":"changeFoundationAddresses","outputs":[],"inputs":[{"type":"int128","name":"index"},{"type":"address","name":"newAddress"}],"constant":!1,"payable":!1,"type":"function","gas":22310},{"name":"donate","outputs":[],"inputs":[{"type":"int128","name":"id"},{"type":"int128","name":"foundationSplitNumerator"},{"type":"int128","name":"foundationSplitDenominator"}],"constant":!1,"payable":!0,"type":"function","gas":41441},{"name":"donateWithDifferentDonor","outputs":[],"inputs":[{"type":"int128","name":"id"},{"type":"int128","name":"foundationSplitNumerator"},{"type":"int128","name":"foundationSplitDenominator"},{"type":"address","name":"donorAddress"}],"constant":!1,"payable":!0,"type":"function","gas":41416},{"name":"setUpdateAddress","outputs":[],"inputs":[{"type":"address","name":"newUpdateAddress"}],"constant":!1,"payable":!1,"type":"function","gas":22069},{"name":"setTextAddress","outputs":[],"inputs":[{"type":"int128","name":"id"},{"type":"address","name":"_textAddress"}],"constant":!1,"payable":!1,"type":"function","gas":26206},{"name":"setExpansionAddress","outputs":[],"inputs":[{"type":"int128","name":"id"},{"type":"address","name":"expansionAddress"}],"constant":!1,"payable":!1,"type":"function","gas":4811},{"name":"withdrawFunds","outputs":[],"inputs":[{"type":"int128","name":"bookID"},{"type":"address","name":"withdrawalAddress"},{"type":"int128","name":"withdrawal"}],"constant":!1,"payable":!1,"type":"function","gas":37445},{"name":"setMaxIndex","outputs":[],"inputs":[{"type":"int128","name":"_maxIndex"}],"constant":!1,"payable":!1,"type":"function","gas":22240},{"name":"foundationAddresses","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"int128","name":"arg0"}],"constant":!0,"payable":!1,"type":"function","gas":1150},{"name":"maxIndex","outputs":[{"type":"int128","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":963},{"name":"updateAddress","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":993},{"name":"updatedContract","outputs":[{"type":"bool","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1023},{"name":"books","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"int128","name":"arg0"}],"constant":!0,"payable":!1,"type":"function","gas":1242},{"name":"textAddress","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"int128","name":"arg0"}],"constant":!0,"payable":!1,"type":"function","gas":1272},{"name":"authors","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"int128","name":"arg0"}],"constant":!0,"payable":!1,"type":"function","gas":1302},{"name":"subjects","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"int128","name":"arg0"}],"constant":!0,"payable":!1,"type":"function","gas":1332},{"name":"LoC","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"int128","name":"arg0"}],"constant":!0,"payable":!1,"type":"function","gas":1362}]}
function loadBookABI(){return[{"name":"__init__","outputs":[],"inputs":[{"type":"address","name":"_parentAddress"},{"type":"address","name":"_modifierAddress"}],"constant":!1,"payable":!1,"type":"constructor"},{"name":"donate","outputs":[],"inputs":[{"type":"int128","name":"foundationSplitNumerator"},{"type":"int128","name":"foundationSplitDenominator"}],"constant":!1,"payable":!0,"type":"function","gas":3368},{"name":"changeParentAddress","outputs":[],"inputs":[{"type":"address","name":"newAddress"},{"type":"int128","name":"index"}],"constant":!1,"payable":!1,"type":"function","gas":21587},{"name":"addExpansionAddress","outputs":[],"inputs":[{"type":"address","name":"_expansionAddress"}],"constant":!1,"payable":!1,"type":"function","gas":41418},{"name":"addText","outputs":[],"inputs":[],"constant":!1,"payable":!1,"type":"function","gas":21460},{"name":"recieveDonation","outputs":[],"inputs":[{"type":"int128","name":"value"}],"constant":!1,"payable":!1,"type":"function","gas":21967},{"name":"version","outputs":[{"type":"bool","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":633},{"name":"modifierAddresses","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"int128","name":"arg0"}],"constant":!0,"payable":!1,"type":"function","gas":880},{"name":"expansionAddress","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":693},{"name":"usesExpansion","outputs":[{"type":"bool","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":723},{"name":"book__id","outputs":[{"type":"int128","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":831},{"name":"book__title","outputs":[{"type":"bytes","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":2180},{"name":"book__copyright","outputs":[{"type":"bool","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":891},{"name":"book__language","outputs":[{"type":"bytes","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1866},{"name":"book__libraryOfCongress","outputs":[{"type":"bytes","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1896},{"name":"book__subjects","outputs":[{"type":"bytes","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1926},{"name":"book__authorIDs","outputs":[{"type":"bytes","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1950},{"name":"book__authorRoles","outputs":[{"type":"bytes","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1986},{"name":"book__size","outputs":[{"type":"int128","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1071},{"name":"book__donations","outputs":[{"type":"int128","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1101},{"name":"book__textAddress","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1131},{"name":"book__uploaded","outputs":[{"type":"bool","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1161}]}
function loadAuthorABI(){return[{"name":"__init__","outputs":[],"inputs":[{"type":"address","name":"_parentAddress"}],"constant":!1,"payable":!1,"type":"constructor"},{"name":"changeParentAddress","outputs":[],"inputs":[{"type":"address","name":"newAddress"}],"constant":!1,"payable":!1,"type":"function","gas":20627},{"name":"addExpansionAddress","outputs":[],"inputs":[{"type":"address","name":"_expansionAddress"}],"constant":!1,"payable":!1,"type":"function","gas":40663},{"name":"version","outputs":[{"type":"bool","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":543},{"name":"parentAddress","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":573},{"name":"expansionAddress","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":603},{"name":"usesExpansion","outputs":[{"type":"bool","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":633},{"name":"author__name","outputs":[{"type":"bytes","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1686},{"name":"author__alias","outputs":[{"type":"bytes","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":2084},{"name":"author__birthdate","outputs":[{"type":"bytes","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1746},{"name":"author__deathdate","outputs":[{"type":"bytes","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":1776},{"name":"author__id","outputs":[{"type":"int128","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":861}]}
function loadZipABI(){return[{"name":"__init__","outputs":[],"inputs":[{"type":"address","name":"_listingAddress"},{"type":"address","name":"_modifierAddress"}],"constant":!1,"payable":!1,"type":"constructor"},{"name":"setZipBytes","outputs":[],"inputs":[{"type":"int128","name":"_index"},{"type":"bytes","name":"newZip"}],"constant":!1,"payable":!1,"type":"function","gas":5187494},{"name":"listingAddress","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":513},{"name":"modifierAddress","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":543},{"name":"zipBytes","outputs":[{"type":"bytes","name":"out"}],"inputs":[{"type":"int128","name":"arg0"}],"constant":!0,"payable":!1,"type":"function","gas":97105},{"name":"zipBytesFinal","outputs":[{"type":"bytes","name":"out"}],"inputs":[],"constant":!0,"payable":!1,"type":"function","gas":28850}]}
var authorABI=loadAuthorABI();var zipABI=loadZipABI();var libraryAddress='0x82cA8Ec684C10479f4Bd34A46927Ed1f95753011';var thirdPartyProvider;var libraryContract;function loadBookTextChunk(bookID,chunk){return libraryContract.methods.getTextAddress(bookID).call().then(function(res){var textContract=new web3.eth.Contract(loadZipABI(),res);return textContract.methods.zipBytes(chunk).call().then(function(success){return success})})}
function loadFinalBookTextChunk(bookID){return libraryContract.methods.getTextAddress(bookID).call().then(function(res){var textContract=new web3.eth.Contract(loadZipABI(),res);return textContract.methods.zipBytesFinal().call().then(function(success){return success})})}
async function getBookTextBlockchain(bookID){var size=await loadVariable('b',bookID,'size');var numByteArrays=Math.floor(size/4096);if(size%255!==0){numByteArrays++}
bytePromises=[];for(var i=0;i<numByteArrays;i++){if(i!=numByteArrays-1){bytePromises.push(await loadBookTextChunk(bookID,i))}
else{bytePromises.push(await loadFinalBookTextChunk(bookID))}}
var promises=await Promise.all(bytePromises);var arrays=[]
for(var i=0;i<promises.length;i++){var newArray=hexStringToByte(promises[i].substring(2));arrays.push(newArray)}
var returnArray=new Uint8Array([].concat.apply([],arrays));return returnArray}
function hexStringToByte(str){var a=[];for(var i=0,len=str.length;i<len;i+=2){a.push(parseInt(str.substr(i,2),16))}
return a}
function getBookTextServer(bookID){return new JSZip.external.Promise(function(resolve,reject){var folderID=Math.floor(bookID/100)
JSZipUtils.getBinaryContent('/library/zip/'+folderID+'/'+bookID+'.zip',function(err,data){if(err){reject(err)}
else{resolve(data)}})})}
async function loadTextPage(bookID){document.getElementById('Holocron Info').innerHTML='<p>Welcome to the <a href="./">holocron.foundation library</a>.</p>';document.getElementById('bookText').innerHTML='<p></p>';var zip=new JSZip();var bookName=await loadVariable('b',bookID,'title',!0,!0);document.title='Holocron.Foundation ♢ '+bookName;var holocronInfoText='Welcome to the <a href="./">holocron.foundation library</a>. You are reading <a href="./book.html?bookID='+bookID+'">'+bookName+'</a>. To the best of our knowledge, this text is Public Domain within the United States, so feel free to use the text however you would like.';document.getElementById('Holocron Info').innerHTML='<p>'+holocronInfoText+'</p>';var uploaded=await loadVariable('b',bookID,'uploaded',!1);if(uploaded){holocronInfoText+=' This text has been uploaded to the Ethereum Blockchain. You are viewing the copy stored there. Enjoy!'}
else{holocronInfoText+=' This text has <b>NOT</b> been uploaded to the Ethereum Blockchain. You are viewing a copy stored on our server. If you would like to contribute Ethereum <a href="#" onclick="donate('+bookID+', false, true)">click here</a> to immeadiately send a donation with our default fee, or head to <a href="./book.html?bookID='+bookID+'">this books page</a> to change it. If you would like to give Bitcoin, Litecoin, or USD please see our <a href="../donate.html">donations page</a>.'}
document.getElementById('Holocron Info').innerHTML='<p>'+holocronInfoText+'<p>';document.getElementById('bookText').innerHTML='<p>The text is loading...</p>';var fullTextZip;if(uploaded){fullTextZip=await getBookTextBlockchain(bookID)}
else{fullTextZip=await getBookTextServer(bookID)}
JSZip.loadAsync(fullTextZip).then(function(zip){return zip.file(bookID+'.txt').async('string')}).then(function success(text){var downloadDiv=document.getElementById('download');var downloadLink=document.createElement('a');downloadLink.setAttribute('href','data:text/plain;charset=utf-8,'+encodeURIComponent(text));downloadLink.setAttribute('download',bookName+'.txt');downloadLink.appendChild(document.createTextNode('Download this text'));downloadDiv.appendChild(downloadLink);document.getElementById('bookText').innerHTML='<p>'+text+'</p>'},function error(e){document.getElementById('bookText').innerHTML='<p> An error has occurred. Please refresh the page and check your connection. If this error persists please let us know about it at samuel.troper@holocron.founcation and note the following error: '+e+'</p>'})}
function setupWeb3(){if(typeof web3!=='undefined'){thirdPartyProvider=!0;console.log('Using users web3!')
result=new Web3(web3.currentProvider)}
else{thirdPartyProvider=!1;console.log('Using external web3. :( Check out Metamask or Mist.')
mainTimeOut=500;result=new Web3(new Web3.providers.HttpProvider("https://api.myetherapi.com/rop"))}
libraryContract=new result.eth.Contract(loadLibraryContractABI(),libraryAddress);return result}
function getAuthors(bookID,localStorageAccess=!0){if(localStorageAccess){var localStorageName='<b'+bookID.toString()+'>authors';var localItem=localStorage.getItem(localStorageName);if(localItem!=null){return Promise.resolve(parseLocalStorage(localItem))}}
return loadInfoAddress('b',bookID,localStorageAccess).then(function(res){currentContract=new web3.eth.Contract(loadBookABI(),res);return currentContract.methods.book__authorIDs().call().then(async function(res){if(res==null){if(localStorageAccess){storeInfo('b',bookID,'authors','None')}
return'None'}
else{var authorIDArray=res.slice(2).match(/.{1,4}/g);var authorNameArray=[];for(var j=0;j<authorIDArray.length;j++){var addr=await libraryContract.methods.getAuthorAddress(parseInt(authorIDArray[j],16)).call();var authorContract=new web3.eth.Contract(authorABI,addr);var name=await authorContract.methods.author__name().call();authorNameArray.push(hex2a(name))}
if(localStorageAccess){storeInfo('b',bookID,'authors',authorNameArray)}
return authorNameArray}})})}
function getAuthorRoles(bookID,localStorageAccess=!0){if(localStorageAccess){var localStorageName='<b'+bookID.toString()+'>authorRoles';var localItem=localStorage.getItem(localStorageName);if(localItem!=null){return Promise.resolve(parseLocalStorage(localItem))}}
return loadInfoAddress('b',bookID,localStorageAccess).then(function(res){currentContract=new web3.eth.Contract(loadBookABI(),res);return currentContract.methods.book__authorRoles().call().then(function(res1){if(res1==null){return'None'}
var authorRolesIDArray=res1.slice(2).match(/.{1,2}/g);if(localStorageAccess){storeInfo('b',bookID,'authorRoles',authorRolesIDArray)}
return authorRolesIDArray})})}
function loadData(tag,ID,useCache=!0){promiseData=[]
if(tag=='b'){promiseData.push(loadVariable(tag,ID,'title',useCache,!0));promiseData.push(loadVariable(tag,ID,'language',useCache,!0));promiseData.push(loadVariable(tag,ID,'size',useCache));promiseData.push(getAuthors(ID,useCache));promiseData.push(loadVariable(tag,ID,'donations',!1));promiseData.push(getAuthorRoles(ID,useCache));promiseData.push(loadVariable(tag,ID,'authorIDs',useCache));promiseData.push(loadVariable(tag,ID,'uploaded',!1))}
else if(tag=='a'){promiseData.push(loadVariable(tag,ID,'name',useCache,!0));promiseData.push(loadVariable(tag,ID,'alias',useCache,!0));promiseData.push(loadVariable(tag,ID,'birthdate',useCache,!0));promiseData.push(loadVariable(tag,ID,'deathdate',useCache,!0))}
return Promise.all(promiseData)}
function loadInfoBox(tag,ID,modifiedURL='.'){loadInfoAddress(tag,ID).then(function(res){promisedInfo=loadData(tag,ID);promisedInfo.then(async function(values){if(tag=='b'){var titleClean=values[0];var languageClean=values[1];var size=values[2];var donationsETH=web3.utils.fromWei(values[4].toString(),"ether");var authorRolesIDArray=values[5];var gweiStorageCost=calculateStorageCost(size,web3.utils.toWei("2","gwei"));var uploaded=values[7];if(currentFilters.get('blockchain')&&uploaded){if(clearBooksSection){booksList.innerHTML='';clearBooksSection=!1}
var newHTML='<p class="title">';if(getPageName()!='book.html'){newHTML+='<a href="'+modifiedURL+'/book.html?bookID='+ID.toString()+'">'}
newHTML+='<b>'+titleClean+'</b>';if(getPageName()!='book.html'){newHTML+='</a>'}
newHTML+='</p> ';if(authorRolesIDArray!='None'){var authorNameArray=values[3];var authorIDArray=values[6].slice(2).match(/.{1,4}/g);newHTML+='<p class="author">';var lastRole=-1;for(var k=0;k<authorNameArray.length;k++){var currentRoleID=authorRolesIDArray[k];if(currentRoleID!=lastRole){if(k!=0){newHTML+=', '}
if(currentRoleID==0){newHTML+='Authored by: '}
else if(currentRoleID==1){newHTML+='Translated by: '}
else if(currentRoleID==2){newHTML+='Edited by: '}
else if(currentRoleID==3){newHTML+='Illustrated by: '}
lastRole=currentRoleID}
else if(k!=0){newHTML+=' & '}
newHTML+='<a href="'+modifiedURL+'/author.html?authorID='+parseInt(authorIDArray[k],16)+'">'+decodeURIComponent(escape(authorNameArray[k]))+'</a>'}
newHTML+='</p>'}
newHTML+='<p class="lang">Language: '+languageClean+'</p>';newHTML+='<p class="textLink"><a href="'+modifiedURL+'/text.html?bookID='+ID.toString()+'">View the text</a></p>';if(uploaded){newHTML+='<p>This text has been uploaded to the blockchain. Donations may still be made in the name of the text.</p>';newHTML+='<p class="recieved">'+donationsETH+' Ξ Recieved</p>'}
else{newHTML+='<p>This text is <b>not</b> yet uploaded to the blockchain.</p>';if(donationsETH>web3.utils.fromWei(gweiStorageCost.toString(),"ether")){newHTML+='<p>Enough donations have been recieved to upload the text to the blockchain!<br>It will be available shortly. Donations may still be made in the name of the text.</p>'
newHTML+='<p class="recieved">'+donationsETH+' Ξ Recieved</p>'}
else{newHTML+='<meter value="'+donationsETH+'" min="0" max="'+web3.utils.fromWei(gweiStorageCost.toString(),"ether")+'"></meter>';newHTML+='<p class="recieved">'+donationsETH+' Ξ Recieved / ≈'+web3.utils.fromWei(gweiStorageCost.toString(),"ether")+' Ξ Needed</p>'}}
newHTML+='<div class="splitSlider" style="display: flex;"><p class="blankFlex1"></p><p class="left" id="bookSplit'+ID+'">Book: 70%</p><input type="range" min="0" max="100" value="30" class="slider" id="slider'+ID+'" onchange="updateSplitValues(this.value, '+ID+');"><p class="right" id="foundationSplit'+ID+'">Foundation: 30%</p><p class="blankFlex1"></p></div>';newHTML+='<p><a href="javascript:donate('+ID+');">Donate with Ξ</a></p>';newHTML+='<p><a href="../donate.html?ID='+ID.toString()+'">Donate with BTC, LTC, or USD</a></p>';infoItem=document.getElementsByName(ID.toString())[0];infoItem.innerHTML=newHTML;infoItem.className=infoItem.className+' loaded';storeInfo(tag,ID,'basicInfo',!0)}
else if(currentFilters.get('server')&&!uploaded){if(clearBooksSection){booksList.innerHTML='';clearBooksSection=!1}
var newHTML='<p class="title">';if(getPageName()!='book.html'){newHTML+='<a href="'+modifiedURL+'/book.html?bookID='+ID.toString()+'">'}
newHTML+='<b>'+titleClean+'</b>';if(getPageName()!='book.html'){newHTML+='</a>'}
newHTML+='</p> ';if(authorRolesIDArray!='None'){var authorNameArray=values[3];var authorIDArray=values[6].slice(2).match(/.{1,4}/g);newHTML+='<p class="author">';var lastRole=-1;for(var k=0;k<authorNameArray.length;k++){var currentRoleID=authorRolesIDArray[k];if(currentRoleID!=lastRole){if(k!=0){newHTML+=', '}
if(currentRoleID==0){newHTML+='Authored by: '}
else if(currentRoleID==1){newHTML+='Translated by: '}
else if(currentRoleID==2){newHTML+='Edited by: '}
else if(currentRoleID==3){newHTML+='Illustrated by: '}
lastRole=currentRoleID}
else if(k!=0){newHTML+=' & '}
newHTML+='<a href="'+modifiedURL+'/author.html?authorID='+parseInt(authorIDArray[k],16)+'">'+decodeURIComponent(escape(authorNameArray[k]))+'</a>'}
newHTML+='</p>'}
newHTML+='<p class="lang">Language: '+languageClean+'</p>';newHTML+='<p class="textLink"><a href="'+modifiedURL+'/text.html?bookID='+ID.toString()+'">View the text</a></p>';if(uploaded){newHTML+='<p>This text has been uploaded to the blockchain. Donations may still be made in the name of the text.</p>';newHTML+='<p class="recieved">'+donationsETH+' Ξ Recieved</p>'}
else{newHTML+='<p>This text is <b>not</b> yet uploaded to the blockchain.</p>';if(donationsETH>web3.utils.fromWei(gweiStorageCost.toString(),"ether")){newHTML+='<p>Enough donations have been recieved to upload the text to the blockchain!<br>It will be available shortly. Donations may still be made in the name of the text.</p>'
newHTML+='<p class="recieved">'+donationsETH+' Ξ Recieved</p>'}
else{newHTML+='<meter value="'+donationsETH+'" min="0" max="'+web3.utils.fromWei(gweiStorageCost.toString(),"ether")+'"></meter>';newHTML+='<p class="recieved">'+donationsETH+' Ξ Recieved / ≈'+web3.utils.fromWei(gweiStorageCost.toString(),"ether")+' Ξ Needed</p>'}}
newHTML+='<div class="splitSlider" style="display: flex;"><p class="blankFlex1"></p><p class="left" id="bookSplit'+ID+'">Book: 70%</p><input type="range" min="0" max="100" value="30" class="slider" id="slider'+ID+'" onchange="updateSplitValues(this.value, '+ID+');"><p class="right" id="foundationSplit'+ID+'">Foundation: 30%</p><p class="blankFlex1"></p></div>';newHTML+='<p><a href="javascript:donate('+ID+');">Donate with Ξ</a></p>';newHTML+='<p><a href="../donate.html?ID='+ID.toString()+'">Donate with BTC, LTC, or USD</a></p>';infoItem=document.getElementsByName(ID.toString())[0];infoItem.innerHTML=newHTML;infoItem.className=infoItem.className+' loaded';if(pageBooks[currentPage].length==maxEntries){displayNextButton(!0)}
storeInfo(tag,ID,'basicInfo',!0)}
else{removeEntry(ID)}}
else if(tag=='a'){var name=values[0];var alias=values[1];var birthdate=values[2];var deathdate=values[3];var newHTML='<p class="authorName">';if(getPageName()!='author.html'){newHTML+='<a href="./author.html?authorID='+ID.toString()+'">'}
newHTML+='<b>'+decodeURIComponent(escape(name))+'</b>';if(getPageName()!='author.html'){newHTML+='</a>'}
newHTML+='</p> ';if(birthdate!=null){newHTML+='<p class="birthYear">Birth Year: '+birthdate+'</p>'}
if(deathdate!=null){newHTML+='<p class="deathYear">Death Year: '+deathdate+'</p>'}
if(alias!=null){var aliases;if(typeof alias=='string'){aliases=decodeURIComponent(escape(alias.substring(1,alias.length-1))).replace('|',', ')}
else{aliases='';first=!0;for(var q=0;q<alias.length;q++){if(!first){aliases+=', '}
first=!1;aliases+=decodeURIComponent(escape(alias[q]))}}
newHTML+='<p class="alias">Alias(es): '+aliases+'</p>'}
infoItem=document.getElementsByName(ID.toString())[0];infoItem.innerHTML=newHTML;storeInfo(tag,ID,'basicInfo',!0)}}).catch(function(error){if(error.toString()!="Error: Couldn't decode bytes from ABI: 0x"){console.log(error)}
else{removeEntry(ID)}})})}
function updateSplitValues(newValue,bookID){document.getElementById('foundationSplit'+bookID).innerHTML="Foundation: "+newValue+"%";document.getElementById('bookSplit'+bookID).innerHTML="Book: "+(100-newValue)+"%"}
function loadInfoAddress(tag,ID,localStorageAccess=!0){if(localStorageAccess){localStorageName='<'+tag+ID.toString()+'>infoAddress';var localItem=localStorage.getItem(localStorageName);if(localItem!=null){return Promise.resolve(parseLocalStorage(localItem))}}
if(tag=='b'){return libraryContract.methods.getBookAddress(ID).call().then(function(res){if(localStorageAccess){storeInfo('b',ID,'infoAddress',res)}
return res})}
if(tag=='a'){return libraryContract.methods.getAuthorAddress(ID).call().then(function(res){if(localStorageAccess){storeInfo('a',ID,'infoAddress',res)}
return res})}}
function loadVariable(typeLetter,ID,infoName,useCache=!0,hexEncodedInContract=!1){if(useCache){var localStorageName='<'+typeLetter+ID.toString()+'>'+infoName;var localItem=localStorage.getItem(localStorageName);if(localItem!=null){return Promise.resolve(parseLocalStorage(localItem))}}
return loadInfoAddress(typeLetter,ID,useCache).then(function(res){var currentContract;var contractString;if(typeLetter=='b'){currentContract=new web3.eth.Contract(loadBookABI(),res);contractString="return contract.methods.book__"+infoName+"().call().then(function(success){"}
else if(typeLetter=='a'){currentContract=new web3.eth.Contract(authorABI,res);contractString="return contract.methods.author__"+infoName+"().call().then(function(success){"}
if(hexEncodedInContract){contractString+="success = hex2a(success);"}
if(useCache){contractString+="storeInfo('"+typeLetter+"', "+ID+", '"+infoName+"', success);"}
contractString+="return success;}).catch(function(error){if((error.toString() != \"Error: Couldn't decode bytes from ABI: 0x\") && (error.toString() != \"ReferenceError: name is not defined\") && (error.toString() != \"Error: Couldn't decode  from ABI: 0x\") && (error.toString() != \"Error: Couldn't decode bool from ABI: 0x\")){ console.log(error); } else{removeEntry("+ID+");}});";var tempFunction=new Function("contract",contractString);return tempFunction(currentContract)})}
function parseLocalStorage(localItem){if(localItem.charAt(0)=='['&&localItem.charAt(localItem.length-1)==']'){localItem=localItem.substring(1,localItem.length-1);return localItem.split('|')}
if(localItem=='true'){return!0}
if(localItem=='false'){return!1}
return localItem}
function storeInfo(tag,ID,infoName,info){var storeName='<'+tag+ID+'>'+infoName;if(Array.isArray(info)){if(info.length==0){localStorage.setItem(storeName,'None')}
else{storeArrStr='[';for(var i=0;i<info.length;i++){if(i!=0){storeArrStr+='|'}
storeArrStr+=info[i]}
storeArrStr+=']';localStorage.setItem(storeName,storeArrStr)}}
else{localStorage.setItem(storeName,info)}}
function removeEntry(ID){if((typeof(document)!=="undefined")&&(document!=null)){index=pageBooks[currentPage].indexOf(ID);badID.push(ID);if(!skipCache.includes(ID)){skipCache.push(ID)}
if(index>-1){pageBooks[currentPage].splice(index,1)}
entry=document.getElementsByName(ID.toString())[0];if(entry!=undefined){entry.remove()
if(currentPage!=null&&currentPageType=='r'){addRandomEntry()}}}}
function donate(bookID,invalidNumber=!1,defaultSplit=!1){var donationValueString;if(invalidNumber){donationValueString=prompt("You entered an invalid number. Please enter the size of your donation, in ETH:","0")}
else{donationValueString=prompt("Please enter the size of your donation, in ETH:","0")}
var donationValue=parseFloat(donationValueString);if(donationValueString==null){}
else if(isNaN(donationValue)||donationValue<=0){donate(bookID,!0)}
else{var foundationSplitNumerator;var foundationSplitDenominator=100;if(!defaultSplit){foundationSplitNumerator=document.getElementById('slider'+bookID).value}
else{foundationSplitNumerator=30}
web3.eth.getAccounts(function(error,accounts){if(!error){libraryContract.methods.donate(bookID,foundationSplitNumerator,foundationSplitDenominator).send({from:accounts[0],value:web3.utils.toWei(donationValueString)}).on('transactionHash',function(hash){alert('Your donation has sent! The transaction hash is: '+hash)}).catch(function(fuck){if(fuck=='Error: No "from" address specified in neither the given options, nor the default options.'){alert("You were unable to send an Ξ donation because you don't have a default address set. Consider downloading the Metamask Extension (for Chrome, Firefox, Opera, or Brave) or the Mist Browser.\nMetamask: https://metamask.io/\nMist: https://github.com/ethereum/mist")}
else if(fuck.toString().indexOf("Error: Returned error: Error: MetaMask Tx Signature: User denied transaction signature."==-1)){alert("You cancelled your donation.")}
else{alert('There was an error sending your donation. Error message: '+fuck)}})}
else{console.log(error)}})}}
function hex2a(hex){if(hex.indexOf('0x')==0){hex=hex.substring(2)}
var str='';for(var i=0;i<hex.length;i+=2){str+=String.fromCharCode(parseInt(hex.substr(i,2),16))}
return str.trim()}
function calculateStorageCost(size,gasPrice){return 625*size*gasPrice}
function searchBooks(){pageBooks=[[]];currentPage=0;resetPageNumber()
currentPageType='s';booksList=document.getElementById("booksList");booksList.innerHTML='';searchValue=document.getElementById("searchBar").value.toLowerCase();searchLocalStorage(searchValue,booksList)}
async function loadAuthorBooks(ID){pageBooks=[[]];currentPage=0;currentPageType='a';booksList=document.getElementById("booksList");searchLocalStorage((await loadVariable('a',ID,'name',!0,!0)).toLowerCase(),booksList)}
function populateRandomContent(){for(var i=0;i<maxEntries;i++){addRandomEntry()}}
function loadBooksByPage(){populateList=document.getElementById("booksList");var pageArray=pageBooks[currentPage];if(pageArray.length<maxEntries){displayNextButton(!1)}
for(var i=0;i<pageArray.length;i++){populateList.innerHTML+='<li class="bookInfo" name="'+pageArray[i]+'"></li>';loadInfoBox('b',pageArray[i])}}
function genUniqueRandomNumberArray(arrayLength,max){var arr=[];while(arr.length<arrayLength){var randomnumber=Math.floor(Math.random()*max);if(arr.indexOf(randomnumber)==-1){arr[arr.length]=randomnumber}}
return arr}
function addRandomEntry(){var randomNumber=Math.floor(Math.random()*maxIndex);var i=0;while(i<pageBooks.length){if(pageBooks[i].indexOf(randomNumber)!=-1||badID.indexOf(randomNumber)!=-1){i=-1;randomNumber=Math.floor(Math.random()*maxIndex);if(badID.length>=maxIndex){i=pageBooks.length+maxEntries}}
i++}
if(i==pageBooks.length){populateList=document.getElementById("booksList");pageBooks[currentPage].push(randomNumber);populateList.innerHTML+='<li class="bookInfo" name="'+randomNumber+'"></li>';loadInfoBox('b',randomNumber)}
else if(pageBooks[currentPage].length==0){booksList.innerHTML='<p class="center">No results found!</p>'}}
var clearBooksSection=!1;function getParameterByName(name,url){if(!url)url=window.location.href;name=name.replace(/[\[\]]/g,"\\$&");var regex=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),results=regex.exec(url);if(!results)return null;if(!results[2])return'';return decodeURIComponent(results[2].replace(/\+/g," "))}
function insertParameter(key,value,state=null){var searchParams=new URLSearchParams(window.location.search);searchParams.set(key,value);var url=window.location.pathname+'?'+searchParams.toString();window.history.pushState(state,document.title,url)}
function searchLocalStorage(searchString,booksList,start=0,retries=0){localStorageString=JSON.stringify(localStorage).toLowerCase();nextIndex=localStorageString.indexOf(searchString,start);if(nextIndex!=-1&&pageBooks[currentPage].length<maxEntries){var lastAuthorTag=localStorageString.lastIndexOf('<a',nextIndex);var lastBookTag=localStorageString.lastIndexOf('<b',nextIndex);if(lastBookTag>lastAuthorTag){var endOfBookTag=localStorageString.indexOf('>',lastBookTag);var ID=parseInt(localStorageString.slice(lastBookTag+2,endOfBookTag));var j=0;while(j<pageBooks.length&&!pageBooks[j].includes(ID)&&!badID.includes(ID)){j++}
if(j==pageBooks.length){var endOfBookTag=localStorageString.indexOf('>',lastBookTag);booksList.innerHTML+='<li class="bookInfo" name="'+ID+'"></li>';pageBooks[currentPage].push(ID);loadInfoBox('b',ID)}}
searchLocalStorage(searchString,booksList,nextIndex+1)}
else{if(retries<10){if(pageBooks[currentPage].length<maxEntries){displayNextButton(!1)}
if(pageBooks[currentPage].length==0){booksList.innerHTML='<p class="center">No results found!<br>We\'ll try checking again in a few seconds!</p>';clearSection=!0;setTimeout(function(){searchLocalStorage(searchString,booksList,0,retries+1)},250)}
else{setTimeout(function(){searchLocalStorage(searchString,booksList,0,retries+1)},250)}}
else{if(booksList.innerHTML=='<p class="center">No results found!<br>We\'ll try checking again in a few seconds!</p>'){booksList.innerHTML='<p class="center">No results found!</p>'}
console.log("Done searching!")}}}
function checkIfCached(tag,ID){var localStorageName='<'+tag+ID.toString()+'>basicInfo';var localItem=localStorage.getItem(localStorageName);if(localItem=='true'){return!0}
return!1}
function workerCacheBooks(existingWorker=null){if(existingWorker==null){existingWorker=new Worker('./js/workerCacheInfo.js');existingWorker.onmessage=function(e){logData=e.data;if(typeof logData[0]=='string'){removeEntry(logData[1]);if(!skipCache.includes(logData[1])){skipCache.push(logData[1])}
if(logData[0]!='Error: Invalid JSON RPC response: ""'){setTimeout(function(){workerCacheBooks(existingWorker)},workerTimeOut)}
else{console.log("Error connecting workers to a web3 endpoint. Stopping cacheing now...");existingWorker.terminate()}}
else{for(var i=0;i<logData.length;i++){if(typeof(logData[i][1])!=='undefined'){storeInfo('b',logData[i][0],logData[i][1],logData[i][2])}}
if(Array.isArray(logData)){storeInfo('b',logData[0][0],'basicInfo',!0)}
setTimeout(function(){workerCacheBooks(existingWorker)},workerTimeOut)}}}
var randomnumber=Math.floor(Math.random()*maxIndex+1);if(!skipCache.includes(randomnumber)){if(checkIfCached('b',randomnumber)){skipCache.push(randomnumber);workerCacheBooks(existingWorker)}
else{existingWorker.postMessage(randomnumber)}}
else{if(skipCache.length<maxIndex){setTimeout(function(){workerCacheBooks(existingWorker)},workerTimeOut)}
else{console.log('Cached all books...');existingWorker.terminate()}}}
function mainCacheBooks(index=-1){if(index==-1){var randomnumber=Math.floor(Math.random()*maxIndex+1);if(!skipCache.includes(randomnumber)){if(checkIfCached('b',randomnumber)){skipCache.push(randomnumber);mainCacheBooks()}
else{loadData('b',randomnumber).then(function(res){storeInfo('b',randomnumber,'basicInfo',!0);setTimeout(function(){mainCacheBooks()},mainTimeOut)}).catch(function(error){skipCache.push(randomnumber);setTimeout(function(){mainCacheBooks()},mainTimeOut)})}}
else{if(skipCache.length<maxIndex){mainCacheBooks()}
else{console.log('Cached all books...')}}}
else{if(!skipCache.includes(index)){if(checkIfCached('b',index)){skipCache.push(index);mainCacheBooks()}
else{loadData('b',index).then(function(res){storeInfo('b',randmnumber,'basicInfo',!0);setTimeout(function(){mainCacheBooks(index+1)},mainTimeOut)}).catch(function(error){skipCache.push(randomnumber);setTimeout(function(){mainCacheBooks(index+1)},mainTimeOut)})}}
else{if(index<maxIndex){setTimeout(function(){mainCacheBooks(index+1)},25)}
else{console.log('Cached all books...')}}}}
function cacheBooks(workerThreads){if(window.Worker){for(var i=0;i<workerThreads;i++){workerCacheBooks()}}
mainCacheBooks();mainCacheBooks(1)}
function getPageName(){return window.location.pathname.split("/").pop()}
function displayNextButton(yeaOrNo){var nextButton=document.getElementById("nextButton");if(yeaOrNo){nextButton.style.visibility="visible"}
else{nextButton.style.visibility="hidden"}}
function displayBackButton(yeaOrNo){var backButton=document.getElementById("backButton");if(yeaOrNo){backButton.style.visibility="visible"}
else{backButton.style.visibility="hidden"}}
function goToPage(page){if(page==0){displayBackButton(!1)}
else{displayBackButton(!0)}
displayNextButton(!1);currentPageNumber=document.getElementById('pageNumber'+currentPage);currentPageNumber.innerHTML='<a href="javascript:goToPage('+(currentPage).toString()+');" title="'+(currentPage+1).toString()+'"> '+(currentPage+1).toString()+' </a>'
if(page>pageBooks.length-1){var nextButton=document.getElementById("nextButton");var newPageNum=document.createElement("div");var nextPage=page+1;newPageNum.appendChild(document.createTextNode(' '+nextPage.toString()+' '));newPageNum.id='pageNumber'+page.toString();nextButton.parentNode.insertBefore(newPageNum,nextButton);pageBooks.push([])}
else{newPageNumber=document.getElementById('pageNumber'+page);newPageNumber.innerHTML=page+1}
currentPage=page;populateList=document.getElementById("booksList");populateList.innerHTML='';if(pageBooks[page].length>0){loadBooksByPage()}
else if(currentPageType=='r'){populateRandomContent()}
else if(currentPageType=='s'){searchLocalStorage(searchValue,populateList)}}
function setStorageFilter(){currentFilters.set('blockchain',document.getElementById('uploaded').checked);currentFilters.set('server',document.getElementById('notUploaded').checked);reloadPage()}
function reloadPage(){resetPageNumber();populateList=document.getElementById("booksList");populateList.innerHTML='';pageBooks=[[]];badID=[];skipCache=[];currentPage=0;if(currentPageType=='r'){populateRandomContent()}
else if(currentPageType=='s'){searchBooks()}
else if(currentPageType=='a'){loadAuthorBooks(getParameterByName('authorID'))}}
function resetPageNumber(){document.getElementById('pageNavigation').innerHTML='<div id="backButton" style="visibility: hidden;"><form action="javascript:goToPage(currentPage-1);" class="center"><button type="submit">Last Page</button></form></div><div id="pageNumber0">1</div><div id="nextButton" style="visibility: hidden;"><form action="javascript:goToPage(currentPage+1);" class="center"><button type="submit">Next Page</button></form></div>'}`);
}