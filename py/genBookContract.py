#This is used to generate book contracts. This uses less space than simply
#creating expansion contracts with default storage sizes.

#Version pre-alpha 1.0

#Note: roles are 0 - author, 1 - translator, 2 - editor, 3 - illustrator

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
        print(row[0])
        if not first and ast.literal_eval(row[3]) == 1:
            genVyperFile(row, 'vyperFilesGenerated/' + str(row[0]) + 'vyperOutput.v.py')
        else:
            first = False

def genVyperFile(dataRow, writeFile):
    vyperFileString = '''
@private
class SendDonation():
    @payable
    @public
    def donateWithDifferentDonor(id: int128, donorAddress: address): pass

version: public(bool)
parentAddress: public(address)
expansionAddress: public(address)
usesExpansion: public(bool)

book: public({

    id: int128,

    title: bytes <= ''' + genTitleBytesSize(dataRow[1]) + ''',

    copyright: bool,

    language: bytes <= 2,

    libraryOfCongress: bytes <= ''' + genLibraryOfCongressBytesSize(dataRow[6]) + ''',

    subjects: bytes <= ''' + genSubjectBytesSize(dataRow[5]) + ''',

    authorIDs: bytes <= ''' + genAuthorIDsBytesSize(dataRow[2]) + ''',

    authorRoles: bytes <= ''' + genAuthorsRolesBytesSize(dataRow[2]) + ''',

    size: int128,

    donations: wei_value,

    textAddress: address,

    uploaded: bool

})

@public
def __init__():

    self.version = True

    self.parentAddress = None

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
    self.usesExpansion = True
'''
    
    with open(writeFile, 'w', encoding = 'utf-8') as writeFile:
        writeFile.write(vyperFileString)

def genTitleBytesSize(titleData):
    return str(len(titleData.encode('utf-8')))

def genTitleBytes(titleData):
    return str(titleData.encode('utf-8'))

def genLibraryOfCongressBytesSize(LoCData):
    return str(2*len(ast.literal_eval(LoCData)))

def genLibraryOfCongressBytes(LoCData):
    LoCDataList = ast.literal_eval(LoCData)
    numberBytes = []
    for number in LoCDataList:
        numberBytes.append(number.to_bytes(2, byteorder='little', signed=False))
    output = b''.join(numberBytes)
    return str(output)

def genSubjectBytesSize(subjectData):
    return str(2*len(ast.literal_eval(subjectData)))

def genSubjectBytes(subjectData):
    subjectDataList = ast.literal_eval(subjectData)
    numberBytes = []
    for number in subjectDataList:
        numberBytes.append(number.to_bytes(2, byteorder='little', signed=False))
    output = b''.join(numberBytes)
    return str(output)

def genAuthorIDsBytesSize(authorIDsData):
    return str(2*len(ast.literal_eval(authorIDsData)))

def genAuthorIDsBytes(authorIDsData):
    authorIDsDataList = ast.literal_eval(authorIDsData)
    numberBytes = []
    for number in authorIDsDataList.keys():
        numberBytes.append(number.to_bytes(2, byteorder='little', signed=False))
    output = b''.join(numberBytes)
    return str(output)

def genAuthorsRolesBytesSize(authorRolesData):
    return str(len(ast.literal_eval(authorRolesData)))

def genAuthorsRolesBytes(authorRolesData):
    authorRolesDataList = ast.literal_eval(authorRolesData)
    numberBytes = []
    for number in authorRolesDataList.values():
        numberBytes.append(number.to_bytes(1, byteorder='little', signed=False))
    output = b''.join(numberBytes)
    return str(output)
