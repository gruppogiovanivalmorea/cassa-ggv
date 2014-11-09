Object.values = function(obj) { return Object.keys(obj).map(function(key) { return obj[key]; }); } ;

oneLevelFlatten = function(list) { return [].concat.apply([],list); } ;
