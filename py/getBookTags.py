#Template for Book Info Storage

#Currently, public domain books are sourced from Project Gutenberg.
#This is done by checking for Copyright first, and deleting any Copyrighted works.
#Next, an initialization contract is created. This is funded via the Holocron.Foundation.
#The initialization contract initially contains basic tags for a work.
#A list of tags follows, as well as the format used by Project Gutenberg:

import rdflib
import csv
from operator import itemgetter

keepFields=["http://www.gutenberg.org/2009/pgterms/alias", #Alias
            "http://www.gutenberg.org/2009/pgterms/deathdate", #Author Death
            "http://www.gutenberg.org/2009/pgterms/name", #Author Name
            "http://www.gutenberg.org/2009/pgterms/birthdate"] #Author Birthdate

def prepWork(bookID, defaultRDFDirectory = 'C:/Users/Sam Troper/Desktop/Holocron/test/cache/epub'):
        fields = {'title': None, 'author(s)': [], 'copyright': None, 'language': None, 'subject(s)': [], 'LoC':[]}
        #Generate filename here
        #Generate rdf filename here, named RDFPath
        RDFPath = defaultRDFDirectory + '/' + str(bookID) + '/pg' + str(bookID) + '.rdf'
        authorsInfo = []
        g = rdflib.Graph()
        g.parse(RDFPath)
        for S, O, P in g:
            #print(S, ' ', O, ' ', P)
            #print()
            
            #Preps Author(s)
            if str(O) in keepFields:
                authorsInfo.append((S, O, P))
                
            #Title
            elif str(O) == "http://purl.org/dc/terms/title":
                fields['title'] = str(P)

            #Copyright
            elif str(O) == "http://purl.org/dc/terms/rights":
                fields['copyright']=str(P)

            #Language
            elif str(O) == "http://purl.org/dc/terms/language":
                for S1, O1, P1 in g:
                    if str(P) == str(S1):
                        fields['language'] = str(P1)

            #Subjects
            elif str(O) == "http://purl.org/dc/terms/subject":
                appended = False
                for S1, O1, P1 in g:
                    if (str(P) == str(S1)) and (str(O1) == "http://www.w3.org/1999/02/22-rdf-syntax-ns#value"):
                        for S2, O2, P2 in g:
                            if (str(P) == str(S2)) and (str(P2) == "http://purl.org/dc/terms/LCC"):
                                fields['LoC'].append(str(P1))
                                appended = True

                        if not appended:
                            fields['subject(s)'].append(str(P1))
        #Author(s)
        authorIDs = []
        for entry in authorsInfo:
            if str(entry[0]) not in authorIDs:
                authorIDs.append(str(entry[0]))
        #Debug
        #print(authorIDs)
        for authorID in authorIDs:
            author = {'name': None, 'alias(es)': [], 'birthdate': None, 'deathdate': None, 'role': None}
            for S, O, P in g:
                if authorID == str(P):
                    if str(O) == 'http://id.loc.gov/vocabulary/relators/ill':
                        author['role'] = 'ill'
                    elif str(O) == 'http://id.loc.gov/vocabulary/relators/trl':
                        author['role'] = 'trl'
                    elif str(O) == 'http://id.loc.gov/vocabulary/relators/edt':
                        author['role'] = 'edt'
            for entry in authorsInfo:
                if authorID == str(entry[0]):
                    if str(entry[1]) == "http://www.gutenberg.org/2009/pgterms/name":
                        author['name'] = str(entry[2])
                    elif str(entry[1]) == "http://www.gutenberg.org/2009/pgterms/birthdate":
                        author['birthdate'] = int(entry[2])
                    elif str(entry[1]) == "http://www.gutenberg.org/2009/pgterms/deathdate":
                        author['deathdate'] = int(entry[2])
                    else:
                        author['alias(es)'].append(str(entry[2]))
                        author['alias(es)'].sort()
            fields['author(s)'].append(author)
        return fields

