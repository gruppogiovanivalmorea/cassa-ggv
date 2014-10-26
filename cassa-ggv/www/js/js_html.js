// Gestione della generazione di codice html via js

var JSHTML = new Object();

JSHTML.generaPaginaIniziale = function(){
  $.each(GGVApp.menu, stampaGruppoMenu);
}


function stampaGruppoMenu(gruppo, elencoProdotti){
  $( "#mainDiv" ).append("<h3>"+gruppo+"</h3>");
  $.each(elencoProdotti, stampaVoceMenu);
}

function stampaVoceMenu(indice, prodotto){
  var html = prodotto.nome;
  html += "<input type='button' value='+' onclick='GGVApp.ordine.inc(\"+prodotto.nome+\")' />";
  html += "<input type='button' value='-' onclick='GGVApp.ordine.dec(\"+prodotto.nome+\")' />";
  html += "<input type='text' value='' />";
  html += "<br />";
  $( "#mainDiv" ).append(html);
}
