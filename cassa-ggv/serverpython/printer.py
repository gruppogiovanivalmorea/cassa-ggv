from functools import reduce


class PrintError(Exception):
    def __init__(self, stampante, errore):
        self.stampante = stampante
        self.errore = errore
        
    def __str__(self):
        return 'Impossibile stampare su ' + self.stampante + \
            '\n(dovresti provare a cambiare stampante tan):\n' + self.errore

def printPos(richiesta):
    tipostampante = richiesta['stampante']['tipo']
    nomestampante = richiesta['stampante']['nome']
    if tipostampante == 'usb':
        printfunc = lambda pos: printfile(nomestampante, pos)
    elif tipostampante == 'socket':
        printfunc = lambda pos: printsocket(nomestampante, pos)
    else:
        raise PrintError(
            richiesta['stampante'], 
            'Tipo stampante non valido: '+tipostampante)
    
    for pos in toPosCodes(richiesta['ordine']['voci']):
        printfunc(pos)

def toPosCodes(voci):
    def aggregaVoci(pos, voce):
        if not voce.get('dividiStampa', False):
            pos.append(generateSinglePos(voce))
        else:
            nuova = {'gruppo':voce['gruppo'], 'nome':voce['nome'], 'qta':1}
            pos += [generateSinglePos(nuova) for i in range(voce['qta'])]
        return pos
    return reduce(aggregaVoci, voci, [])


def generateSinglePos(voce):
    pos = '\x1d\x21\x13'
    pos += '  ValmoFestival Tridi'
    pos += '\n\n\x1d\x21\x12'
    
    pos += ' ' * ((23-len(voce['gruppo'])) // 2)
    # center (23 è il numero di caratteri stampabili per riga, con dimensione carattere 12)
    pos += voce['gruppo']
    pos += ' ' * ((23-len(voce['gruppo'])) // 2)
    
    pos += '\n\n\x1d\x21\x11'
    qta = voce['qta'] if isinstance(voce['qta'],str) else str(voce['qta'])
    pos += '  '+ qta +'x '+ voce['nome']
    pos += '\n\n\n\n\n\n\n\x1b\x6d'
    return pos


def printfile(filename, pos):
    try:
        with open(filename, 'w') as file:
            file.write(pos)
    except OSError as e:
        raise PrintError(filename, 'errore '+str(e.errno)+': '+e.strerror)
        
def printsocket(url, pos):
    pass

