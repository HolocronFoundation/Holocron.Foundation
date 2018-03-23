#This is a template for generating a contract for each library entry in the
#Holocron.Foundation library.

#This is written in Vyper, an Ethereum Coding Language

#Struct Book Info - This struct will contain all the info for a given book     DONE
    #title
    #copyright
    #language
    #library of congress
    #subjects
    #authorIDs
    #authorRoles

#Address - Full book text (When uploaded)   DONE
    #Method - Add address
#Boolean - uploaded (True when uploaded)    DONE
    #Method - Change uploaded

#Address Array - Authorized Contract Editors   DONE
    #3 addresses to allow for editing
    #First address recieves ETH immeadiately
    #Method - Change address

#Middleman Method - Sends 30% to primary foundation address immeadiately, holds the rest     DONE
                    #for the upload of the books

#Update address - Address for an updated contract, if needed     DONE

#Items preceded by a * will be filled in by a script on a case by case basis.

################################################################################

#The real deal

#Stored information
foundationAddresses: public(address[3]) #These can be used to modify the contract.
                                        #The first address is also the recipient of
                                        #funds sent to the contract address
@public
def changeFoundationAddresses(index int128, newAddress address):
    assert msg.sender in foundationAddresses
    assert index >= 0
    assert index < 3
    self.foundationAddresses[index] = newAddress

@payable
@public
def donate():
    send(self.foundationAddresses[0], msg.value * self.foundationCut)

updateAddress: public(address)
@public
def setUpdateAddress(newUpdateAddress address):
    assert msg.sender == self.foundationAddresses[0]
    self.updateAddress = newUpdateAddress

book: public({
    title: public(bytes <= *titleLengthBytes)
    USPublicDomain: public(bool)
    language: public(bytes <= 2)
    libraryOfCongress: public(bytes <= *libraryOfCongressBytes)
    subjects: public(bytes <= *subjectsBytes)
    authorIDs: public(int128[*numAuthors])
    authorRoles: public(int128[*numAuthors])
})

foundationCut: public(int128)

textAddress: public(address)
uploaded: public(bool)
@public
def setTextAddress(uploadAddress address):
    assert msg.sender == self.foundationAddresses[0]
    self.textAddress = uploadAddress
    self.uploaded = True
