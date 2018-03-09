import os
from fnmatch import fnmatch

#Checks Gutenberg .txt files for copyright.
#check1, check2, and check3 are all copyright statements used by Project Gutenberg. checkExtra is used for verification purposes.

def checkCopyright(root):
    fileCount = 0
    check1Count = 0
    check2Count = 0
    check3Count = 0
    checkExtraCount = 0
    check1 = '** This is a COPYRIGHTED Project Gutenberg eBook, Details Below **'
    check1 = check1.lower()
    check2 = '**This is a COPYRIGHTED Project Gutenberg Etext, Details Below**'
    check2 = check2.lower()
    check3 = '**This is a COPYRIGHTED Project Gutenberg Etext Details Below**'
    check3 = check3.lower()
    checkExtra = 'COPYRIGHTED Project Gutenberg'
    checkExtra = checkExtra.lower()
    for path, subdirs, files in os.walk(root):
        for name in files:
            if fnmatch(name, '*.txt'):
                display = False
                fileCount += 1
                file = open(os.path.join(path, name), 'r', encoding="ascii")
                try:
                    text = file.read().lower()
                    if check1 in text:
                        check1Count += 1
                    if check2 in text:
                        check2Count += 1
                    if check3 in text:
                        check3Count += 1
                    if checkExtra in text:
                        checkExtraCount +=1
                        display = True
                except UnicodeDecodeError:
                    file.close()
                    file = open(os.path.join(path, name), 'r', encoding="latin_1")
                    text = file.read().lower()
                    if check1 in text:
                        check1Count += 1
                    if check2 in text:
                        check2Count += 1
                    if check3 in text:
                        check3Count += 1
                    if checkExtra in text:
                        checkExtraCount +=1
                        display = True
                if display:
                    print(os.path.join(path, name))
                    print("Count: ", fileCount, ", CheckBasic: ", check1Count+check2Count+check3Count, " CheckExtra: ", checkExtraCount)
                file.close()

