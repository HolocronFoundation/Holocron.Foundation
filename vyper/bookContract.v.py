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
    def donate(id: int128, foundationSplitNumerator: int128, foundationSplitDenominator: int128): pass

    @payable
    @public
    def donateWithDifferentDonor(id: int128, foundationSplitNumerator: int128, foundationSplitDenominator: int128, donorAddress: address): pass

#Book Contract Calling
@private
class BookContract():
    @public
    def changeParentAddress(newAddress: address):
        assert msg.sender == self.parentAddress
        self.parentAddress = newAddress

    @public
    def addExpansionAddress(_expansionAddress: address):
        assert msg.sender == self.parentAddress
        self.expansionAddress = _expansionAddress
        self.usesExpansion = True

    @public
    def addText(_textAddress: address):
        assert msg.sender == self.parentAddress
        self.book.textAddress = _textAddress
        self.book.uploaded = True

    @public
    def recieveDonation(value: wei_value):
        assert msg.sender == self.parentAddress
        self.book.donations = self.book.donations + value
    

#Logging
Donation: event({_from: indexed(address), _value: wei_value, _bookID: int128})
BookUploaded: event({_bookID: int128})
TextUploaded: event({_bookID: int128})

#Address Array - Authorized Contract Editors
    #3 addresses to allow for editing and backups
    #First address recieves ETH immeadiately
foundationAddresses: public(address[3])

#Update address - Address for an updated contract, to allow for patches.
updateAddress: public(address)
updatedContract: public(bool)

#Book mapping
books: public(address[int128])

#Authors mapping
authors: public(address[int128])

#Subjects mapping
subjects: public(address[int128])

#Library of Congress mapping
LoC: public(address[int128])

#Was running into issues, so I created a getter.
@public
@constant
def getBookAddress(bookID: int128) -> address:
    return self.books[bookID]

@public
def addBook(id: int128, bookAddress: address):
    assert msg.sender in self.foundationAddresses
    self.books[id] = bookAddress

@public
@constant
def getAuthorAddress(authorID: int128) -> address:
    return self.authors[authorID]

@public
def addAuthor(id: int128, authorAddress: address):
    assert msg.sender in self.foundationAddresses
    self.authors[id] = authorAddress

@public
@constant
def getSubjectAddress(subjectID: int128) -> address:
    return self.subjects[subjectID]

@public
@constant
def getLoCAddress(LoCID: int128) -> address:
    return self.LoC[LoCID]

#Initiation
@public
def __init__(_foundationAddresses: address[3]):
    self.foundationAddresses = _foundationAddresses
    self.updatedContract = False

#To do: require 2/3 addresses to change an address, or a waiting period for a single
    #one to change it... If the address being changes is the recipient of funds,
    #then halt funds for a short period of time...
@public
def changeFoundationAddresses(index: int128, newAddress: address):
    assert msg.sender in self.foundationAddresses
    assert index >= 0 and index <= 2
    self.foundationAddresses[index] = newAddress

#donate - splits funds recieved between the foundation and an individual text
@payable
@public
def donate(id: int128, foundationSplitNumerator: int128, foundationSplitDenominator: int128):
    assert foundationSplitNumerator <= foundationSplitDenominator
    if self.updatedContract:
        UpdatedDonate(self.updateAddress).donate(id, foundationSplitNumerator, foundationSplitDenominator)
        #Call donate at updated contract
    else:
        split: wei_value = as_wei_value(msg.value * foundationSplitNumerator / foundationSplitDenominator, "wei")
        send(self.foundationAddresses[0], split)
        BookContract(self.books[id]).recieveDonation(as_wei_value(msg.value, "wei") - split)
        log.Donation(msg.sender, msg.value, id)

@payable
@public
def donateWithDifferentDonor(id: int128, foundationSplitNumerator: int128, foundationSplitDenominator: int128, donorAddress: address):
    if self.updatedContract:
        UpdatedDonate(self.updateAddress).donateWithDifferentDonor(id, foundationSplitNumerator, foundationSplitDenominator, donorAddress)
        #Call donate at updated contract
    else:
        split: wei_value = as_wei_value(msg.value * foundationSplitNumerator / foundationSplitDenominator, "wei")
        send(self.foundationAddresses[0], split)
        BookContract(self.books[id]).recieveDonation(as_wei_value(msg.value, "wei") - split)
        log.Donation(donorAddress, msg.value, id)

@public
def setUpdateAddress(newUpdateAddress: address):
    assert msg.sender in self.foundationAddresses
    self.updateAddress = newUpdateAddress
    
#Adds address for full book text. Also sets uploaded to True.
@public
def setTextAddress(id: int128, textAddress: address):
    assert msg.sender in self.foundationAddresses
    BookContract(self.books[id]).addText(textAddress)
    log.TextUploaded(id)

#Adds expansion address for a given entry.
@public
def setExpansionAddress(id: int128, expansionAddress: address):
    assert msg.sender in self.foundationAddresses
    BookContract(self.books[id]).addExpansionAddress(expansionAddress)

#Allows for withdrawals, given a set bookID # This will be deprecated later by an update once a better
                                            # Uploading method with a middleman contract is determined.
@public
def withdrawFunds(bookID: int128, withdrawalAddress: address, withdrawal: wei_value):
    assert not self.updatedContract
    assert msg.sender in self.foundationAddresses
    send(withdrawalAddress, withdrawal)
