var partnerFind = require("../functions/partnerFind.js"),
    partners = require("../partners.json");

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
});