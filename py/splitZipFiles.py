his file is used to split zip files into 8kb chunks.



##############################################################################

import os, math, pathlib
from fnmatch import fnmatch

def splitZipFiles(defaultDirectory='C:/gutenbergNoSubs/'):
    for path, subdirs, files in os.walk(defaultDirectory):
        for name in files:
            if fnmatch(name, '*.zip'):
                print(name)
                splitZipFile(name, path)



def splitZipFile(fileName, filePath):
    zipBytes = None
    with open(filePath + fileName, 'rb') as readFile:
        zipBytes = readFile.read()

    numberOfSplits = int(len(zipBytes)/8192)
    if len(zipBytes) % 8192 != 0:
        numberOfSplits += 1
    
    pathlib.Path(filePath + '/' + fileName[:-4]).mkdir(parents=True, exist_ok=True)

    for i in range(numberOfSplits):
        with open(filePath + fileName[:-4] + '/zipBytes' + str(i), 'wb') as writeFile:
            if i == numberOfSplits-1:
                writeFile.write(zipBytes[i*8192:])
            else:
                writeFile.write(zipBytes[i*8192:(i+1)*8192])
