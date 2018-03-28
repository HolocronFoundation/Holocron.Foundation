#This is used to generate expansion book contracts.

################################################################################
import csv, ast

#Imports the database as a CSV.
def importDBCSV(defaultFile='finalBooksHopefully.csv', idStart=0, idEnd=56709):
    arrayOutput = []
    with open(defaultFile, 'r', encoding='utf-8') as readFile:
        reader = csv.reader(readFile, delimiter='|')
        for row in reader:
            arrayOutput.append(row)
    return arrayOutput

def outputExpansionList():
    collection = importDBCSV()
    usesExpansionList = []
    first = True
    for row in collection:
        if not first:
            usesExpansionList.append(genFile(row))
        else:
            first = False
    with open('expansionList.csv', 'w') as writeFile:
        writer = csv.writer(writeFile, delimiter = '|')
        for row in usesExpansionList:
            writer.writerow(row)

def outputExpansionVyper():
    collection = importDBCSV()
    usesExpansionList = []
    first = True
    for row in collection:
        if not first:
            generated = genFile(row)
            if generated[1] == True:
                genvyper(row, generated)
        else:
            first = False

def genvyper(entry, inputArray):
    

def genFile(inputArray):
    bookID = inputArray[0]

    titleExpansion=False
    title = inputArray[1]
    titleBytes = title.encode('utf-8')
    if len(titleBytes) > 64:
        titleExpansion=True

    authorsExpansion = False
    authors = ast.literal_eval(inputArray[2])
    if len(authors) > 1:
        authorsExpansion = True

    subjectsExpansion = False
    subjects = ast.literal_eval(inputArray[5])
    if len(subjects) > 2:
        subjectsExpansion = True

    libraryOfCongressExpansion = False
    libraryOfCongress = ast.literal_eval(inputArray[6])
    if len(libraryOfCongress) > 1:
        libraryOfCongressExpansion = True

    if titleExpansion or authorsExpansion or subjectsExpansion or libraryOfCongressExpansion:
        return [bookID, True, titleExpansion, authorsExpansion, subjectsExpansion, libraryOfCongressExpansion]
    return [bookID, False, False, False, False, False]
    

    
