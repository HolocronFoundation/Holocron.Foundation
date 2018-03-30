#This is a template for generating a contract for each library entry in the
#Holocron.Foundation library.

#This is written in Vyper, an Ethereum Coding Language

#Items preceded by a * will be filled in by a script on a case by case basis.

################################################################################

#The real deal

#Update contract for calling
@private
class UpdatedDonate():
    @payable
    @public
    def donate(id: int128): pass

    @payable
    @public
    def donateWithDifferentDonor(id: int128, donorAddress: address): pass

#Logging
Donation: event({_from: indexed(address), _value: wei_value, _bookID: int128})
BookUploaded: event({_bookID: int128})
TextUploaded: event({_bookID: int128})

#Address Array - Authorized Contract Editors
    #3 addresses to allow for editing and backups
    #First address recieves ETH immeadiately
foundationAddresses: public(address[3])

#foundationMultiplier and foundationDivisor are used to fractionalize donations without decimals
foundationSplitNumerator: public(int128)
foundationSplitDenominator: public(int128)

#Update address - Address for an updated contract, to allow for patches.
updateAddress: public(address)
updatedContract: public(bool)

#book struct: This struct will contain all the info for a given book
books: public(address[int128])

#Initiation
@public
def __init__(_foundationAddresses: address[3], _foundationSplitNumerator: int128, _foundationSplitDenominator: int128):
    self.foundationAddresses = _foundationAddresses
    self.foundationSplitNumerator = _foundationSplitNumerator
    self.foundationSplitDenominator = _foundationSplitDenominator
    self.updatedContract = False

#To do: require 2/3 addresses to change an address, or a waiting period for a single
    #one to change it...
@public
def changeFoundationAddresses(index: int128, newAddress: address):
    assert msg.sender in self.foundationAddresses
    assert index >= 0 and index <= 2
    self.foundationAddresses[index] = newAddress

@public
def changeFoundationSplit(_foundationSplitNumerator: int128, _foundationSplitDenominator: int128):
    assert msg.sender in self.foundationAddresses
    self.foundationSplitNumerator = _foundationSplitNumerator
    self.foundationSplitDenominator = _foundationSplitDenominator

#donate - splits funds recieved between the foundation and an individual text
@payable
@public
def donate(id: int128):
    if self.updatedContract:
        UpdatedDonate(self.updateAddress).donate(id)
        #Call donate at updated contract
    else:
        split: wei_value = as_wei_value(msg.value * self.foundationSplitNumerator / self.foundationSplitDenominator, "wei")
        send(self.foundationAddresses[0], split)
        self.book[id].donations += as_wei_value(msg.value, "wei") - split
        log.Donation(msg.sender, msg.value, id)

@payable
@public
def donateWithDifferentDonor(id: int128, donorAddress: address):
    if self.updatedContract:
        UpdatedDonate(self.updateAddress).donateWithDifferentDonor(id, donorAddress)
        #Call donate at updated contract
    else:
        split: wei_value = as_wei_value(msg.value * self.foundationSplitNumerator / self.foundationSplitDenominator, "wei")
        send(self.foundationAddresses[0], split)
        self.book[id].donations += as_wei_value(msg.value, "wei") - split
        log.Donation(donorAddress, msg.value, id)

@public
def setUpdateAddress(newUpdateAddress: address):
    assert msg.sender in self.foundationAddresses
    self.updateAddress = newUpdateAddress

@public
def AddBook(id: int128, _title: bytes32[2], _USPublicDomain: bool, _language: bytes <= 2, _libraryOfCongress: bytes <= 2,
            _subjects: bytes <= 4, _authorID: bytes<=2, _authorRole: bytes<=1, _size: int128):
    assert msg.sender in self.foundationAddresses
    _authorRoles: int128[3]
    _authorIDs: int128[3]
    self.book[id] = {
        title: _title,
        titleExpansion: False,
        USPublicDomain: _USPublicDomain,
        language: _language,
        libraryOfCongress: _libraryOfCongress,
        libraryOfCongressExpansion: False,
        subjects: _subjects,
        subjectsExpansion: False,
        authorID: _authorID,
        authorRole: _authorRole,
        authorExpansion: False,
        size: _size,
        donations: 0,
        textAddress: None,
        uploaded: False,
        otherExpansion: False,
        expansionAddress: None
    }
    log.BookUploaded(id)

@public
def AddBookWithExpansion(id: int128, _title: bytes32[2], _titleExpansion: bool, _USPublicDomain: bool, _language: bytes <= 2, _libraryOfCongress: bytes <= 2,
            _libraryOfCongressExpansion: bool, _subjects: bytes <= 4, _subjectsExpansion: bool, _authorID: bytes<=2, _authorRole: bytes<=1, _authorExpansion: bool,
            _size: int128, _otherExpansion: bool, _expansionAddress: address):
    assert msg.sender == self.foundationAddresses[0]
    _authorRoles: int128[3]
    _authorIDs: int128[3]
    self.book[id] = {
        title: _title,
        titleExpansion: _titleExpansion,
        USPublicDomain: _USPublicDomain,
        language: _language,
        libraryOfCongress: _libraryOfCongress,
        libraryOfCongressExpansion: _libraryOfCongressExpansion,
        subjects: _subjects,
        subjectsExpansion: _subjectsExpansion,
        authorID: _authorID,
        authorRole: _authorRole,
        authorExpansion: _authorExpansion,
        size: _size,
        donations: 0,
        textAddress: None,
        uploaded: False,
        otherExpansion: _otherExpansion,
        expansionAddress: _expansionAddress
    }
    log.BookUploaded(id)
    
#Adds address for full book text. Also sets uploaded to True.
@public
def setTextAddress(id: int128, uploadAddress: address):
    assert msg.sender in self.foundationAddresses
    self.book[id].textAddress = uploadAddress
    self.book[id].uploaded = True
    log.TextUploaded(id)

#Adds expansion address for a given entry.
@public
def setExpansionAddress(id: int128, expansionAddress: address, otherExpansion: bool):
    assert msg.sender in self.foundationAddresses
    self.book[id].expansionAddress = expansionAddress
    self.book[id].otherExpansion = otherExpansion
