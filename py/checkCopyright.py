import os
from fnmatch import fnmatch

#checkList is composed of known Project Gutenberg copyright statements.
#checkExtra is used for verification purposes.

def checkCopyright(root):
    fileCount = 0
    checkList = ['** This is a COPYRIGHTED Project Gutenberg eBook, Details Below **'.lower(),
                 '**This is a COPYRIGHTED Project Gutenberg Etext, Details Below**'.lower(),
                 '**This is a COPYRIGHTED Project Gutenberg Etext Details Below**'.lower(),
                 '**This is a COPYRIGHTED Project Gutenberg Electronic Book**'.lower(),
                 'This is a COPYRIGHTED Project Gutenberg etext.'.lower()]
    checkCount = 0
    checkExtraCount = 0
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
                    for copyrightText in checkList:
                        if copyrightText in text:
                            checkCount += 1
                    if checkExtra in text:
                        checkExtraCount +=1
                        display = True
                except UnicodeDecodeError:
                    file.close()
                    file = open(os.path.join(path, name), 'r', encoding="latin_1")
                    text = file.read().lower()
                    for copyrightText in checkList:
                        if copyrightText in text:
                            checkCount += 1
                    if checkExtra in text:
                        checkExtraCount +=1
                        display = True
                if display:
                    print(os.path.join(path, name))
                    print("Count: ", fileCount, ", CheckBasic: ", checkCount, " CheckExtra: ", checkExtraCount)
                file.close()

    print("Done! ", "Count: ", fileCount, ", CheckBasic: ", checkCount, " CheckExtra: ", checkExtraCount)
