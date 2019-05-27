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

skipFull = [40, 89, 116, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197,
            198, 199, 565, 576, 616, 622, 637, 672, 676, 757, 771, 772, 835, 900,
            928, 931, 933, 934, 1018, 1070, 1071, 1072, 1073, 1255, 1293, 1435,
            1464, 1647, 1648, 1691, 1766, 1767, 1789, 1914, 1964, 1984, 2001, 2061,
            2091, 2152, 2184, 2200, 2201, 2202, 2203, 2204, 2205, 2206, 2207,
            2208, 2209, 2210, 2211, 2212, 2213, 2214, 2215, 2216, 2217, 2218,
            2219, 2220, 2221, 2222, 2223, 2224, 2367, 2421, 2576, 2623, 2624,
            2625, 2626, 2720, 2733, 2738, 2820, 2869, 2877, 2879, 3018, 3057,
            3169, 3278, 3279, 3332, 3500, 3501, 3502, 3503, 3504, 3505, 3506,
            3507, 3508, 3509, 3510, 3511, 3513, 3514, 3515, 3516, 3517, 3518,
            3519, 3520, 3521, 3522, 3523, 3524, 3541, 3680, 3696, 4022, 4366,
            4387, 4570, 4741, 4769, 4949, 5613, 5739, 5740, 5884, 6532, 6533,
            6534, 6535, 6536, 6537, 6538, 6539, 6540, 6541, 6542, 6543, 6544,
            6545, 6546, 6547, 6548, 6550, 6551, 6552, 6553, 6554, 6555, 6556,
            6557, 6620, 6937, 6951, 7053, 7094, 7536, 7825, 7869, 7872, 7873,
            7874, 7999, 8204, 8205, 8227, 8608, 8609, 8610, 8611, 8612, 8613,
            8614, 8615, 8616, 8617, 8618, 8619, 8620, 8621, 8622, 8623, 8624,
            8625, 8626, 8627, 8628, 8629, 8630, 8631, 8632, 8633, 8634, 8635,
            8636, 8637, 8746, 8748, 8749, 8750, 8751, 8752, 8753, 8754, 8755,
            8756, 8757, 8758, 8759, 8760, 8761, 8762, 8763, 8764, 8765, 8766,
            8767, 8768, 8769, 8806, 8807, 8808, 8809, 8810, 8811, 8812, 8816,
            8817, 8818, 8958, 8959, 8960, 8962, 8963, 8965, 8966, 8967, 8968,
            8969, 8970, 8971, 8972, 8973, 8974, 8975, 8976, 8977, 8978, 8979,
            8980, 8981, 8982, 8983, 8984, 8985, 8986, 8987, 8988, 8989, 8990,
            8993, 9001, 9002, 9003, 9004, 9005, 9006, 9007, 9008, 9009, 9010,
            9011, 9012, 9013, 9014, 9015, 9016, 9017, 9018, 9019, 9020, 9021,
            9022, 9023, 9024, 9025, 9026, 9027, 9028, 9029, 9030, 9031, 9032,
            9033, 9034, 9035, 9036, 9037, 9038, 9039, 9040, 9041, 9042, 9113,
            9114, 9115, 9116, 9117, 9118, 9119, 9120, 9121, 9122, 9123, 9124,
            9125, 9126, 9127, 9128, 9129, 9130, 9131, 9132, 9133, 9134, 9135,
            9136, 9137, 9138, 9139, 9140, 9141, 9142, 9143, 9144, 9145, 9146,
            9147, 9268, 9269, 9270, 9271, 9272, 9273, 9274, 9275, 9276, 9277,
            9278, 9279, 9280, 9281, 9282, 9283, 9284, 9285, 9286, 9287, 9288,
            9289, 9290, 9291, 9292, 9293, 9336, 9337, 9338, 9339, 9340, 9341,
            9342, 9343, 9344, 9345, 9346, 9347, 9348, 9349, 9350, 9351, 9352,
            9353, 9354, 9355, 9356, 9357, 9358, 9359, 9360, 9361, 9416, 9417,
            9418, 9419, 9420, 9421, 9422, 9423, 9424, 9425, 9426, 9427, 9428,
            9429, 9430, 9431, 9432, 9433, 9434, 9435, 9436, 9437, 9438, 9451,
            9452, 9510, 9511, 9512, 9513, 9514, 9515, 9516, 9517, 9518, 9519,
            9520, 9521, 9522, 9523, 9524, 9525, 9526, 9527, 9528, 9529, 9530,
            9531, 9532, 9533, 9534, 9535, 9536, 9537, 9538, 9539, 9540, 9541,
            9551, 9552, 9553, 9554, 9555, 9556, 9557, 9558, 9671, 9672, 9673,
            9674, 9675, 9676, 9677, 9678, 9679, 9680, 9681, 9682, 9683, 9684,
            9685, 9686, 9687, 9688, 9689, 9690, 9691, 9692, 9693, 9694, 9695,
            9696, 9697, 9698, 9699, 9702, 9703, 9704, 9705, 9706, 9707, 9708,
            9709, 9710, 9711, 9712, 9713, 9714, 9715, 9716, 9717, 9718, 9719,
            9720, 9721, 9722, 9723, 9724, 9725, 9726, 9727, 9728, 9729, 9730,
            9731, 9732, 9733, 9734, 9735, 9736, 9737, 9738, 9739, 9740, 9741,
            9742, 9743, 9744, 9930, 9933, 9934, 9942, 10115, 10137, 10152,
            10153, 10154, 10155, 10156, 10157, 10158, 10167, 10168, 10169,
            10170, 10171, 10172, 10173, 10174, 10175, 10176, 10177, 10178,
            10179, 10180, 10181, 10182, 10183, 10184, 10185, 10186, 10187,
            10188, 10189, 10190, 10191, 10192, 10193, 10194, 10195, 10196,
            10197, 10198, 10199, 10200, 10203, 10204, 10205, 10206, 10207,
            10208, 10209, 10227, 10228, 10229, 10230, 10231, 10232, 10233,
            10235, 10236, 10237, 10238, 10239, 10240, 10241, 10242, 10243,
            10244, 10245, 10246, 10247, 10248, 10249, 10250, 10252, 10253,
            10254, 10255, 10256, 10257, 10258, 10259, 10260, 10261, 10262,
            10263, 10264, 10265, 10269, 10270, 10271, 10272, 10273, 10275,
            10276, 10277, 10278, 10279, 10280, 10281, 10282, 10283, 10284,
            10285, 10286, 10287, 10288, 10295, 10296, 10297, 10298, 10299,
            10300, 10301, 10302, 10303, 10304, 10305, 10306, 10307, 10308,
            10309, 10311, 10312, 10313, 10344, 10405, 10406, 10407, 10408,
            10411, 10412, 10413, 10414, 10415, 10416, 10423, 10424, 10536,
            10547, 10558, 10559, 10634, 10681, 10802, 10836, 11001, 11002,
            11040, 11220, 11775, 11776, 11777, 11778, 11779, 11780, 11781,
            11782, 11783, 11784, 11785, 11786, 11787, 11788, 11789, 11790,
            11791, 11792, 11793, 11794, 11795, 11796, 11797, 11798, 11799,
            11925, 12082, 12148, 12149, 12695, 12702, 12703, 12704, 12705,
            12706, 12707, 12708, 12709, 12710, 12711, 12712, 12713, 12714,
            12715, 12716, 12717, 12718, 12719, 12720, 12721, 12722, 12723,
            12724, 12962, 13078, 13079, 13080, 13153, 13309, 13447, 13473,
            13609, 13692, 13693, 13702, 14550, 14624, 15114, 15267, 15791,
            15939, 17153, 17204, 17224, 17384, 17392, 17401, 17426, 17576,
            17920, 18741, 19159, 19770, 20000, 20026, 20027, 20028, 20029,
            20030, 20035, 20036, 20037, 20038, 20039, 20045, 20046, 20047,
            20048, 20049, 20050, 20051, 20073, 20265, 20266, 20267, 20268,
            20269, 20270, 20271, 20272, 20273, 20274, 20275, 20276, 20277,
            20278, 20591, 20592, 20593, 20594, 20595, 20596, 20597, 20598,
            20599, 20600, 20601, 20602, 20603, 20604, 20605, 20670, 20671,
            20672, 20673, 20674, 20675, 20676, 20677, 20679, 20680, 20681,
            20682, 20683, 20684, 20685, 20686, 20687, 20688, 20689, 20690,
            20691, 20968, 20969, 20970, 20971, 20972, 20973, 20974, 20975,
            20976, 21016, 21076, 21139, 21140, 21141, 21142, 21143, 21144,
            21145, 21146, 21147, 21148, 21149, 21150, 21151, 21152, 21153,
            21154, 21155, 21156, 21157, 21158, 21159, 21160, 21161, 21162,
            21163, 21164, 21165, 21166, 21167, 21168, 21169, 21170, 21171,
            21172, 21173, 21174, 21175, 21176, 21177, 21178, 21179, 21180,
            21181, 21182, 21183, 21184, 21185, 21186, 21192, 21369, 21370,
            21435, 21436, 21437, 21438, 21439, 21440, 21441, 21517, 21518,
            21519, 21520, 21521, 21522, 21523, 21524, 21525, 21526, 21584,
            21585, 21586, 21587, 21588, 21589, 21601, 21602, 21603, 21604,
            21605, 21606, 21798, 22333, 22340, 22341, 22348, 22349, 22360,
            22434, 22435, 22436, 22437, 22438, 22439, 22440, 22441, 22442,
            22443, 22444, 22445, 22446, 22447, 22448, 22449, 22450, 22451,
            22452, 22453, 22454, 22785, 22786, 22787, 22788, 22789, 22798,
            22850, 22851, 22852, 22853, 22854, 22855, 22856, 22857, 22858,
            22859, 22860, 22861, 22862, 22863, 22864, 22929, 22930, 22931,
            22932, 22933, 22934, 22935, 22936, 22937, 22945, 22946, 22947,
            22949, 22950, 22951, 22952, 22953, 22954, 22962, 22963, 22964,
            22978, 22979, 22980, 22981, 22982, 22983, 22984, 22985, 22986,
            22987, 23075, 23076, 23077, 23078, 23079, 23080, 23081, 23082,
            23083, 23084, 23085, 23088, 23089, 23705, 23706, 23707, 23708,
            23709, 23710, 23711, 23712, 23713, 23714, 23715, 23716, 23717,
            23718, 23719, 23720, 23721, 23722, 23723, 23724, 23896, 23897,
            23898, 23899, 23900, 23901, 23902, 23903, 23904, 23905, 23932,
            23933, 23934, 23935, 23936, 23937, 23964, 23965, 23966, 23967,
            23968, 23969, 23970, 23974, 23975, 23976, 23977, 23978, 23979,
            23980, 24036, 25155, 25156, 25157, 25220, 25222, 25227, 25387,
            26118, 26147, 26200, 26201, 26202, 26203, 26212, 26213, 26214,
            26219, 26220, 26221, 26222, 26223, 26224, 26225, 26226, 26227,
            26228, 26229, 26230, 26245, 26246, 26247, 26248, 26249, 26250,
            26251, 26252, 26253, 26262, 26264, 26265, 26266, 26267, 26268,
            26269, 26270, 26271, 26272, 26273, 26274, 26285, 26286, 26287,
            26288, 26289, 26290, 26291, 26293, 26296, 26297, 26298, 26299,
            26300, 26301, 26302, 26303, 26304, 26305, 26373, 26400, 26458,
            26459, 26460, 26461, 26462, 26463, 26464, 26465, 26466, 26467,
            26468, 26469, 26470, 26471, 26472, 26573, 26574, 26575, 26576,
            26577, 26578, 26579, 26580, 26581, 26582, 26583, 26584, 26585,
            26586, 26587, 26588, 26589, 26590, 26591, 26592, 26839, 28731,
            28732, 28733, 28734, 28737, 28738, 28739, 28753, 28754, 28755,
            28756, 28761, 28762, 28781, 28782, 28792, 28793, 28794, 28795,
            28797, 28798, 28799, 28800, 28801, 28806, 28807, 28808, 28809,
            28810, 28811, 28836, 28837, 28838, 28839, 28840, 28841, 28842,
            28843, 28844, 28845, 28907, 28908, 28909, 28911, 28912, 28913,
            28916, 28917, 28918, 28919, 28920, 28939, 28940, 28941, 28942,
            28943, 28944, 28945, 28946, 28947, 29779, 29780, 29781, 29782,
            29783, 29784, 29785, 29788, 29800, 29805, 29806, 29807, 29913,
            29914, 30005, 30155, 30174, 30175, 31061, 31076, 31246, 31295,
            31344, 31428, 31564, 31600, 31911, 32000, 32497, 32625, 32634,
            32643, 32766, 32857, 32973, 33063, 33083, 33132, 33176, 33202,
            33229, 33283, 33317, 33330, 33369, 33663, 34032, 34921, 35052,
            35101, 35261, 35347, 35348, 35588, 36050, 36097, 36102, 36114,
            36154, 36169, 36276, 36310, 36334, 36525, 36640, 36670, 36856, 36884,
            36941, 36959, 37030, 37157, 37275, 37354, 38079, 38157, 38640,
            38722, 38769, 38986, 38993, 39017, 39041, 39088, 40030, 40213,
            40395, 40624, 41450, 41568, 41654, 42833, 43006, 44244, 47167,
            47270, 47464, 49965, 50880, 50977, 50992, 54169, 56708, 56709, 56683]

