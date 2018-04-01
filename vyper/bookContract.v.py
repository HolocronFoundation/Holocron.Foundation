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

#Book Contract Calling
@private
class BookContract():
    @public
    def changeParentAddress(newAddress: address): pass

    @public
    def addExpansionAddress(_expansionAddress: address): pass

    @public
    def addText(_textAddress: address): pass
    

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
    #one to change it... If the address being changes is the recipient of funds,
    #then halt funds for a short period of time...
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
def AddBook(id: int128, bookAddress: address):
    assert msg.sender in self.foundationAddresses
    self.books[id] = address
    
#Adds address for full book text. Also sets uploaded to True.
@public
def setTextAddress(id: int128, textAddress: address):
    assert msg.sender in self.foundationAddresses
    self.book[id] = uploadAddress
    self.book[id] = True
    log.TextUploaded(id)

#Adds expansion address for a given entry.
@public
def setExpansionAddress(id: int128, expansionAddress: address):
    assert msg.sender in self.foundationAddresses
    self.book[id].expansionAddress = expansionAddress
    self.book[id].otherExpansion = otherExpansion
