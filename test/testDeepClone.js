var dc = require("../functions/deepClone.js"),
assert = require('assert'),
expect = require('chai').expect;

describe("deepClone function", function(){
  
    /* 
     * Base strict checking, where input is not an Object type
     */
    it("handles non-object types", function(done) {

        notObjectType = new Boolean(true);
        newObj = dc.deepClone(notObjectType);

        expect(newObj).to.equal(true);
        done();
    });

    /* 
     * Checks that for any input object without nested structures, 
     * the resulting cloned object is exactly the same as the original.
     */
    it("handles shallow objects", function(done) {

        let obj = {
            a: 1,
            b: 2,
        };

        newObj = dc.deepClone(obj);
        // avoid using strict equality
        assert.deepEqual(newObj, obj);
        expect(newObj).to.deep.equal(obj);
        expect(newObj.a).to.equal(obj.a);
        expect(newObj.b).to.equal(obj.b);
        done();
    });

    /* 
     * Tests that the newly cloned object is an independent object
     * and not a memory reference to the original one, 
     * thus not inheriting its values.
     */
    it("immutability test", function(done) {

        let obj = {
            a: 1,
            b: 2,
        };

        newObj = dc.deepClone(obj);
        expect(newObj).to.deep.equal(obj);

        obj.a = 5;
        expect(obj.a).to.equal(5);
        expect(newObj.a).to.not.equal(obj.a);

        done();
    });

    /* 
     * Checks for input object with nested structures.
     */
    it("supports nested object structures", function(done) {

        let obj = {name: "Paddy", address: {town: "Lerum", country: "Sweden"}};

        newObj = dc.deepClone(obj);
        // avoid using strict equality
        expect(newObj).to.deep.equal(obj);
        expect(newObj.address.town).to.equal(obj.address.town);
        done();
    });

    /* 
     * Checks for input object with nested structures with methods.
     */
    it("supports nested object structures containing method properties", function(done) {

        let obj = {name: "Paddy", address: {town: "Lerum", country: "Sweden", sayHi: function(){
            console.log("hi");
        }}};

        newObj = dc.deepClone(obj);
        // console.log(newObj);
        // avoid using strict equality
        expect(newObj).to.deep.equal(obj);
        expect(newObj.address.town).to.equal(obj.address.town);
        done();
    });

    /* 
     * Checks for input object containing a nested array property.
     */
    it("supports nested array as a property", function(done) {

        let obj = {
            a: 1,
            b: 2,
            luckyNumbers: [5, 7, 9]
        };


        newObj = dc.deepClone(obj);
        // avoid using strict equality
        expect(newObj).to.deep.equal(obj);
        expect(newObj.luckyNumbers[0]).to.equal(obj.luckyNumbers[0]);
        done();
    });

    /* 
     * Checks support for pure arrays.
     */
    it("supports pure arrays", function(done) {

        let obj = [5,4,2,3];

        newObj = dc.deepClone(obj);
        // avoid using strict equality
        expect(newObj).to.deep.equal(obj);
        expect(newObj[0]).to.equal(obj[0]);
        done();
    });

    /* 
     * Tests support for own property descriptors.
     */
    it("supports own property descriptors", function(done) {

        let obj = {
            a: 1,
            b: 2
        };

        newObj = dc.deepClone(obj);
        // avoid using strict equality
        expect(newObj).to.deep.equal(obj);

        Object.defineProperty(obj, 'a', {writable: false});
        expect(Object.getOwnPropertyDescriptor(obj, 'a').writable).to.equal(false);
        expect(Object.getOwnPropertyDescriptor(newObj, 'a').writable).to.equal(true);
        done();
    });
});

