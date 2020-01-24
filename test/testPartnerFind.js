var PartnerFind = require("../functions/partnerFind.js"),
    partnerJson = require("../partners.json")
    expect = require('chai').expect;

describe("PartnerFind class", function(){

    let partnerFind = new PartnerFind();
  
    /* 
     * Check for correct transformation of coordinates from string to float.
     */
    it("isValidDistance converts string coordinates to Float values", function(done) {

        //  coordinates = "-33.8934219,151.20404600000006" (Sydney)
        let coordinates = partnerJson[0].offices[0].coordinates,
            latitude  = parseFloat(coordinates.substr(0, coordinates.indexOf(','))),
            longitude = parseFloat(coordinates.substr(coordinates.indexOf(',')+1));

        expect(latitude).to.equal(-33.8934219);
        expect(longitude).to.equal(151.20404600000006);
        done();
    });

    /* 
     * Check for correct output of the isValidDistance function. dist > 100km
     */
    it("isValidDistance returns false for distance greater than 100 km", function(done) {

        //  coordinates = "-33.8934219,151.20404600000006" (Sydney)
        let coordinates = partnerJson[0].offices[0].coordinates,
            isValid = partnerFind.isValidDistance(coordinates);

        expect(isValid).to.equal(false);
        done();
    });

    /* 
     * Check for correct output of the isValidDistance function. dist < 100km
     */
    it("isValidDistance returns true for distance less than 100 km", function(done) {

        //  coordinates = "51.5014767,-0.0713608999999451" (London)
        let coordinates = partnerJson[3].offices[1].coordinates,
            isValid = partnerFind.isValidDistance(coordinates);

        expect(isValid).to.equal(true);
        done();
    });

    /* 
     * Test distance computation from latitude/longitud coordinate pair.
     */
    it("calculateDistance returns expected value from input coordinates.", function(done) {

        coordinates = partnerJson[0].offices[0].coordinates;
        const lat = partnerFind.londonLat;
        const lon = partnerFind.londonLon;
        const lat2 = -33.8934219;
        const lon2 = 151.20404600000006;

        var expected = 16996.05; // in km

        var distance = partnerFind.calculateDistance(lat, lon, lat2, lon2);

        expect(distance).to.equal(expected);

        done();
    });

    /* 
     * Test dataParse function returns expected object array
     */
    it("dataParse returns an unordered array of partners within 100 km.", function(done) {

        var nearPartners = partnerFind.dataParse(partnerJson);

        //console.log(nearPartners);
        //expect(distance).to.equal(expected);

        done();
    });
    
    /* 
     * Test presentData function
     */
    it("presentData provides with a readable list of nearby partners.", function(done) {

        var nearPartners = partnerFind.dataParse(partnerJson);
        var data = partnerFind.presentData(nearPartners);

        console.log(data);

        done();
    });
});
