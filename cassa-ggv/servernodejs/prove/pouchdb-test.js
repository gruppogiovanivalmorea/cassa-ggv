PouchDB = require('pouchdb');
var db = PouchDB('dbname');

db.put({
  _id: 'id-pez',
  name: 'nomestrippo',
  age: 1000
});

db.changes().on('change', function() {
  console.log('Ch-Ch-Changes');
});
    
console.log('aa');

//db.replicate.to('http://example.com/mydb');



console.log('cc');
