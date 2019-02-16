#This is used to generate book contracts. This uses less space than simply
#creating expansion contracts with default storage sizes.

#Version pre-alpha 1.0

#Note: roles are 0 - author, 1 - translator, 2 - editor, 3 - illustrator

################################################################################

import csv, ast, math, os

#Imports the database as a CSV.
def importDBCSV(defaultFile='CSV Authors.csv'):
    arrayOutput = []
    with open(defaultFile, 'r', encoding='utf-8-sig') as readFile:
        reader = csv.reader(readFile, delimiter='|')
        for row in reader:
            arrayOutput.append(row)
    return arrayOutput

def outputVyperFile():
    dataTypes = ['bytesDynamic', 'arrStrDynamic', 'bytesDynamic', 'bytesDynamic', 'int128']
    collection = importDBCSV()
    first = True
    header = collection[0]
    i = 0
    for row in collection:
        if not first:
            i += 1
            folderNum = math.floor(i/100)
            if not os.path.exists('/Users/us.tropers/Desktop/Formatted for Upload/Authors/' + str(folderNum)):
                os.makedirs('/Users/us.tropers/Desktop/Formatted for Upload/Authors/' + str(folderNum))
            genVyperFile(row, '/Users/us.tropers/Desktop/Formatted for Upload/Authors/' + str(folderNum) + '/authorContract' + str(row[4]) + '.v.py', header, dataTypes, 'author')
        else:
            first = False

def parseTypeSize(dataType, data):
    if(dataType == 'arrStrDynamic'):
        dataArr = ast.literal_eval(data)
        if len(dataArr) == 0:
            return 'bytes[1]'
        else:
            bytesNeeded = 0
            for entry in dataArr:
                bytesNeeded += len(entry.encode('utf-8')) + 2
            bytesNeeded += len(dataArr) - 1
            return 'bytes[' + str(bytesNeeded) + ']'
    elif(dataType == 'bytesDynamic'):
        if len(data) == 0:
            return 'bytes[1]'
        else:
            return 'bytes[' + str(len(data.encode('utf-8'))) + ']'
    elif(dataType == 'int128'):
        return 'int128'

def generateStorage(dataType, data):
    if(dataType == 'bytesDynamic'):
        if len(data) == 0:
            return 'None'
        else:
            return str(data.encode('utf-8'))[1:]
    elif(dataType == 'arrStrDynamic'):
        dataArr = ast.literal_eval(data)
        if len(dataArr) == 0:
            return 'None'
        else:
            result = '"['
            first = True
            for entry in dataArr:
                if first:
                    first = False
                else:
                    result += '|'
                result += str(entry.encode('utf-8'))[2:-1]
                #need to catch quotes within entries too
            return result+']"'
    elif(dataType == 'int128'):
        return data

def genVyperFile(dataRow, writeFile, headers, dataType, dataIdentifier):
    vyperFileString = '''
@private
class SendDonation():
    @payable
    @public
    def donateWithDifferentDonor(id: int128, foundationSplitNumerator: int128, foundationSplitDenominator: int128, donorAddress: address): pass

version: public(bool)
parentAddress: public(address)
expansionAddress: public(address)
usesExpansion: public(bool)

''' + dataIdentifier + ''': public({

    '''

    for i in range(len(headers)):
        vyperFileString += headers[i] + ''': ''' + parseTypeSize(dataType[i], dataRow[i])
        if i != len(headers) - 1:
            vyperFileString += ''','''
        vyperFileString +='''

    '''

    vyperFileString += '''

})

@public
def __init__(_parentAddress: address):

    self.version = True

    self.parentAddress = _parentAddress

    self.expansionAddress = None

    self.usesExpansion = False

    '''

    for i in range(len(headers)):
        vyperFileString += '''self.''' + dataIdentifier + '''.''' + headers[i] + ''' = ''' + generateStorage(dataType[i], dataRow[i]) + '''

    '''

    vyperFileString += '''

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
