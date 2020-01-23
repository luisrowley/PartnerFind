module.exports = class PartnerFind {

    constructor(){ }

    /**
     * Process input json data to check for valid partners
     * 
     * @param partnerList | json input data
     * @returns validPartners | object containing partner's data
     */
    dataParse(partnerList) {

        //let partnerList = JSON.parse(jsonObj);

        let validPartners = partnerList.map(function(partner) {

            let validOffices = partner.offices.filter(office => 
                this.isValidDistance(office.coordinates)   
            );

            if(validOffices) return {
                organization: partner.organization,
                offices: validOffices
            };
        });

        return validPartners || [];
    }

    isValidDistance(coordinates) {

        const MAXDISTANCE = 100; // in km
        const londonLat = 51.515419;
        const londonLon = -0.141099;

        let partnerLat  = parseFloat(coordinates.substr(0, coordinates.indexOf(',')));
        let partnerLon = parseFloat(coordinates.substr(coordinates.indexOf(',')+1));

        return calculateDistance(londonLat, londonLon, partnerLat, partnerLon) <= 100;
    }

    /** returns distance in km 
     * @see Haversine-Formula: a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
     *                         c = 2 ⋅ atan2( √a, √(1−a) )
     *                         d = R ⋅ c
     * 
     * @ref https://en.wikipedia.org/wiki/Great-circle_distance
     * @ref https://en.wikipedia.org/wiki/Haversine_formula
    */
    calculateDistance(lat, lon, lat2, lon2) {

        const radius = 6371; // Earth radius in km

        var dLat = this.degToRad(lat2-lat);
        var dLon = this.degToRad(lon2-lon);
        var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var dist = radius * c; // Distance in km

        return dist;
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

