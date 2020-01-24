module.exports = class PartnerFind {

    /**
     * Class constructor.
     * Sets the initial values for global variables as required.
     */
    constructor()
    {  
        // Global variable for max distance in km
        this.MAXDISTANCE = 100;
        // Central London latitude coordinate
        this.londonLat = 51.515419;
        // Central London longitud coordinate
        this.londonLon = -0.141099;
    }

    /**
     * Process input json data to check for valid partners
     * 
     * @param partnerList | json input data
     * @returns validPartners | object containing partner's data
     */
    dataParse(partnerList) {

        let validPartners = [];
        
        partnerList.forEach((partner) => {

            let validOffices = partner.offices.filter((office) => 
                this.isValidDistance(office.coordinates) 
            );

            if(validOffices.length) {

                let locations = validOffices.map((office) => 
                    office.address
                )

                validPartners.push({
                    organization: partner.organization,
                    offices: locations
                });
            }
        });

        return validPartners;
    }

    isValidDistance(coordinates, lat=this.londonLat, lon=this.londonLon) {

        let partnerLat  = parseFloat(coordinates.substr(0, coordinates.indexOf(',')));
        let partnerLon = parseFloat(coordinates.substr(coordinates.indexOf(',')+1));

        return this.calculateDistance(lat, lon, partnerLat, partnerLon) <= this.MAXDISTANCE;
    }

    /** returns distance in km 
     * @see Haversine-Formula: a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
     *                         c = 2 ⋅ arcsin( √a )
     *                         d = R ⋅ c
     * 
     * @ref https://en.wikipedia.org/wiki/Great-circle_distance
     * @ref https://en.wikipedia.org/wiki/Haversine_formula
    */
    calculateDistance(lat, lon, lat2, lon2) {

        // Earth radius in km
        const r = 6371;

        // Latitud differential
        var dLat = this.degToRad(lat2-lat);

        // Longitud differential
        var dLon = this.degToRad(lon2-lon);

        // Haversine function
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.degToRad(lat)) * Math.cos(this.degToRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);

        // Angular distance in radians
        var c = 2 * Math.asin(Math.sqrt(a));

        // Distance in km
        var dist = r * c;

        // result rounded two decimal positions
        return Math.round(dist * 100) / 100;
    }

    degToRad(degrees) {
        return degrees * (Math.PI/180)
    }

    /**
     * Sorts all partners in ascending alphabetical order
     * 
     * @param currentObj | json input data
     * @returns 
     */
    presentPartnerList(currentObj) {


    }
}

