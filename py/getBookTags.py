#Template for Book Info Storage

#Currently, public domain books are sourced from Project Gutenberg.
#This is done by checking for Copyright first, and deleting any Copyrighted works.
#Next, an initialization contract is created. This is funded via the Holocron.Foundation.
#The initialization contract initially contains basic tags for a work.
#A list of tags follows, as well as the format used by Project Gutenberg:

import rdflib
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
            fields['author(s)'].append(author)
        return fields

def test(skip=[1691], books=56690, start=0):
    for x in range(start, books):
        if x not in skip:
            print(x)
            print(prepWork(x))
