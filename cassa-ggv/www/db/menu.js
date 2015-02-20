var _menu = {
	bar: [
		{
			nome: "Acqua",
			gruppo: "bar",
			prezzo: 0.5
		},
		{
			nome: "Vino bottiglia",
			gruppo: "bar",
			prezzo: 10
		},
		{
			nome: "Vino bicchiere",
			gruppo: "bar",
			prezzo: 1
		},
		{
			nome: "Vino litro sfuso",
			gruppo: "bar",
			prezzo: 6
		},
		{
			nome: "Caffè",
			gruppo: "bar",
			prezzo: 0.5
		},
		{
			nome: "Birra Moretti",
			gruppo: "bar",
			prezzo: 2.5
		},
		{
			nome: "Birra Latitante",
			gruppo: "bar",
			prezzo: 3.5
		},
		{
			nome: "Bibita",
			gruppo: "bar",
			prezzo: 2
		},
		{
			nome: "Birra Artigianale",
			gruppo: "bar",
			prezzo: 3.5
		},
	],
	primi: [
		{
			nome: "Asino",
			gruppo: "primi",
			prezzo: "8"
		},
		{
			nome: "Trippa",
			gruppo: "primi",
			prezzo: 4.5
		},
		{
			nome: "Pecora",
			gruppo: "primi",
			prezzo: 6
		},
		{
			nome: "Gnocchi ragu",
			gruppo: "primi",
			prezzo: 4
		},
		{
			nome: "Gnocchi pomodoro",
			gruppo: "primi",
			prezzo: 3.5
		},
		{
			nome: "Gnocchi burro salvia",
			gruppo: "primi",
			prezzo: 3.5
		},
		{
			nome: "Gnocchi boscaiola",
			gruppo: "primi",
			prezzo: 4.5
		},
		{
			nome: "Gnocchi 4 formaggi",
			gruppo: "primi",
			prezzo: 4.5
		},
		{
			nome: "Dolci",
			gruppo: "primi",
			prezzo: 2
		},
	],
	secondi: [
		{
			nome: "Costine",
			gruppo: "secondi",
			prezzo: 5
		},
		{
			nome: "Cotto",
			gruppo: "secondi",
			prezzo: 3.5
		},
		{
			nome: "Verdure grigliate",
			gruppo: "secondi",
			prezzo: 2
		},
		{
			nome: "Tomino + verdure",
			gruppo: "secondi",
			prezzo: 4
		},
		{
			nome: "Tomino",
			gruppo: "secondi",
			prezzo: 2
		},
		{
			nome: "Roast beef",
			gruppo: "secondi",
			prezzo: 4
		},
		{
			nome: "Pollo",
			gruppo: "secondi",
			prezzo: 4
		},
		{
			nome: "Fagioli",
			gruppo: "secondi",
			prezzo: 2
		},
		{
			nome: "Panino salamella",
			gruppo: "secondi",
			prezzo: 3
		},
		{
			nome: "Grigliata",
			gruppo: "secondi",
			prezzo: 8
		},
		{
			nome: "Patate fritte",
			gruppo: "secondi",
			prezzo: 3
		}
	]
};


localStorage.setItem('menu', JSON.stringify(_menu));

