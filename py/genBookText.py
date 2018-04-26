#This is used to generate contracts for the zip files for books. This allows
#the use of variable sized byte arrays to store data based upon the size of
#the input in order to effectively use storage space.

#Version: pre-alpha 1.0

#Author: Samuel Troper

################################################################################

import os, shutil
from fnmatch import fnmatch

def walkZipsAndGenerateVyper(pullDirectory='/Users/us.tropers/Desktop/gutenbergNoSubs2/', writeDirectory='/Users/us.tropers/Desktop/gutenbergNoSubs2/'):
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

    if len(zipBytes) <= 8192:
        vyperFileString += '''
zipBytes0: public(bytes[''' + str(len(zipBytes)) + '''])

@public
def __init__(_listingAddress: address):
    self.listingAddress = _listingAddress
    self.zipBytes0 = ''' + str(zipBytes)[1:]

    else:
        vyperFileString += '''
modifierAddress: public(address)'''
        count = 0

        for i in range(int(len(zipBytes)/8192)):
            vyperFileString += ('''
zipBytes''' + str(count) + ''': public(bytes[8192])''')
            count += 1

        if len(zipBytes) % 8192 != 0:
            vyperFileString += '''
zipBytes''' + str(count) + ''': public(bytes[''' + str(len(zipBytes) % 8192) + '''])'''

        vyperFileString += '''
@public
def __init__(_listingAddress: address, _modifierAddress: address):
    self.listingAddress = _listingAddress
    self.modifierAddress = _modifierAddress
    self.zipBytes0 = ''' + str(zipBytes[0:8192])[1:]

        for i in range(count):
            if i is not 0:
                vyperFileString += '''
@public
def setText''' + str(i) + '''(newText: bytes[8192]):
    assert msg.sender == self.modifierAddress
    self.zipBytes''' + str(i) + ''' = newText'''

        if len(zipBytes) % 8192 != 0:
            vyperFileString += '''
@public
def setText''' + str(count) + '''(newText: bytes[''' + str(len(zipBytes) % 8192) + ''']):
    assert msg.sender == self.modifierAddress
    self.zipBytes''' + str(count) + ''' = newText'''
    
    with open(directory + '/' + fileName[:-4] + '/' + fileName[:-4] + '.v.py', 'w') as writeFile:
        writeFile.write(vyperFileString)
    shutil.move(directory + '/' + fileName, directory + '/' + fileName[:-4] + '/' + fileName)

