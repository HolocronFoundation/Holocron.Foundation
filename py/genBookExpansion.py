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
                genvyper(generated, row)
        else:
            first = False

def genvyper(entry, inputArray):
    overallFirst = True
    vyperFile = '''
@private
class SendDonation():
    @payable
    @public
    def donateWithDifferentDonor(id: int128, donorAddress: address): pass

parentAddress: public(address)
foundationAddresses: public(address)[3]
expansionAddress: public(address)

bookID: int128
bookExpansion: public({'''
    if entry[2]: #titleExpansion
        overallFirst = False
        titleBytes = len(inputArray[1].encode('utf-8'))
        additionalBytes = titleBytes - 64
        vyperFile.append('''
titleExpansion: bytes <= ''' + str(additionalBytes) + ' = ' + str(inputArray[1].encode('utf-8')[64,]))
    if entry[3]: #authorsExpansion
        if not overallFirst:
            vyperFile.append(',')
        else:
            overallFirst = False
        authors = ast.literal_eval(inputArray[2])[1:]
        first = True
        vyperFile.append('''
authorsExpansionID: bytes <= 2[''' + str(len(authors)) + '] = [')
        for key in list(authors.keys()):
            if not first:
                vyperFile.append(', '+ str(key))
            else:
                vyperFile.append(str(key))
                first = False
        vyperFile.append('],')
        vyperFile.append('''
authorsExpansionRole: bytes <= 1[''' + str(len(authors)) + '] = ')
        for key in list(authors.keys()):
            vyperFile.append(str(authors[key]))
    if entry[4]: #subjectsExpansion
        if not overallFirst:
            vyperFile.append(',')
        else:
            overallFirst = False
        subjects = ast.literal_eval(inputArray[5])[2:]
        vyperFile.append('''
subjectExpansion: bytes <= 2[''' + str(len(subjects)) + '] = ')
        for subject in subjects:
            vyperFile.append(str(subject))
    if entry[5]: #libraryOfCongressExpansion
        if not overallFirst:
            vyperFile.append(',')
        else:
            overallFirst = False
        libraryOfCongressExpansion = ast.literal_eval(inputArray[6])[1:]
        first = True
        vyperFile.append('''
libraryOfCongressExpansion: bytes <= 2[''' + str(len(libraryOfCongressExpansion)) + '] = [')
        for LoC in libraryOfCongressExpansion:
            if not first:
                vyperFile.append(', ' + str(LoC))
            else:
                vyperFile.append(str(LoC))
                first = False
        vyperFile.append(']')
    vyperFile.append('''
})

@payable
@public
def donate():
    SendDonation(self.parentAddress).donateWithDifferentDonor(self.bookID, msg.sender)
    

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
    

    
