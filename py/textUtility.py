import os
from shutil import copy2
from fnmatch import fnmatch

def selectTexts(directory='C:/gutenberg/'):
    fileDict = {}
    nameList = []
    for path, subdirs, files in os.walk(directory):
        for name in files:
            if fnmatch(name, '*.txt'):
                #Easy exception: if filename contains non-numerical characters
                #                besides -, then skip.
                stripName = name.replace('.txt', '').replace('-', '')
                if stripName.isdigit() and 'old' not in os.path.join(path, name):
                    fileDict[name] = os.path.join(path, name)
                    nameList.append(name)
                    print(fileDict[name])

    #Removes multiple copies of the same text. Keeps the simplest format.
    nameList.sort()
    finalList = []
    for name in nameList:
        #Adds ASCII
        if '-' not in name:
            finalList.append(name)
        #Checks if ASCII will be added
        elif (name.replace('-8', '') not in nameList) or (name.replace('-0', '') not in nameList):
            #If UTF-8, then add
            if '-0' in name:
                finalList.append(name)
            #If Latin-1, and UTF-8 will NOT be added, add Latin-1
            elif name.replace('-8', '-0') not in nameList:
                finalList.append(name)
    fileList = []
    for name in finalList:
        fileList.append(fileDict[name])
    return fileList
            
                    

def moveTexts(directory='C:/gutenberg/', newDirectory='C:/gutenbergNoSubs/'):
    for file in selectTexts(directory):
        copy2(file, newDirectory)

#Future to do:
        #Add Big-5 support. Should be simple, similar to UTF and Latin... No books are in that format anyway yet...
