var _menu = {
	bar: [
		{
			nome: "Acqua",
			gruppo: "bar",
			prezzo: 0.5
		},
		{
			nome: "Bibita",
			gruppo: "bar",
			prezzo: 2
		},
		{
			nome: "Caffè",
			gruppo: "bar",
			prezzo: 1
		},
		{
			nome: "Vino 1 litro sfuso",
			gruppo: "bar",
			prezzo: 7
		},
		{
			nome: "Vino bicchiere",
			gruppo: "bar",
			prezzo: 1
		},
		{
			nome: "Vino Roverone Riserva",
			gruppo: "bar",
			prezzo: 12
		},
		{
			nome: "Vino Falanghina",
			gruppo: "bar",
			prezzo: 10
		},
		{
			nome: "Birra artigianale",
			gruppo: "bar",
			prezzo: 3.5
		},
		{
			nome: "Birra Moretti / Ichnusa",
			gruppo: "bar",
			prezzo: 2.5
		},
		{
			nome: "Boccale birra artigianale",
			gruppo: "bar",
			prezzo: 10,
		},
		{
			nome: "Boccale birra Moretti / Ichnusa",
			gruppo: "bar",
			prezzo: 8,
		},
		{
			nome: "Boccale Valmo Festival",
			gruppo: "bar",
			prezzo: 2,
			stampa: false
		},
		{
			nome: "Bicchiere Valmo Festival",
			gruppo: "bar",
			prezzo: 1,
			stampa: false
		},

	],
	primi: [
		{
			nome: "Gnocchi ragu",
			gruppo: "primi",
			prezzo: 4
		},
		{
			nome: "Gnocchi boscaiola",
			gruppo: "primi",
			prezzo: 4.5
		},
		{
			nome: "Gnocchi burro e salvia",
			gruppo: "primi",
			prezzo: 3.5
		},
		{
			nome: "Gnocchi pomodoro",
			gruppo: "primi",
			prezzo: 3.5
		},
		{
			nome: "Gnocchi zola salsiccia",
			gruppo: "primi",
			prezzo: 4.5
		},
		{
			nome: "Trippa",
			gruppo: "primi",
			prezzo: 4.5
		},
		{
			nome: "Brasato d'asino con polenta",
			gruppo: "primi",
			prezzo: 8
		},
		{
			nome: "Gorgonzola",
			gruppo: "primi",
			prezzo: 2
		},
		{
			nome: "Zuppa di cipolle con pane toscano",
			gruppo: "primi",
			prezzo: 4.5
		},
		{
			nome: "Polenta con sughi",
			gruppo: "primi",
			prezzo: 4
		},
		{
			nome: "Polenta e zola",
			gruppo: "primi",
			prezzo: 2
		},
        {
			nome: "Dolci",
			gruppo: "primi",
			prezzo: 2
		},
	],
	secondi: [
		{
			nome: "Grigliata mista",
			gruppo: "secondi",
			prezzo: 8.5
		},
		{
			nome: "Costine",
			gruppo: "secondi",
			prezzo: 5.5
		},
		{
			nome: "Tomino",
			gruppo: "secondi",
			prezzo: 2.5
		},
		{
			nome: "Tomino con asparagi",
			gruppo: "secondi",
			prezzo: 5
		},
        {
			nome: "Panino con salamella",
			gruppo: "secondi veloci",
			prezzo: 3
		},
       
        {
			nome: "Sovracosce di pollo",
			gruppo: "secondi",
			prezzo: 4.5
		},
        {
			nome: "Patate fritte",
			gruppo: "secondi veloci",
			prezzo: 3
		},
        {
			nome: "Fagioli",
			gruppo: "secondi veloci",
			prezzo: 2
		},
        {
			nome: "Fagioli con cipolle",
			gruppo: "secondi veloci",
			prezzo: 2
		},
        {
			nome: "Fanta Insalata",
			gruppo: "secondi veloci",
			prezzo: 3
		},
		
	]
};


localStorage.setItem('menu', JSON.stringify(_menu));