def genCSV(skip=[1691, 36169, 56683], books=56710, start=0):
        #list of authors
        authors = []
        #list of authors with IDs
        authorsWithID = []
        #start iterating authorID
        authorID = 0

        first = True
        writer = None
        
        #looping through books
        with open('bookCSV.csv', 'w', encoding='utf-8') as file:
                for x in range(start, books):
                        #skipping missing entries
                        if x not in skip:
                                #gets current entry info
                                current = prepWork(x)
                                #generates an output dictionary
                                output = {}
                                output['id'] = x
                                output['title'] = current['title']
                                output['authors'] = {}
                                for author in current['author(s)']:
                                        currentRole = author.pop('role')
                                        if author not in authors:
                                                authors.append(author.copy())
                                                author['id'] = authorID
                                                output['authors'][authorID] = currentRole
                                                authorID += 1
                                                authorsWithID.append(author)
                                        else:
                                                for person in authorsWithID:
                                                        if person['name'] == author['name'] and person['birthdate'] == author['birthdate'] and person['deathdate'] == author['deathdate'] and person['alias(es)'] == author['alias(es)']:
                                                                output['authors'][person['id']] = currentRole
                                output['copyright'] = current['copyright']
                                output['language'] = current['language']
                                output['subjects'] = current['subject(s)']
                                output['libraryOfCongress'] = current['LoC']
                                if first:
                                        first = False
                                        writer = csv.DictWriter(file, output.keys())
                                        writer.writeheader()
                                writer.writerow(output)
                                print(output)
        first = True
        writer = None
        
        with open('authorCSV.csv', 'w', encoding='utf-8') as file:
                writer = csv.DictWriter(file, authorsWithID[0].keys()) 
                writer.writeheader()
                writer.writerows(authorsWithID)
                        
        print(len(authorsWithID))
        print(len(authors))
        

def test(skip=[1691, 36169, 56683], books=56710, start=0):
        largestTitleLength = 0
        longestTitle = ''
        largestSubjectsLength = 0
        largestLoC = 0
        longestSubjects = []
        largestLoCs = []
        authors = []
        for x in range(start, books):
                if x not in skip:
                        current = prepWork(x)
                        print(x)
                        print(current)
                        if current['title'] != None and len(current['title']) > largestTitleLength:
                                largestTitleLength = len(current['title'])
                                longestTitle = current['title']
                        if current['subject(s)'] != None:
                                subjectLength = 0
                                currentSub = []
                                for subject in current['subject(s)']:
                                        subjectLength += len(subject)
                                        currentSub.append(subject)
                                if subjectLength > largestSubjectsLength:
                                        largestSubjectsLength = subjectLength
                                        longestSubjects = currentSub
                        if current['LoC'] != None:
                                LoCLength = 0
                                currentLoC = []
                                for LoC in current['LoC']:
                                        LoCLength += len(LoC)
                                        currentLoC.append(LoC)
                                if LoCLength > largestLoC:
                                        largestLoC = LoCLength
                                        largestLoCs = currentLoC
                        for author in current['author(s)']:
                                if author not in authors:
                                        authors.append(author)
        print('Title: ', largestTitleLength, ' Subjects: ', largestSubjectsLength, ' LoC: ', largestLoC)
        print('Title: ', longestTitle)
        print('Subjects: ', longestSubjects)
        print('LoC: ', largestLoCs)
        print('Authors: ', len(authors))
        #Longest title: 620
        #Subs: 779
        #LoC: 15
        #Authors:  75702
        #No Duplicates:  27401

def checkCopyright(skip=[1691, 36169, 56683], books=56710, start=0, listWorks=True):
        #standard copyright notice: Copyrighted. Read the copyright notice inside this book for details.
        for x in range(start, books):
                if x not in skip:
                        prep = prepWork(x)
                        if prep['copyright'].lower() != "Public domain in the USA.".lower():
                                if listWorks or prep['copyright'].lower() != "Copyrighted. Read the copyright notice inside this book for details.".lower():
                                        print(x)
                                        print(prep)
                                        print()
