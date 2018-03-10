import os
from shutil import copy2
from fnmatch import fnmatch

def moveTexts(directory='C:/gutenberg/', newDirectory='C:/gutenbergNoSubs/'):
    for path, subdirs, files in os.walk(directory):
        for name in files:
            if fnmatch(name, '*.txt'):
                print(os.path.join(path, name))
                #Easy exception: if filename contains non-numerical characters
                #                besides -, then skip. Not yet implemented for
                #                experimental reasons.
                copy2(os.path.join(path, name), newDirectory)
