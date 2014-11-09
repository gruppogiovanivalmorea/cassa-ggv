var finestraOrdineAttuale;
function apriFinestraOrdineAttuale() {
    if (finestraOrdineAttuale == null || finestraOrdineAttuale.closed) {
        finestraOrdineAttuale =
                window.open('ordineAttualeCliente_js.html',
                        'Ordine',
                        'fullscreen');
    }

}

function aggiornaFinestraOrdineAttualePostAjax() {
    if (finestraOrdineAttuale != null && !finestraOrdineAttuale.closed)
        finestraOrdineAttuale.location.reload();
}

function chiudiFinestraOrdineAttuale() {
    if (finestraOrdineAttuale != null)
        finestraOrdineAttuale.close();
}
