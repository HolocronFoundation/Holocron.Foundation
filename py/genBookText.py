#This is used to generate contracts for the zip files for books. This allows
#the use of variable sized byte arrays to store data based upon the size of
#the input in order to effectively use storage space.

#Version: pre-alpha 1.0

#Author: Samuel Troper

################################################################################

import os, shutil
from fnmatch import fnmatch

def walkZipsAndGenerateVyper(pullDirectory='/Users/us.tropers/Desktop/gutenbergNoSubs', writeDirectory='/Users/us.tropers/Desktop/gutenbergNoSubs'):
    for path, subdirs, files in os.walk(pullDirectory):
        for name in files:
            if fnmatch(name, '*.zip'):
                generateVyperFile(name, path, writeDirectory)

def generateVyperFile(fileName, filePath, directory):
    zipBytes = None
    with open(os.path.join(filePath, fileName), 'rb') as readFile:
        zipBytes = readFile.read()

    #Generate the vyper file:
    vyperFileString = '''
listingAddress: public(address)'''

    if len(zipBytes) <= 4096:
        vyperFileString += '''
zipBytesFinal: public(bytes[''' + str(len(zipBytes)) + '''])

@public
def __init__(_listingAddress: address):
    self.listingAddress = _listingAddress
    self.zipBytesFinal = ''' + str(zipBytes)[1:]

    else:
        vyperFileString += '''
modifierAddress: public(address)
zipBytes: public(bytes[4096][''' + str(int(len(zipBytes)/4096)) + '''])'''

        if len(zipBytes) % 4096 != 0:
            vyperFileString += '''
zipBytesFinal: public(bytes[''' + str(len(zipBytes) % 4096) + '''])'''

        vyperFileString += '''
@public
def __init__(_listingAddress: address, _modifierAddress: address):
    self.listingAddress = _listingAddress
    self.modifierAddress = _modifierAddress
    self.zipBytesFinal = ''' + str(zipBytes[-(len(zipBytes) % 4096):])[1:]

        vyperFileString += '''

@public
def setZipBytes(_index: int128, newZip: bytes[4096]):
    assert msg.sender == self.modifierAddress
    self.zipBytes[_index] = newZip'''

    
    with open(directory + '/' + fileName[:-4] + '/' + fileName[:-4] + '.v.py', 'w') as writeFile:
        writeFile.write(vyperFileString)
    shutil.move(directory + '/' + fileName, directory + '/' + fileName[:-4] + '/' + fileName)
    os.remove(directory + '/' + fileName[:-4] + '.txt')

