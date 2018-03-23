#This is a template for generating a contract for each library entry in the
#Holocron.Foundation library.

#This is written in Vyper, an Ethereum Coding Language

#Items preceded by a * will be filled in by a script on a case by case basis.

################################################################################

#The real deal

#Initiation
@public
def __init__(_foundationAddresses: address[3], _foundationMultiplier: int128, _foundationDivisor: int128):
    foundationAddresses = _foundationAddresses
    foundationMultiplier = _foundationMultiplier
    foundationDivisor = _foundationDivisor

#Address Array - Authorized Contract Editors
    #3 addresses to allow for editing and backups
    #First address recieves ETH immeadiately
foundationAddresses: public(address[3])
@public
def changeFoundationAddresses(index int128, newAddress address):
    assert msg.sender in foundationAddresses
    assert index >= 0
    assert index < 3
    self.foundationAddresses[index] = newAddress

#donate - splits funds recieved between the foundation and an individual text
@payable
@public
def donate():
    send(self.foundationAddresses[0], msg.value * self.foundationMultiplier / self.foundationDivisor)
#foundationMultiplier and foundationDivisor are used to fractionalize donations without decimals
foundationMultiplier = public(int128)
foundationDivisor = public(int128)

#Update address - Address for an updated contract, to allow for patches.
updateAddress: public(address)
@public
def setUpdateAddress(newUpdateAddress address):
    assert msg.sender == self.foundationAddresses[0]
    self.updateAddress = newUpdateAddress

#book struct: This struct will contain all the info for a given book
book: public({
    title: public(bytes <= *titleLengthBytes)
    USPublicDomain: public(bool)
    language: public(bytes <= 2)
    libraryOfCongress: public(bytes <= *libraryOfCongressBytes)
    subjects: public(bytes <= *subjectsBytes)
    authorIDs: public(int128[int128])
    authorRoles: public(int128[int128])
    size: public(int128)
}[int128])

@public
defAddBook(id: int128, _title , _USPublicDomain bool, _language bytes<=2, _libraryOfCongress , _subjects , _authorIDs , ):
    self.book[id] = {
        title = _title
        USPublicDomain = _USPublicDomain
        
    

#Address - Full book text (When uploaded)
textAddress: public(address)
#Uploaded - True once a text is uploaded
uploaded: public(bool)
#Adds address for full book text. Also sets uploaded to True.
@public
def setTextAddress(uploadAddress address):
    assert msg.sender == self.foundationAddresses[0]
    self.textAddress = uploadAddress
    self.uploaded = True
