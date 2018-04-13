#This is used to generate contracts for the zip files for books. This allows
#the use of variable sized byte arrays to store data based upon the size of
#the input in order to effectively use storage space.

#Version: pre-alpha 1.0

#Author: Samuel Troper

################################################################################

import os
from fnmatch import fnmatch

def walkZipsAndGenerateVyper(pullDirectory='C:/gutenbergnosubs/', writeDirectory='C:/vyperTextFiles/'):
    for path, subdirs, files in os.walk(pullDirectory):
        for name in files:
            if fnmatch(name, '*.zip'):
                generateVyperFile(name, path, writeDirectory)

def generateVyperFile(fileName, filePath, directory):
    zipBytes = None
    with open(os.path.join(filePath, fileName), 'rb') as readFile:
        zipBits = readFile.read()

    #Generate the vyper file:
    vyperFileString = '''
listingAddress: public(address)'''

    count = 0

    for i in range(int(len(zipBits)/255)):
        vyperFileString += ('''
zipBytes''' + str(count) + ''': public(bytes[255])''')
        count += 1

    if len(zipBits) % 255 != 0:
        vyperFileString += ('''
zipBytes''' + str(count) + ''': public(bytes[''' + (len(zipBits) % 255) + '''])''')

    vyperFileString += '''
@public
def __init__(_listingAddress: address):
    self.listingAddress = _listingAddress'''

    for i in range(count-1):
        vyperFileString += '''
    self.zipBytes''' + str(i) + ''' = ''' + str(zipBits[i*255:(i+1)*255])[1:]

    vyperFileString += '''
    self.zipBytes''' + str(count) + ''' = ''' + str(zipBits[count*255:])[1:]
    
    with open(directory + fileName[:-4] + '.v.py', 'w', encoding = 'utf-8') as writeFile:
        writeFile.write(vyperFileString)
