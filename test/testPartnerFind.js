var PartnerFind = require("../functions/partnerFind.js"),
    partnerJson = require("../partners.json")
    expect = require('chai').expect;

describe("PartnerFind class", function(){

    let partnerFind = new PartnerFind();
  
    /* 
     * Base strict checking, where input is not an Object type
     */
    it("isValidDistance converts string coordinates to Float values", function(done) {

        coordinates = partnerJson[0].offices[0].coordinates;
        let latitude  = parseFloat(coordinates.substr(0, coordinates.indexOf(',')));
        let longitude = parseFloat(coordinates.substr(coordinates.indexOf(',')+1));

        expect(latitude).to.equal(-33.8934219);
        expect(longitude).to.equal(151.20404600000006);
        done();
    });
});