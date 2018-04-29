#This is used to generate contracts for the zip files for books. This allows
#the use of variable sized byte arrays to store data based upon the size of
#the input in order to effectively use storage space.

#Version: pre-alpha 1.0

#Author: Samuel Troper

################################################################################

import os, shutil
from fnmatch import fnmatch

def start(fileName):
    splitZipFile(fileName)
    generateVyperFile(fileName)

def generateVyperFile(fileName):
    zipBytes = None
    with open(fileName, 'rb') as readFile:
        zipBytes = readFile.read()

    #Generate the vyper file:
    vyperFileString = '''
listingAddress: public(address)'''

    if len(zipBytes) <= 4096:
        vyperFileString += '''
jsBytesFinal: public(bytes[''' + str(len(zipBytes)) + '''])

@public
def __init__(_listingAddress: address):
    self.listingAddress = _listingAddress
    self.zipBytesFinal = ''' + str(zipBytes)[1:]

    else:
        vyperFileString += '''
modifierAddress: public(address)
jsBytes: public(bytes[4096][''' + str(int(len(zipBytes)/4096)) + '''])'''

        if len(zipBytes) % 4096 != 0:
            vyperFileString += '''
jsBytesFinal: public(bytes[''' + str(len(zipBytes) % 4096) + '''])'''

        vyperFileString += '''
@public
def __init__(_listingAddress: address, _modifierAddress: address):
    self.listingAddress = _listingAddress
    self.modifierAddress = _modifierAddress
    self.jsBytesFinal = ''' + str(zipBytes[-(len(zipBytes) % 4096):])[1:]

        vyperFileString += '''

@public
def setZipBytes(_index: int128, newZip: bytes[4096]):
    assert msg.sender == self.modifierAddress
    self.jsBytes[_index] = newZip'''

    
    with open(directory + '/' + fileName[:-4] + '/' + fileName[:-4] + '.v.py', 'w') as writeFile:
        writeFile.write(vyperFileString)

def splitZipFile(fileName):
    zipBytes = None
    with open(fileName, 'rb') as readFile:
        zipBytes = readFile.read()

    numberOfSplits = int(len(zipBytes)/4096)
    if len(zipBytes) % 4096 != 0:
        numberOfSplits += 1
    
    pathlib.Path('/' + fileName[:-4]).mkdir(parents=True, exist_ok=True)

    for i in range(numberOfSplits):
        numString = str(i)
        while len(numString) < 6:
            numString = '0' + numString
        with open(fileName[:-4] + '/zipBytes' + numString + '.zb', 'wb') as writeFile:
            if i == numberOfSplits-1:
                writeFile.write(zipBytes[i*4096:])
            else:
                writeFile.write(zipBytes[i*4096:(i+1)*4096])
