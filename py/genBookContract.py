#This is used to generate book contracts. This uses less space than simply
#creating expansion contracts with default storage sizes.

#Version pre-alpha 1.0

################################################################################

import csv, ast

#Imports the database as a CSV.
def importDBCSV(defaultFile='finalBooksHopefully.csv'):
    arrayOutput = []
    with open(defaultFile, 'r', encoding='utf-8') as readFile:
        reader = csv.reader(readFile, delimiter='|')
        for row in reader:
            arrayOutput.append(row)
    return arrayOutput

def outputVyperFile():
    collection = importDBCSV()
    first = True
    for row in collection:
        if ast.literal_eval(row[3]) == 1 and not first:
            genVyperFile(row)
        else:
            first = False

def genVyperFile(dataRow):
    vyperFileString = '''
@private
class SendDonation():
    @payable
    @public
    def donateWithDifferentDonor(id: int128, donorAddress: address): pass

version: public(bool) = 1
parentAddress: public(address) =
expansionAddress: public(address) = None
usesExpansion: public(bool) = 0

book: public({

    id: int128 = ''' + dataRow[0] + ''',

    title: bytes <= ''' + str(len(dataRow[1].encode('utf-8'))) + ' = ' + str(dataRow[1].encode('utf-8')) + ''',

    USPublicDomain: bool = 1,

    language: bytes <= 2 = ''' + dataRow[4] + ''',

    libraryOfCongress: bytes <= ''' + str(2*len(ast.literal_eval(dataRow[6]))) + ' = ' + bytes(ast.literal_eval(dataRow[6])) + ''',

    subjects: 

    authorIDs: 

    authorRoles: 

    size: int128,

    donations: wei_value,

    textAddress: address,

    uploaded: bool

})

@payable
@public
def donate():
    SendDonation(self.parentAddress).donateWithDifferentDonor(self.book.id, msg.sender)

@public
def changeParentAddress(newAddress: address):
    assert msg.sender == self.parentAddress
    self.parentAddress = newAddress

@public
def addExpansionAddress(_expansionAddress: address):
    assert msg.sender == self.parentAddress
    self.expansionAddress = _expansionAddress
    self.usesExpansion = 1
'''
