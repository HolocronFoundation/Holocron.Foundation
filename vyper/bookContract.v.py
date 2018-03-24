#This is a template for generating a contract for each library entry in the
#Holocron.Foundation library.

#This is written in Vyper, an Ethereum Coding Language

#Items preceded by a * will be filled in by a script on a case by case basis.

################################################################################

#The real deal

#Logging
Donation: event({_from: indexed(address), _value: wei_value})
BookUploaded: event({_bookID: int128})

foundationAddresses: public(address[3])

#foundationMultiplier and foundationDivisor are used to fractionalize donations without decimals
foundationMultiplier: public(int128)
foundationDivisor: public(int128)

#Update address - Address for an updated contract, to allow for patches.
updateAddress: public(address)

#book struct: This struct will contain all the info for a given book
book: public({
    title: public(bytes<=10), #NEEDS GENERATED
    USPublicDomain: public(bool),
    language: public(bytes <= 2),
    libraryOfCongress: public(bytes),
    subjects: public(bytes),
    authorIDs: public(int128[int128]),
    authorRoles: public(int128[int128]),
    size: public(int128),
    donations: public(wei_value),
    textAddress: address,
    uploaded: bool
}[int128])

#Initiation
@public
def __init__(_foundationAddresses: address[3], _foundationMultiplier: int128, _foundationDivisor: int128):
    foundationAddresses = _foundationAddresses
    foundationMultiplier = _foundationMultiplier
    foundationDivisor = _foundationDivisor

#Address Array - Authorized Contract Editors
    #3 addresses to allow for editing and backups
    #First address recieves ETH immeadiately
@public
def changeFoundationAddresses(index: int128, newAddress: address):
    assert msg.sender in foundationAddresses and index >= 0 and index <= 3
    self.foundationAddresses[index] = newAddress

#donate - splits funds recieved between the foundation and an individual text
@payable
@public
def donate(id: int128):
    split: wei_value = msg.value * self.foundationMultiplier / self.foundationDivisor
    send(self.foundationAddresses[0], split)
    self.book[id].donations += msg.value - split
    log.Donation(msg.sender, msg.value)

@public
def setUpdateAddress(newUpdateAddress: address):
    assert msg.sender == self.foundationAddresses[0]
    self.updateAddress = newUpdateAddress

@public
def AddBook(id: int128, _title: bytes, _USPublicDomain: bool, _language: bytes <= 2, _libraryOfCongress: bytes, _subjects: bytes, _authorIDs: int128[int128], _authorRoles: int128[int128], _size: int128):
    assert msg.sender == self.foundationAddresses[0]
    self.book[id] = {
        title: _title,
        USPublicDomain: _USPublicDomain,
        language: _language,
        libraryOfCongress: _libraryOfCongress,
        subjects: _subjects,
        authorIDs: _authorIDs,
        authorRoles: _authorsRoles,
        size: _size,
        donations: 0,
        textAddress: 0
    }
    log.BookUploaded(id)
    
#Adds address for full book text. Also sets uploaded to True.
@public
def setTextAddress(id: int128, uploadAddress: address):
    assert msg.sender == self.foundationAddresses[0]
    self.book[id].textAddress = uploadAddress
    self.book[id].uploaded = True
