def generateVyperScript(file):
    jsBytes = None
    with open(file, 'rb') as readFile:
        jsBytes = readFile.read()
    vyperFileString = '''
script: public(bytes[''' + str(len(jsBytes)) + '''])

@public
def __init__():
    self.script = ''' + str(jsBytes) [1:]

    with open(file + '.v.py', 'w') as writeFile:
        writeFile.write(vyperFileString)
