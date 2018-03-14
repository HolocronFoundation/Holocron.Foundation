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
        elif (name.replace('-8', '') not in nameList) or (name.replace('-0', '') not in nameList) or (name.replace('-5', '') not in nameList):
            #If UTF-8, then add
            if '-0' in name:
                finalList.append(name)
            #If Latin-1, and UTF-8 will NOT be added, add Latin-1
            elif name.replace('-8', '-0') not in nameList:
                finalList.append(name)
            #If Big 5, and UTF-8 and Latin-1 will NOT be added, add Big-5
            elif (name.replace('-5', '-0') not in nameList) and (name.replace('-5', '-8') not in nameList):
                finalList.append(name)
    fileList = []
    for name in finalList:
        fileList.append(fileDict[name])
    return fileList
            
                    

def moveTexts(directory='C:/gutenberg/', newDirectory='C:/gutenbergNoSubs/'):
    for file in selectTexts(directory):
        copy2(file, newDirectory)

def stripper(directory='C:/gutenbergNoSubs/', rename=True):
    for path, subdirs, files in os.walk(directory):
        for name in files:
            # Read in the file
            try:
                with open(os.path.join(path, name), 'r') as file:
                    fileData = file.read()
            except UnicodeDecodeError:
                try:
                    with open(os.path.join(path, name), 'r', encoding="utf8") as file:
                        fileData = file.read()
                except UnicodeDecodeError:
                    with open(os.path.join(path, name), 'r', encoding="latin1") as file:
                        fileData = file.read()

            #Finding Start of Actual File
            headerType = ''
            endOfStart = fileData.find('*** START OF THIS PROJECT GUTENBERG')
            if endOfStart != -1:
                endOfStart += len('*** START OF THIS PROJECT GUTENBERG')
                headerType='noh1'
                endOfStart = fileData.index('***', endOfStart) + 3
            elif fileData.find('*** START OF THE PROJECT GUTENBERG') != -1:
                endOfStart = fileData.find('*** START OF THE PROJECT GUTENBERG') + len('*** START OF THE PROJECT GUTENBERG')
                headerType = 'noh2'
                endOfStart = fileData.index('***', endOfStart) + 3
            else:
                endOfStart = 0
                print(os.path.join(path, name))

            #Finding End of Actual File
            footerType=''
            startOfEnd = fileData.find('End of Project Gutenberg\'s')
            if startOfEnd != -1:
                footerType='nof1'
            elif fileData.find('End of the Project Gutenberg') != -1:
                startOfEnd = fileData.find('End of the Project Gutenberg')
                footerType='nof2'
            elif fileData.find('*** END OF THIS PROJECT GUTENBERG') != -1:
                startOfEnd = fileData.find('*** END OF THIS PROJECT GUTENBERG')
                footerType='nof3'
            elif fileData.find('*** END OF THE PROJECT GUTENBERG') != -1:
                startOfEnd = fileData.find('*** END OF THE PROJECT GUTENBERG')
                footerType='nof4'
            else:
                startOfEnd = len(fileData)
                print(os.path.join(path, name))

            # Replace the target string
            fileData = fileData[endOfStart:startOfEnd].strip()

            # Write the file out again
            if(rename):
                try:
                    with open(os.path.join(path, name.strip('.txt') + headerType + footerType + '.txt'), 'w') as file:
                        file.write(fileData)
                except UnicodeEncodeError:
                    try:
                        with open(os.path.join(path, name.strip('.txt') + headerType + footerType + '.txt'), 'w', encoding="utf8") as file:
                            file.write(fileData)
                    except UnicodeEncodeError:
                        with open(os.path.join(path, name.strip('.txt') + headerType + footerType + '.txt'), 'w', encoding="latin1") as file:
                            file.write(fileData)
            else:
                with open(os.path.join(path, name), 'w') as file:
                    file.write(fileData)
            os.remove(os.path.join(path, name))


def moveAndStrip():
    moveTexts()
    print('Now stripping')
    stripper()

#def stripFooter(directory='C:/gutenbergNoSubs/', rename=True):

#Misc note:
#Yes, this could be more optimized... Whatever, trynna get this done and speed doesn't matter for this utility.
