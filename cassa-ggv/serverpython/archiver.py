

class ArchiveError(Exception):
    def __init__(self, ordine, file, errore):
        self.ordine = ordine
        self.file = file
        self.errore = errore
        
    def __str__(self):
        return "Impossibile archiviare l'ordine {0} nel file {1}: {2}".format(
            self.ordine, self.file, self.errore)
        
def archive(ordine):
    pass