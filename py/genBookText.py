#This is used to generate contracts for the zip files for books. This allows
#the use of variable sized byte arrays to store data based upon the size of
#the input in order to effectively use storage space.

#Version: pre-alpha 1.0

#Author: Samuel Troper

################################################################################

import os
from fnmatch import fnmatch

def walkZipsAndGenerateVyper(directory='C:/gutenbergnosubs/'):
    for path, subdirs, files in os.walk(directory):
        for name in files:
            if fnmatch(name, '*.zip'):
                generateVyperFile(name, path)

def generateVyperFile(fileName, filePath)
    zipBytes = None
    with open(os.path.join(filePath, fileName), 'rb') as readFile:
        zipBits = readFile.read()
        zipBytes = int(zipBits, 2).to_bytes((len(zipBits) + 7) // 8, byteorder='big', signed=False)

    #Generate the vyper file:
    vyperFileString = '''
listingAddress: public(address)
zipBytes: public(bytes <= ''' + str(len(zipBytes)) + ''')

@public
def __init__():
    self.listingAddress = None
    self.zipBytes = ''' + str(zipBytes)

    with open('vyperBookZipFiles/' + fileName[:-4], 'w', encoding = 'utf-8') as writeFile:
        writeFile.write(vyperFileString)
