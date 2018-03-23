#This is a template for a library contract.

#This is written in Vyper, an Ethereum Coding Language.

#struct Library
    #Array of book contracts (1000)
    #Array of booleans keeping track of upload
    #Book 0 true index
    #Previous library
    #Next library

###################################################################

#The real deal

foundationAddresses: public(address[3]) #These can be used to modify the contract.
                                        #The first address is also the recipient of
                                        #funds sent to the contract address
@public
def changeFoundationAddresses(index int128, newAddress address):
    assert msg.sender in foundationAddresses
    assert index >= 0
    assert index < 3
    self.foundationAddresses[index] = newAddress

#Since the maintinence of these contracts is much smaller, the foundation
#recieves the entirety of any donations sent
@payable
@public
def donate():
    send(self.foundationAddresses[0], msg.value)

library: public({
    contracts: public(address[1000])
    initialized: public(bool[1000])
    index0: public(int128)
    previousLibrary: public(address)
    nextLibrary: public(address)
})


