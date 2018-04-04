import os, csv
from fnmatch import fnmatch

def calculateZipFilesCSV(directory='C:/gutenbergnosubs/'):
    nameList = []
    sizeList = []
    with open('zipSize.csv', 'w', encoding='utf-8') as file:
        writer = csv.writer(file)
        for path, subdirs, files in os.walk(directory):
            for name in files:
                if fnmatch(name, '*.zip'):
                    nameList.append(name)
                    size = os.stat(os.path.join(path, name)).st_size
                    sizeList.append(size)
                    print("Name: ", name, " Size: ", size, " bytes")
                    writer.writerow([name, size])