#1691, 36169, 56683 don't exist anywhere.

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

def genCSV(skip=skipFull, books=56709, start=1):
        #list of authors
        authors = []
        #list of authors with IDs
        authorsWithID = []
        #start iterating authorID
        authorID = 0
        sizeDict = {}

        with open('zipSize.csv', 'r', encoding='utf-8') as readFile:
                reader = csv.reader(readFile)
                for row in reader:
                        sizeDict[int(row[0])] = int(row[1])
                        
        arrs = test()
        LoCIDs = arrs[0]
        subIDs = arrs[1]
        
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
                                output['subjects'] = []
                                for subject in current['subject(s)']:
                                        output['subjects'].append(subIDs.index(subject))
                                output['libraryOfCongress'] = []
                                for LoC in current['LoC']:
                                        output['libraryOfCongress'].append(LoCIDs.index(LoC))
                                output['zipFileSize'] = sizeDict[x]
                                if first:
                                        first = False
                                        writer = csv.DictWriter(file, output.keys())
                                        writer.writeheader()
                                writer.writerow(output)
        first = True
        writer = None
        with open('authorCSV.csv', 'w', encoding='utf-8') as file:
                writer = csv.DictWriter(file, authorsWithID[0].keys()) 
                writer.writeheader()
                writer.writerows(authorsWithID)

