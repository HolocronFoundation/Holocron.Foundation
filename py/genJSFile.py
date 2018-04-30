#This is used to generate contracts for the zip files for books. This allows
#the use of variable sized byte arrays to store data based upon the size of
#the input in order to effectively use storage space.

#Version: pre-alpha 1.0

#Author: Samuel Troper

################################################################################

import os, shutil, pathlib
from fnmatch import fnmatch

def start(fileName):
    splitFile(fileName)
    generateVyperFile(fileName)

def generateVyperFile(fileName):
    JSbytes = None
    with open(fileName, 'rb') as readFile:
        JSbytes = readFile.read()

    #Generate the vyper file:
    vyperFileString = ''

    if len(JSbytes) <= 4096:
        vyperFileString += '''
jsBytesFinal: public(bytes[''' + str(len(JSbytes)) + '''])
numFiles: public(int128)

@public
def __init__():
    self.numFiles = 1
    self.jsBytesFinal = ''' + str(JSbytes)[1:] + '''

@public
@constant
def getScript() -> bytes:
    return self.jsBytesFinalbytes[''' + str(len(JSbytes)) + ''']'''

    else:
        vyperFileString += '''
modifierAddress: public(address)
jsBytes: public(bytes[4096][''' + str(int(len(JSbytes)/4096)) + '''])
numFiles: public(int128)'''

        if len(JSbytes) % 4096 != 0:
            vyperFileString += '''
jsBytesFinal: public(bytes[''' + str(len(JSbytes) % 4096) + '''])'''

        vyperFileString += '''
@public
def __init__(_modifierAddress: address):
    self.numFiles = ''' + str(int(len(JSbytes)/4096)+1) + '''
    self.modifierAddress = _modifierAddress
    self.jsBytesFinal = ''' + str(JSbytes[-(len(JSbytes) % 4096):])[1:]

        vyperFileString += '''

@public
def setjsBytes(_index: int128, newZip: bytes[4096]):
    assert msg.sender == self.modifierAddress
    self.jsBytes[_index] = newZip
'''

    
    with open('/Users/us.tropers/Documents/GitHub/Library/py/main/' + fileName[:-3] + '.v.py', 'w') as writeFile:
        writeFile.write(vyperFileString)

def splitFile(fileName):
    JSbytes = None
    with open(fileName, 'rb') as readFile:
        JSbytes = readFile.read()

    numberOfSplits = int(len(JSbytes)/4096)
    if len(JSbytes) % 4096 != 0:
        numberOfSplits += 1

    for i in range(numberOfSplits):
        numString = str(i)
        while len(numString) < 6:
            numString = '0' + numString
        with open('/Users/us.tropers/Documents/GitHub/Library/py/main/JSbytes' + numString + '.jsb', 'wb') as writeFile:
            if i == numberOfSplits-1:
                writeFile.write(JSbytes[i*4096:])
            else:
                writeFile.write(JSbytes[i*4096:(i+1)*4096])
