
exports.deepClone = function(obj) {
    // Handle base case if not an object type
    if (obj == null || typeof obj != "object") return obj;

    // Handle case where obj is instance of array
    if (obj instanceof Array) {
        newArray = [];
        for (var i = 0; i < obj.length; i++) {
            newArray[i] = exports.deepClone(obj[i]);
        }
        return newArray;
    }

    // Perform clone of original object
    if (obj instanceof Object) {
        return JSON.parse(JSON.stringify(obj));
    }

    // None of the above cases, throw exception
    throw new Error("Unable to copy obj! Its type isn't supported.");
}