def genMoreCSV():
        arrs = test()
        num = 0
        with open('subjectsCSV.csv', 'w', encoding='utf-8') as file:
                writer = csv.writer(file)
                for row in arrs[1]:
                        writer.writerow([num, row])
                        num += 1
        num = 0
        with open('LoCCSV.csv', 'w', encoding='utf-8') as file:
                writer = csv.writer(file)
                for row in arrs[0]:
                        writer.writerow([num, row])
                        num += 1
        

def test(skip=skipFull, books=56709, start=1):
        largestTitleLength = 0
        longestTitle = ''
        largestSubjectsLength = 0
        largestLoC = 0
        longestSubjects = []
        largestLoCs = []
        authors = []
        maxAuthors = 0
        subjects = []
        subjectsPerBook = []
        LoCPerBook = []
        unLoc = []
        authorsPerBook = []
        titleLen = []
        for x in range(start, books):
                if x not in skip:
                        current = prepWork(x)
                        print(x)
                        print(current)
                        if current['title'] != None:
                                titleLen.append(len(current['title']))
                        else:
                                titleLen.append(0)
                        if current['title'] != None and len(current['title']) > largestTitleLength:
                                largestTitleLength = len(current['title'])
                                longestTitle = current['title']
                        if current['subject(s)'] != None:
                                subjectLength = 0
                                currentSub = []
                                subjectCount = 0
                                for subject in current['subject(s)']:
                                        subjectCount += 1
                                        if subject not in subjects:
                                                subjects.append(subject)
                                        subjectLength += len(subject)
                                        currentSub.append(subject)
                                if subjectLength > largestSubjectsLength:
                                        largestSubjectsLength = subjectLength
                                        longestSubjects = currentSub
                                subjectsPerBook.append(subjectCount)
                        else:
                                subjectsPerBook.append(0)
                        if current['LoC'] != None:
                                LoCCount = 0
                                LoCLength = 0
                                currentLoC = []
                                for LoC in current['LoC']:
                                        LoCCount += 1
                                        if LoC not in unLoc:
                                                unLoc.append(LoC)
                                        LoCLength += len(LoC)
                                        currentLoC.append(LoC)
                                if LoCLength > largestLoC:
                                        largestLoC = LoCLength
                                        largestLoCs = currentLoC
                                LoCPerBook.append(LoCCount)
                        else:
                                LoCPerBook.append(0)
                        if len(current['author(s)']) > maxAuthors:
                                maxAuthors = len(current['author(s)'])
                        authorCount = 0
                        for author in current['author(s)']:
                                authorCount += 1
                                if author not in authors:
                                        authors.append(author)
                        authorsPerBook.append(authorCount)
        subjectsPerBook.sort()
        LoCPerBook.sort()
        authorsPerBook.sort()
        titleLen.sort()
        print('Title: ', largestTitleLength, ' Subjects: ', largestSubjectsLength, ' LoC: ', largestLoC)
        print('Title: ', longestTitle)
        print('Subjects: ', longestSubjects)
        print('LoC: ', largestLoCs)
        print('Authors: ', len(authors))
        print('Max Authors: ', maxAuthors)
        #Authors:  75702
        #No Duplicates:  27085
        print('Avg authors: ', sum(authorsPerBook)/len(authorsPerBook))
        #Avg authors: 1.315
        print('Median authors: ', authorsPerBook[int(len(authorsPerBook)/2)])
        #Median authors:
        #Longest title: 620
        print('Avg title: ', sum(titleLen)/len(titleLen))
        #Avg title: 48.16
        print('Median title: ', titleLen[int(len(titleLen)/2)])
        #Median title: 37
        #Longest Subs: 779
        print('Unique subs: ', len(subjects))
        #Unique Subs: 28986
        print('Avg subs: ', sum(subjectsPerBook)/len(subjectsPerBook))
        #Avg Subs: 2.0393
        print('Median subs: ', subjectsPerBook[int(len(subjectsPerBook)/2)])
        #Median Subs: 2
        #Most LoC: 15
        print('Unique LoC: ', len(unLoc))
        #Unique LoC: 262
        print('Avg LoC: ', sum(LoCPerBook)/len(LoCPerBook))
        #Avg LoC: .9587
        print('Median LoC: ', LoCPerBook[int(len(LoCPerBook)/2)])
        #Median LoC: 1
        return [unLoc, subjects]

def checkCopyright(skip=skipFull, books=56710, start=0, listWorks=True):
        #standard copyright notice: Copyrighted. Read the copyright notice inside this book for details.
        for x in range(start, books):
                if x not in skip:
                        prep = prepWork(x)
                        if prep['copyright'].lower() != "Public domain in the USA.".lower():
                                if listWorks or prep['copyright'].lower() != "Copyrighted. Read the copyright notice inside this book for details.".lower():
                                        print(x)
                                        print(prep)
                                        print()
