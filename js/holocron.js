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
	return [{"name": "__init__", "outputs": [], "inputs": [{"type": "address", "name": "_listingAddress"}, {"type": "address", "name": "_modifierAddress"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "setText1", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187288}, {"name": "setText2", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187318}, {"name": "setText3", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187348}, {"name": "setText4", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187378}, {"name": "setText5", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187408}, {"name": "setText6", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187438}, {"name": "setText7", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187468}, {"name": "setText8", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187498}, {"name": "setText9", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187528}, {"name": "setText10", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187558}, {"name": "setText11", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187588}, {"name": "setText12", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187618}, {"name": "setText13", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187648}, {"name": "setText14", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187678}, {"name": "setText15", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187708}, {"name": "setText16", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187738}, {"name": "setText17", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187768}, {"name": "setText18", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187798}, {"name": "setText19", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187828}, {"name": "setText20", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187858}, {"name": "setText21", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187888}, {"name": "setText22", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187918}, {"name": "setText23", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187948}, {"name": "setText24", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5187978}, {"name": "setText25", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188008}, {"name": "setText26", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188038}, {"name": "setText27", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188068}, {"name": "setText28", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188098}, {"name": "setText29", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188128}, {"name": "setText30", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188158}, {"name": "setText31", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188188}, {"name": "setText32", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188218}, {"name": "setText33", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188248}, {"name": "setText34", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188278}, {"name": "setText35", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188308}, {"name": "setText36", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188338}, {"name": "setText37", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188368}, {"name": "setText38", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188398}, {"name": "setText39", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188428}, {"name": "setText40", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188458}, {"name": "setText41", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188488}, {"name": "setText42", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188518}, {"name": "setText43", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188548}, {"name": "setText44", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188578}, {"name": "setText45", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188608}, {"name": "setText46", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188638}, {"name": "setText47", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188668}, {"name": "setText48", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188698}, {"name": "setText49", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188728}, {"name": "setText50", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188758}, {"name": "setText51", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188788}, {"name": "setText52", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188818}, {"name": "setText53", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188848}, {"name": "setText54", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188878}, {"name": "setText55", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188908}, {"name": "setText56", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188938}, {"name": "setText57", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188968}, {"name": "setText58", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5188998}, {"name": "setText59", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189028}, {"name": "setText60", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189058}, {"name": "setText61", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189088}, {"name": "setText62", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189118}, {"name": "setText63", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189148}, {"name": "setText64", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189178}, {"name": "setText65", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189208}, {"name": "setText66", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189238}, {"name": "setText67", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189268}, {"name": "setText68", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189298}, {"name": "setText69", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189328}, {"name": "setText70", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189358}, {"name": "setText71", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189388}, {"name": "setText72", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189418}, {"name": "setText73", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189448}, {"name": "setText74", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189478}, {"name": "setText75", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189508}, {"name": "setText76", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189538}, {"name": "setText77", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189568}, {"name": "setText78", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189598}, {"name": "setText79", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189628}, {"name": "setText80", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189658}, {"name": "setText81", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189688}, {"name": "setText82", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189718}, {"name": "setText83", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189748}, {"name": "setText84", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189778}, {"name": "setText85", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189808}, {"name": "setText86", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189838}, {"name": "setText87", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189868}, {"name": "setText88", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189898}, {"name": "setText89", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189928}, {"name": "setText90", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189958}, {"name": "setText91", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5189988}, {"name": "setText92", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190018}, {"name": "setText93", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190048}, {"name": "setText94", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190078}, {"name": "setText95", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190108}, {"name": "setText96", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190138}, {"name": "setText97", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190168}, {"name": "setText98", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190198}, {"name": "setText99", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190228}, {"name": "setText100", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190258}, {"name": "setText101", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190288}, {"name": "setText102", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190318}, {"name": "setText103", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190348}, {"name": "setText104", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190378}, {"name": "setText105", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190408}, {"name": "setText106", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190438}, {"name": "setText107", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190468}, {"name": "setText108", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190498}, {"name": "setText109", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190528}, {"name": "setText110", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190558}, {"name": "setText111", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190588}, {"name": "setText112", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190618}, {"name": "setText113", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190648}, {"name": "setText114", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190678}, {"name": "setText115", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190708}, {"name": "setText116", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190738}, {"name": "setText117", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190768}, {"name": "setText118", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190798}, {"name": "setText119", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190828}, {"name": "setText120", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190858}, {"name": "setText121", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190888}, {"name": "setText122", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190918}, {"name": "setText123", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190948}, {"name": "setText124", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5190978}, {"name": "setText125", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191008}, {"name": "setText126", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191038}, {"name": "setText127", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191068}, {"name": "setText128", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191098}, {"name": "setText129", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191128}, {"name": "setText130", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191158}, {"name": "setText131", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191188}, {"name": "setText132", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191218}, {"name": "setText133", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191248}, {"name": "setText134", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191278}, {"name": "setText135", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191308}, {"name": "setText136", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191338}, {"name": "setText137", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191368}, {"name": "setText138", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191398}, {"name": "setText139", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191428}, {"name": "setText140", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191458}, {"name": "setText141", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191488}, {"name": "setText142", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191518}, {"name": "setText143", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191548}, {"name": "setText144", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191578}, {"name": "setText145", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191608}, {"name": "setText146", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191638}, {"name": "setText147", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191668}, {"name": "setText148", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191698}, {"name": "setText149", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191728}, {"name": "setText150", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191758}, {"name": "setText151", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191788}, {"name": "setText152", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191818}, {"name": "setText153", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191848}, {"name": "setText154", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191878}, {"name": "setText155", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191908}, {"name": "setText156", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191938}, {"name": "setText157", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191968}, {"name": "setText158", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5191998}, {"name": "setText159", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5192028}, {"name": "setText160", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 5192058}, {"name": "setText161", "outputs": [], "inputs": [{"type": "bytes", "name": "newText"}], "constant": false, "payable": false, "type": "function", "gas": 86407}, {"name": "listingAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 5313}, {"name": "modifierAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 5343}, {"name": "zipBytes0", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 101688}, {"name": "zipBytes1", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 101718}, {"name": "zipBytes2", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 101748}, {"name": "zipBytes3", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 101778}, {"name": "zipBytes4", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 101808}, {"name": "zipBytes5", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 101838}, {"name": "zipBytes6", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 101868}, {"name": "zipBytes7", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 101898}, {"name": "zipBytes8", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 101928}, {"name": "zipBytes9", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 101958}, {"name": "zipBytes10", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 101988}, {"name": "zipBytes11", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102018}, {"name": "zipBytes12", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102048}, {"name": "zipBytes13", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102078}, {"name": "zipBytes14", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102108}, {"name": "zipBytes15", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102138}, {"name": "zipBytes16", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102168}, {"name": "zipBytes17", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102198}, {"name": "zipBytes18", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102228}, {"name": "zipBytes19", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102258}, {"name": "zipBytes20", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102288}, {"name": "zipBytes21", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102318}, {"name": "zipBytes22", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102348}, {"name": "zipBytes23", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102378}, {"name": "zipBytes24", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102408}, {"name": "zipBytes25", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102438}, {"name": "zipBytes26", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102468}, {"name": "zipBytes27", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102498}, {"name": "zipBytes28", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102528}, {"name": "zipBytes29", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102558}, {"name": "zipBytes30", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102588}, {"name": "zipBytes31", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102618}, {"name": "zipBytes32", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102648}, {"name": "zipBytes33", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102678}, {"name": "zipBytes34", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102708}, {"name": "zipBytes35", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102738}, {"name": "zipBytes36", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102768}, {"name": "zipBytes37", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102798}, {"name": "zipBytes38", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102828}, {"name": "zipBytes39", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102858}, {"name": "zipBytes40", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102888}, {"name": "zipBytes41", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102918}, {"name": "zipBytes42", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102948}, {"name": "zipBytes43", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 102978}, {"name": "zipBytes44", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103008}, {"name": "zipBytes45", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103038}, {"name": "zipBytes46", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103068}, {"name": "zipBytes47", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103098}, {"name": "zipBytes48", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103128}, {"name": "zipBytes49", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103158}, {"name": "zipBytes50", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103188}, {"name": "zipBytes51", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103218}, {"name": "zipBytes52", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103248}, {"name": "zipBytes53", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103278}, {"name": "zipBytes54", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103308}, {"name": "zipBytes55", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103338}, {"name": "zipBytes56", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103368}, {"name": "zipBytes57", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103398}, {"name": "zipBytes58", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103428}, {"name": "zipBytes59", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103458}, {"name": "zipBytes60", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103488}, {"name": "zipBytes61", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103518}, {"name": "zipBytes62", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103548}, {"name": "zipBytes63", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103578}, {"name": "zipBytes64", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103608}, {"name": "zipBytes65", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103638}, {"name": "zipBytes66", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103668}, {"name": "zipBytes67", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103698}, {"name": "zipBytes68", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103728}, {"name": "zipBytes69", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103758}, {"name": "zipBytes70", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103788}, {"name": "zipBytes71", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103818}, {"name": "zipBytes72", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103848}, {"name": "zipBytes73", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103878}, {"name": "zipBytes74", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103908}, {"name": "zipBytes75", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103938}, {"name": "zipBytes76", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103968}, {"name": "zipBytes77", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 103998}, {"name": "zipBytes78", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104028}, {"name": "zipBytes79", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104058}, {"name": "zipBytes80", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104088}, {"name": "zipBytes81", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104118}, {"name": "zipBytes82", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104148}, {"name": "zipBytes83", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104178}, {"name": "zipBytes84", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104208}, {"name": "zipBytes85", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104238}, {"name": "zipBytes86", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104268}, {"name": "zipBytes87", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104298}, {"name": "zipBytes88", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104328}, {"name": "zipBytes89", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104358}, {"name": "zipBytes90", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104388}, {"name": "zipBytes91", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104418}, {"name": "zipBytes92", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104448}, {"name": "zipBytes93", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104478}, {"name": "zipBytes94", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104508}, {"name": "zipBytes95", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104538}, {"name": "zipBytes96", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104568}, {"name": "zipBytes97", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104598}, {"name": "zipBytes98", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104628}, {"name": "zipBytes99", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104658}, {"name": "zipBytes100", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104688}, {"name": "zipBytes101", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104718}, {"name": "zipBytes102", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104748}, {"name": "zipBytes103", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104778}, {"name": "zipBytes104", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104808}, {"name": "zipBytes105", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104838}, {"name": "zipBytes106", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104868}, {"name": "zipBytes107", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104898}, {"name": "zipBytes108", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104928}, {"name": "zipBytes109", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104958}, {"name": "zipBytes110", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 104988}, {"name": "zipBytes111", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105018}, {"name": "zipBytes112", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105048}, {"name": "zipBytes113", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105078}, {"name": "zipBytes114", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105108}, {"name": "zipBytes115", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105138}, {"name": "zipBytes116", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105168}, {"name": "zipBytes117", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105198}, {"name": "zipBytes118", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105228}, {"name": "zipBytes119", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105258}, {"name": "zipBytes120", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105288}, {"name": "zipBytes121", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105318}, {"name": "zipBytes122", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105348}, {"name": "zipBytes123", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105378}, {"name": "zipBytes124", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105408}, {"name": "zipBytes125", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105438}, {"name": "zipBytes126", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105468}, {"name": "zipBytes127", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105498}, {"name": "zipBytes128", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105528}, {"name": "zipBytes129", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105558}, {"name": "zipBytes130", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105588}, {"name": "zipBytes131", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105618}, {"name": "zipBytes132", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105648}, {"name": "zipBytes133", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105678}, {"name": "zipBytes134", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105708}, {"name": "zipBytes135", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105738}, {"name": "zipBytes136", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105768}, {"name": "zipBytes137", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105798}, {"name": "zipBytes138", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105828}, {"name": "zipBytes139", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105858}, {"name": "zipBytes140", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105888}, {"name": "zipBytes141", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105918}, {"name": "zipBytes142", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105948}, {"name": "zipBytes143", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 105978}, {"name": "zipBytes144", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106008}, {"name": "zipBytes145", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106038}, {"name": "zipBytes146", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106068}, {"name": "zipBytes147", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106098}, {"name": "zipBytes148", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106128}, {"name": "zipBytes149", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106158}, {"name": "zipBytes150", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106188}, {"name": "zipBytes151", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106218}, {"name": "zipBytes152", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106248}, {"name": "zipBytes153", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106278}, {"name": "zipBytes154", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106308}, {"name": "zipBytes155", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106338}, {"name": "zipBytes156", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106368}, {"name": "zipBytes157", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106398}, {"name": "zipBytes158", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106428}, {"name": "zipBytes159", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106458}, {"name": "zipBytes160", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 106488}, {"name": "zipBytes161", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 11896}];
}

var bookABI = loadBookABI();

var authorABI = loadAuthorABI();

var zipABI;

var libraryAddress = '0x41Ea336a5b7Dd1b4Fc71E837c23349C17A87f6E6';

var thirdPartyProvider;

var libraryContract; //This loads the library ABI, responsible for most functions on our site

function loadBookTextChunk(bookID, chunk){
	return loadInfoAddress(bookID).then(function(res){
		currentContract = new web3.eth.Contract(bookABI, res);
		return currentContract.methods.book__textAddress().call().then(function(res2){
			textContract= new web3.eth.Contract(loadZipABI(), res2);
			var tempFunction = new Function("contract", "return contract.methods.zipBytes" + chunk + "().call().catch(function(error){ console.log(error);});");
			return tempFunction(textContract);
		});
	});
}

async function getBookTextBlockchain(bookID) {
	
	var size = await loadBookVariable(bookID, 'size');
	var numByteArrays = Math.floor(size/8192);
	if (size%255 !== 0) {
		numByteArrays++;
	}
	
	bytePromises = [];
	
	for(var i = 0; i<numByteArrays; i++){
		bytePromises.push(loadBookTextChunk(bookID, i));
	}
	
	Promise.all(bytePromises).then(function(values){
		console.log(values[0]);
	});
}

function getBookTextServer(bookID) {
	return new JSZip.external.Promise(function(resolve, reject) {
		JSZipUtils.getBinaryContent('/zips/' + bookID +'.zip', function(err, data) {
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
	
	document.getElementById('Holocron Info').innerHTML = '<p>Welcome to the Holocron Foundation.</p>';
	
	document.getElementById('bookText').innerHTML = '<p></p>';
	
	bookABI = loadBookABI(bookID); //This loads the individual book ABI, responsible primarily for getters	
	
	zipABI = loadZipABI(bookID); //This loads the zip files ABI, responsible for downloading zip files
	
	var zip = new JSZip();
	
	var bookName = await loadBookVariable(bookID, 'title', true, true);
	
	document.title = 'Holocron.Foundation ♢ ' + bookName;
	
	var holocronInfoText = 'Welcome to the Holocron Foundation. You are reading ' + bookName + '. This text is Public Domain within the United States, so feel free to use the text however you would like.';
	
	document.getElementById('Holocron Info').innerHTML = '<p>' + holocronInfoText + '</p>';
	
	var uploaded = await loadBookVariable(bookID, 'uploaded', false);
	
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
		document.getElementById('bookText').innerHTML = '<p>' + text + '</p>';
	},    function error(e) {
   		document.getElementById('bookText').innerHTML = '<p> An error has occurred. Please refresh the page and check your connection. If this error persists please let us know about it at samuel.troper@holocron.founcation and note the following error: ' + e + '</p>';
	});
}

function setupWeb3() {
	if (typeof web3 !== 'undefined') {
		thirdPartyProvider = true;
		result = new Web3(web3.currentProvider);
		return new Web3(web3.currentProvider); //If you already have a web3 provider (e.g. metamask) uses that
	}
	else {
		thirdPartyProvider = false;
		result = new Web3(new Web3.providers.HttpProvider("https://api.myetherapi.com/rop")); //sets us as the provider
		//To do: Disable donation without an external provider
	}
	libraryContract = new result.eth.Contract(loadLibraryContractABI(), libraryAddress);
	return result;
}

function loadBookInfoBoxes(){
	var elements = document.getElementsByClassName("bookInfo");
	for (var i = 0; i < elements.length; i++){
		loadBookInfoBox(parseInt(elements[i].getAttribute("name")));
	}
}

function getAuthors(bookID, localStorageAccess=true){
	if(localStorageAccess){
		var localStorageName = '<' + bookID.toString() + '>authors';
		var localItem = localStorage.getItem(localStorageName);
		if(localItem != null){
			return Promise.resolve(parseLocalStorage(localItem));
		}
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
				if(localStorageAccess){
					storeBookInfo(bookID, 'authors', authorNameArray);
				}
				return authorNameArray;
			}
		});
	});
}

