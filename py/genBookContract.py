#This is used to generate book contracts. This uses less space than simply
#creating expansion contracts with default storage sizes.

#Version pre-alpha 1.0

#Note: roles are 0 - author, 1 - translator, 2 - editor, 3 - illustrator

################################################################################

import csv, ast, math, os

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
    i = 0
    for row in collection:
        if not first and ast.literal_eval(row[3]) == 1:
            i += 1
            folderNum = math.floor(i/100)
            if not os.path.exists('/Users/us.tropers/Desktop/Formatted for Upload/BookInfo/' + str(folderNum)):
                os.makedirs('/Users/us.tropers/Desktop/Formatted for Upload/BookInfo/' + str(folderNum))
            genVyperFile(row, '/Users/us.tropers/Desktop/Formatted for Upload/BookInfo/' + str(folderNum) + '/bookInfoContract' + str(row[0]) + '.v.py')
        else:
            first = False

def genVyperFile(dataRow, writeFile):
    vyperFileString = '''
@private
class SendDonation():
    @payable
    @public
    def donateWithDifferentDonor(id: int128, foundationSplitNumerator: int128, foundationSplitDenominator: int128, donorAddress: address): pass

version: public(bool)
modifierAddresses: public(address[2])
expansionAddress: public(address)
usesExpansion: public(bool)

book: public({

    id: int128,

    title: bytes[''' + genTitleBytesSize(dataRow[1]) + '''],

    copyright: bool,

    language: bytes[''' + str(len(dataRow[4])) + '''],

    libraryOfCongress: bytes[''' + genLibraryOfCongressBytesSize(dataRow[6]) + '''],

    subjects: bytes[''' + genSubjectBytesSize(dataRow[5]) + '''],

    authorIDs: bytes[''' + genAuthorIDsBytesSize(dataRow[2]) + '''],

    authorRoles: bytes[''' + genAuthorsRolesBytesSize(dataRow[2]) + '''],

    size: int128,

    donations: wei_value,

    textAddress: address,

    uploaded: bool

})

@public
def __init__(_parentAddress: address, _modifierAddress: address):

    self.version = True

    self.modifierAddresses[0] = _parentAddress

    self.modifierAddresses[1] = _modifierAddress

    self.expansionAddress = None

    self.usesExpansion = False

    self.book.id = ''' + dataRow[0] + '''
    
    self.book.title = ''' + genTitleBytes(dataRow[1])[1:] + '''
    
    self.book.copyright = False
    
    self.book.language = ''' + "'" + dataRow[4] + "'" + '''
    
    self.book.libraryOfCongress = ''' + genLibraryOfCongressBytes(dataRow[6])[1:] + '''
    
    self.book.subjects = ''' + genSubjectBytes(dataRow[5])[1:] + '''
    
    self.book.authorIDs = '''  + genAuthorIDsBytes(dataRow[2])[1:] + '''
    
    self.book.authorRoles = ''' + genAuthorsRolesBytes(dataRow[2])[1:] + '''
    
    self.book.size = ''' + dataRow[7] + '''
    
    self.book.donations = 0
    
    self.book.uploaded = False

@payable
@public
def donate(foundationSplitNumerator: int128, foundationSplitDenominator: int128):
    SendDonation(self.modifierAddresses[0]).donateWithDifferentDonor(self.book.id, foundationSplitNumerator, foundationSplitDenominator, msg.sender)

@public
def changeParentAddress(newAddress: address, index: int128):
    assert msg.sender in self.modifierAddresses
    self.modifierAddresses[index] = newAddress

@public
def addExpansionAddress(_expansionAddress: address):
    assert msg.sender in self.modifierAddresses
    self.expansionAddress = _expansionAddress
    self.usesExpansion = True

@public
def addText(_textAddress: address):
    assert msg.sender in self.modifierAddresses
    self.book.textAddress = _textAddress
    self.book.uploaded = True

@public
def recieveDonation(value: wei_value):
    assert msg.sender in self.modifierAddresses
    self.book.donations = self.book.donations + value
'''
    
    with open(writeFile, 'w', encoding = 'utf-8') as writeFile:
        writeFile.write(vyperFileString)

def genTitleBytesSize(titleData):
    return str(len(titleData.encode('utf-8')))

def genTitleBytes(titleData):
    return str(titleData.encode('utf-8'))

def genLibraryOfCongressBytesSize(LoCData):
    number = 2*len(ast.literal_eval(LoCData))
    if number == 0:
        return str(1)
    return str(number)

def genLibraryOfCongressBytes(LoCData):
    if genLibraryOfCongressBytesSize(LoCData) == str(1):
        return 'xNone'
    LoCDataList = ast.literal_eval(LoCData)
    numberBytes = []
    for number in LoCDataList:
        numberBytes.append(number.to_bytes(2, byteorder='big', signed=False))
    output = b''.join(numberBytes)
    return str(output)

def genSubjectBytesSize(subjectData):
    number = 2*len(ast.literal_eval(subjectData))
    if number == 0:
        return str(1)
    return str(number)

def genSubjectBytes(subjectData):
    if genSubjectBytesSize(subjectData) == str(1):
        return 'xNone'
    subjectDataList = ast.literal_eval(subjectData)
    numberBytes = []
    for number in subjectDataList:
        numberBytes.append(number.to_bytes(2, byteorder='big', signed=False))
    output = b''.join(numberBytes)
    return str(output)

def genAuthorIDsBytesSize(authorIDsData):
    number = 2*len(ast.literal_eval(authorIDsData))
    if number == 0:
        return str(1)
    return str(number)

def genAuthorIDsBytes(authorIDsData):
    if genAuthorIDsBytesSize(authorIDsData) == str(1):
        return 'xNone'
    authorIDsDataList = ast.literal_eval(authorIDsData)
    numberBytes = []
    for number in authorIDsDataList.keys():
        numberBytes.append(number.to_bytes(2, byteorder='big', signed=False))
    output = b''.join(numberBytes)
    return str(output)

def genAuthorsRolesBytesSize(authorRolesData):
    number = len(ast.literal_eval(authorRolesData))
    if number == 0:
        return str(1)
    return str(number)

def genAuthorsRolesBytes(authorRolesData):
    authorRolesDataList = ast.literal_eval(authorRolesData)
    if len(authorRolesDataList) == 0:
        return 'xNone'
    numberBytes = []
    for number in authorRolesDataList.values():
        numberBytes.append(number.to_bytes(1, byteorder='big', signed=False))
    output = b''.join(numberBytes)
    return str(output)
