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
foundationSplit: public(decimal)

#Update address - Address for an updated contract, to allow for patches.
updateAddress: public(address)

#book struct: This struct will contain all the info for a given book
book: public({
    title: bytes <= 10,   #NEEDS FIXED
    USPublicDomain: bool,
    language: bytes <= 2,
    libraryOfCongress: bytes <= 10,    #NEEDS FIXED
    subjects: bytes <= 10,     #NEEDS FIXED
    authorIDs: int128[3],    #NEED TO CHECK LENGTH NEEDED
    authorRoles: int128[3],      #NEED TO CHECK LENGTH NEEDED
    size: int128,
    donations: wei_value,
    textAddress: address,
    uploaded: bool
}[int128])
#Need to add method to add addional authors

#Initiation
@public
def __init__(_foundationAddresses: address[3], _foundationSplit: decimal):
    self.foundationAddresses = _foundationAddresses
    self.foundationSplit = _foundationSplit

#Address Array - Authorized Contract Editors
    #3 addresses to allow for editing and backups
    #First address recieves ETH immeadiately
@public
def changeFoundationAddresses(index: int128, newAddress: address):
    assert msg.sender == self.foundationAddresses[0]
    assert index >= 0
    self.foundationAddresses[index] = newAddress

#donate - splits funds recieved between the foundation and an individual text
@payable
@public
def donate(id: int128):
    split: wei_value = as_wei_value(msg.value * self.foundationSplit, "wei")
    send(self.foundationAddresses[0], split)
    self.book[id].donations += as_wei_value(msg.value, "wei") - split
    log.Donation(msg.sender, msg.value)

@public
def setUpdateAddress(newUpdateAddress: address):
    assert msg.sender == self.foundationAddresses[0]
    self.updateAddress = newUpdateAddress

@public                 #NEEDS FIXED                                                        N           EEDS FIXED                  NEEDS FIXEd             Needs fixed     Needs fixed
def AddBook(id: int128, _title: bytes  <= 10, _USPublicDomain: bool, _language: bytes <= 2, _libraryOfCongress: bytes <= 10, _subjects: bytes <= 10, _authorID: int128, _authorRole: int128, _size: int128):
    assert msg.sender == self.foundationAddresses[0]
    _authorRoles: int128[3]
    _authorIDs: int128[3]
    self.book[id] = {
        title: _title,
        USPublicDomain: _USPublicDomain,
        language: _language,
        libraryOfCongress: _libraryOfCongress,
        subjects: _subjects,
        authorIDs: _authorIDs,
        authorRoles: _authorRoles,
        size: _size,
        donations: 0,
        textAddress: self.foundationAddresses[0],
        uploaded: False
    }
    log.BookUploaded(id)
    
#Adds address for full book text. Also sets uploaded to True.
@public
def setTextAddress(id: int128, uploadAddress: address):
    assert msg.sender == self.foundationAddresses[0]
    self.book[id].textAddress = uploadAddress
    self.book[id].uploaded = True