function getAuthorRoles(bookID, localStorageAccess=true){
	if(localStorageAccess){
		var localStorageName = '<' + bookID.toString() + '>authorRoles';
		var localItem = localStorage.getItem(localStorageName);
		if(localItem != null){
			return Promise.resolve(parseLocalStorage(localItem));
		}
	}
	return loadInfoAddress(bookID).then(function(res){
		currentContract = new web3.eth.Contract(bookABI, res);
		return currentContract.methods.book__authorRoles().call().then(function(res1){
			if(res1 == null){
				return 'None';
			}
			var authorRolesIDArray = res1.slice(2).match(/.{1,2}/g);
			if(localStorageAccess){
				storeBookInfo(bookID, 'authorRoles', authorRolesIDArray);
			}
			return authorRolesIDArray;
		});
	});
}

function loadBookInfoBox(bookID){
	loadInfoAddress(bookID)
	.then(function(res){
		var titlePromise = loadBookVariable(bookID, 'title', true, true);
		var langPromise = loadBookVariable(bookID, 'language', true, true);
		var sizePromise = loadBookVariable(bookID, 'size');
		var authorPromise = getAuthors(bookID);
		var weiPromise = loadBookVariable(bookID, 'donations', false);
		var authorRolePromise = getAuthorRoles(bookID);
		var authorIDsPromise = loadBookVariable(bookID, 'authorIDs');
		Promise.all([titlePromise, authorPromise, langPromise, sizePromise, weiPromise, authorRolePromise, authorIDsPromise]).then(async function(values) {
			
			var size = values[3];
			var titleClean = values[0];
			var languageClean = values[2];
			var authorRolesIDArray = values[5];
			var donationsETH = web3.utils.fromWei(values[4].toString(), "ether");
			var gweiStorageCost = calculateStorageCost(size, web3.utils.toWei("9", "gwei"));
			var newHTML = '<p class="title"><a href="./book.html?bookID=' + bookID.toString() + '"><b>' + titleClean + '</b></a></p> ';
			if(authorRolesIDArray != 'None'){
				var authorIDArray =  values[6].slice(2).match(/.{1,4}/g);
				var authorNameArray = values[1];

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
			//Language Info
			newHTML += '<p class="lang">Language: ' + languageClean + '</p>';
			
			//View text
			newHTML += '<p class="textLink"><a href="./text.html?bookID=' + bookID.toString() + '">View the text</a></p>';
			
			//Donation meter
			newHTML += '<meter value="' + donationsETH + '" min="0" max="2.3"></meter>';
			
			//Donation stats
			newHTML += '<p class="recieved">' + donationsETH + ' Ξ Recieved / ≈' + web3.utils.fromWei(gweiStorageCost.toString(), "ether") + ' Ξ Needed</p>';
			
			//Donation slider
			newHTML += '<div class="splitSlider"><p class="blankFlex1"></p><p class="left" id="bookSplit' + bookID + '">Book: 70%</p><input type="range" min="0" max="100" value="30" class="slider" id="slider' + bookID +'" onchange="updateSplitValues(this.value, ' + bookID + ');"><p class="right" id="foundationSplit' + bookID + '">Foundation: 30%</p><p class="blankFlex1"></p></div>';
			
			//ETH donate
			newHTML += '<p><a href="javascript:donate(' + bookID + ');">Donate with Ξ</a></p>';
			
			//Other donate
			newHTML += '<p><a href="./donate.html?bookID=' + bookID.toString() + '">Donate with BTC, LTC, or USD</a></p>';
			
			console.log(bookID);
			console.log(document.getElementsByName(bookID.toString()));
			console.log(document.getElementsByName(bookID.toString())[0]);
			infoItem = document.getElementsByName(bookID.toString())[0];
			infoItem.innerHTML = newHTML;
			storeBookInfo(bookID, 'basicInfo', true);
		}).catch(function(error){
			console.log(error);
			removeBookEntry(bookID);
		});
	});
}

function updateSplitValues(newValue, bookID){
	document.getElementById('foundationSplit'+bookID).innerHTML = "Foundation: " + newValue + "%";
	document.getElementById('bookSplit'+bookID).innerHTML = "Book: " + (100-newValue) + "%";
}

function loadInfoAddress(bookID, localStorageAccess=true){
	if(localStorageAccess){
		localStorageName = '<' + bookID.toString() + '>infoAddress';
		var localItem = localStorage.getItem(localStorageName);
		if(localItem != null){
			return Promise.resolve(parseLocalStorage(localItem));
		}
	}
	return libraryContract.methods.getBookAddress(bookID).call()
	.then(function(res){
		if(localStorageAccess){
			storeBookInfo(bookID, 'infoAddress', res);
		}
		return res;
	});
}

function loadBookVariable(bookID, infoName, useCache=true, hexEncodedInContract=false){
	if(useCache){
		var localStorageName = '<' + bookID.toString() + '>' + infoName;
		var localItem = localStorage.getItem(localStorageName);
		if(localItem != null){
			return Promise.resolve(parseLocalStorage(localItem));
		}
	}
	return loadInfoAddress(bookID, useCache).then(function(res){
		var currentContract = new web3.eth.Contract(bookABI, res);
		
		var contractString = "return contract.methods.book__" + infoName + "().call().then(function(success){"
		
		if(hexEncodedInContract){
			contractString += "success = hex2a(success);"
		}
		
		if(useCache){
			contractString += "storeBookInfo(" + bookID + ", '" + infoName + "', success);"
		}
		
		contractString += "return success;}).catch(function(error){ console.log(error); removeBookEntry(" + bookID + ");});";
		
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

function donate(bookID, invalidNumber=false){
	//need bookID, foundationSplitNumerator, foundationSplitDenominator, donationvalue
	var donationValueString;
	if(invalidNumber){
		donationValueString = prompt("You entered an invalid number. Please enter the size of your donation, in ETH:", "0");
	}
	else{
		donationValueString = prompt("Please enter the size of your donation, in ETH:", "0");
	}
	var donationValue = parseInt(donationValueString);
	if(isNaN(donationValue) || donationValue <= 0){
		donate(bookID, true);
	}
	else {
		var foundationSplitNumerator = document.getElementById('slider'+bookID).value;
		var foundationSplitDenominator = 100;
		libraryContract.methods.donate(bookID, foundationSplitNumerator, foundationSplitDenominator).send({
			value: donationValue
		}).on('transactionHash', function(hash){
			alert('Your donation has sent! The transaction hash is: ' + hash);
		}).catch(function(error){
			if(error == 'Error: No "from" address specified in neither the given options, nor the default options.'){
				alert("You were unable to send an Ξ donation because you don't have a default address set. Consider downloading the Metamask Extension (for Chrome, Firefox, Opera, or Brave) or the Mist Browser.\nMetamask: https://metamask.io/\nMist: https://github.com/ethereum/mist")
			}
			else {
				alert('There was an error sending your donation. Error message: ' + error);
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
		var randomnumber = Math.floor(Math.random()*max);
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

function searchLocalStorage(searchString){
	
}

function sortedLocalStorageArray(){
	var localStorageArray = new Array();
	for (i=0;i<localStorage.length;i++){
		localStorageArray[i] = localStorage.key(i)+localStorage.getItem(localStorage.key(i));
	}
	var sortedArray = localStorageArray.sort();
	return sortedArray;
}

function checkIfCached(bookID){
	var localStorageName = '<' + bookID.toString() + '>basicInfo';
	var localItem = localStorage.getItem(localStorageName);
	//Need to double check how true is actually stored. Is it "true" or "1"?
	if(localItem == 'true'){
		return true;
	}
	return false;
}

function workerCacheBooks(maxIndexNumber, existingWorker=null){
	var randomnumber = Math.floor(Math.random()*maxIndexNumber);
	if(!checkIfCached(randomnumber)){
		if(existingWorker==null){
			existingWorker = new Worker('./js/workerCacheInfo.js');
			existingWorker.onmessage = function(e){
				logData = e.data;
				for(var i = 0; i<logData.length; i++){
					storeBookInfo(logData[i][0], logData[i][1], logData[i][2]);
				}
				workerCacheBooks(maxIndexNumber, existingWorker);
				console.log(localStorage);
			}
		}
		existingWorker.postMessage(randomnumber);
	}
	else{
		workerCacheBooks(maxIndexNumber, existingWorker);
	}
}

function mainCacheBooks(maxIndexNumber){
	var randomnumber = Math.floor(Math.random()*maxIndexNumber);
	loadInfoAddress(bookID)
	.then(function(res){
		var titlePromise = loadBookVariable(bookID, 'title', true, true);
		var langPromise = loadBookVariable(bookID, 'language', true, true);
		var sizePromise = loadBookVariable(bookID, 'size');
		var authorPromise = getAuthors(bookID);
		var weiPromise = loadBookVariable(bookID, 'donations', false);
		var authorRolePromise = getAuthorRoles(bookID);
		var authorIDsPromise = loadBookVariable(bookID, 'authorIDs');
		Promise.all([titlePromise, authorPromise, langPromise, sizePromise, weiPromise, authorRolePromise, authorIDsPromise])
		.then(function(){
			mainCacheBooks(maxIndexNumber);
		}).catch(function(error){
			console.log(error);
			mainCacheBooks(maxIndexNumber);
		});
	})
	.catch(function(error){
		console.log(error);
		mainCacheBooks(maxIndexNumber);
	});
}

//Consider adding maxIndex to library contract?
function cacheBooks(maxIndexNumber, workerThreads) {
	if (window.Worker) {
		for(var i = 0; i < workerThreads; i++){
			workerCacheBooks(maxIndexNumber);
		}
	}
	else {
		mainCacheBooks(maxIndexNumber)
	}
}