GGVApp = new Object();

GGVApp.menu = getMenu();




// TODO: interrogare il server
function getMenu(){	
	return localStorage.getItem('menu');
}
