#this file is used to split zip files into 8kb chunks.



##############################################################################

import os, math, pathlib
from fnmatch import fnmatch

def splitZipFiles(defaultDirectory='/Users/us.tropers/Desktop/gutenbergNoSubs/'):
    for path, subdirs, files in os.walk(defaultDirectory):
        for name in files:
            if fnmatch(name, '*.zip'):
                splitZipFile(name, path)



def splitZipFile(fileName, filePath):
    zipBytes = None
    with open(filePath + fileName, 'rb') as readFile:
        zipBytes = readFile.read()

    numberOfSplits = int(len(zipBytes)/4096)
    if len(zipBytes) % 4096 != 0:
        numberOfSplits += 1
    
    pathlib.Path(filePath + '/' + fileName[:-4]).mkdir(parents=True, exist_ok=True)

    for i in range(numberOfSplits):
        with open(filePath + fileName[:-4] + '/zipBytes' + str(i) + '.zb', 'wb') as writeFile:
            if i == numberOfSplits-1:
                writeFile.write(zipBytes[i*4096:])
            else:
                writeFile.write(zipBytes[i*4096:(i+1)*4096])
