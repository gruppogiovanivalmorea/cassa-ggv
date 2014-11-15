Object.values = function(obj) { return Object.keys(obj).map(function(key) { return obj[key]; }); } ;

oneLevelFlatten = function(list) { return [].concat.apply([],list); } ;


Object.clone = function(obj) {
  if(obj.cloneNode) return obj.cloneNode(true);
  var copy = obj instanceof Array ? [] : {};
  for(var attr in obj) {
    if(typeof obj[attr] == "function" || obj[attr]==null || !obj[attr].clone)
      copy[attr] = obj[attr];
    else if(obj[attr]==obj) copy[attr] = copy;
    else copy[attr] = obj[attr].clone();
  }
  return copy;
}

