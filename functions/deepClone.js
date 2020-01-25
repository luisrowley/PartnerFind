/**
 * Deep clone algorithm for JS Objects. 
 * 
 * It is non-dependant of any external libraries.
 * 
 * @note : This intentionally avoids the trivial solution of implementing the well-known:
 *         ` JSON.parse(JSON.stringify(obj)) `
 *         It does so, just for the sake of developing a well-thought-out cloning algorithm.
 * 
 * @param elem | input element to be cloned
 * 
 * @returns newObj | An exact copy of the original object, not a mere reference in memory.
 */
exports.deepClone = function clone(elem) {

    // Handle base case if object is null
    if (elem == null) return elem;

    // Define local variables
    let newObj,
        primitiveTypes = [ Number, String, Boolean ];

    // Address the problem of primitive types
    primitiveTypes.forEach(function(type) {
        if (elem instanceof type) {
            newObj = type( elem );
        }
    });

    // Non-primitive element, check to see the type
    if (typeof newObj == "undefined")
    {
        // case where element is an array
        if (elem instanceof Array)
        {
            newObj = [];
            for (var i = 0; i < elem.length; i++) {
                newObj[i] = clone( elem[i] );
            }
        }
        
        // case where element is an object
        else if (typeof elem == "object")
        {
            // case where element is a DOM node
            if (elem.nodeType && typeof elem.cloneNode == "function")
            {
                newObj = elem.cloneNode(true);    
            }
            // case for literal definitions
            else if (!elem.prototype)
            {
                // special case for Date type
                if (elem instanceof Date)
                {
                    // clone original time instead of runtime
                    newObj = new Date(elem);
                    newObj.setTime(elem.getTime());
                } 
                else
                {
                    // support for object literals
                    newObj = {};
                    for (var prop in elem) {
                        newObj[prop] = clone(elem[prop]);
                    }
                }
            }
        } else {
            newObj = elem;
        }
    }

    return newObj;
}