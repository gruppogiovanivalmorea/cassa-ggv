Object.values = function(obj) { return Object.keys(obj).map(function(key) { return obj[key]; }); } ;

oneLevelFlatten = function(list) { return [].concat.apply([],list); } ;

if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false, 
        configurable: true, 
        writable: false, 
        value: function (prop, handler) {
            var oldval = this[prop], 
                newval = oldval, 
                getter = function () {
                    return newval;
                }, 
                setter = function (val) {
                    oldval = newval;
                    return newval = handler.call(this, prop, oldval, val);
                };
            if (delete this[prop]) { // can't watch constants
                Object.defineProperty(this, prop, {
                    get: getter
                    , set: setter
                    , enumerable: true
                    , configurable: true
                });
            }
        }
    });
}

// object.unwatch
if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
        enumerable: false, 
        configurable: true, 
        writable: false, 
        value: function (prop) {
            var val = this[prop];
            delete this[prop]; // remove accessors
            this[prop] = val;
        }
    });
}

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

