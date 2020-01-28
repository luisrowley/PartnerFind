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
        this.londonLatitude = 51.515419;
        // Central London longitude coordinate
        this.londonLongitude = -0.141099;
    }

    /**
     * Process input json data to check for valid partners within the expected distance.
     * 
     * @param partnerList | json input data
     * 
     * @returns validPartners | Object containing partner's name and address array
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

        return validPartners.sort(this.compareByName);
    }

    /**
     * Parses the coordinates value in string form and calls calculateDistance
     * to determine if two points are a within the expected MAXDISTANCE range.
     * 
     * It takes optional parameters for the initial point.
     * 
     * @param coordinates | string with longitude and longitude of the partner.
     * @param latitude  | latitude value for the initial point (Defaults to Central London).
     * @param longitude | longitude value for the initial point (Defaults to Central London).
     * 
     * @var partnerLat | latitude value for the partner derived from coordinates.
     * @var partnerLon | longitude value for the partner derived from coordinates.
     * 
     * @returns validPartners | object containing partner's data
     */
    isValidDistance(coordinates, latitude=this.londonLatitude, longitude=this.londonLongitude) {

        let partnerLatitude = parseFloat(coordinates.substr(0, coordinates.indexOf(',')));
        let partnerLongitude = parseFloat(coordinates.substr(coordinates.indexOf(',')+1));
        let totalDistance = this.calculateDistance(latitude, longitude, partnerLatitude, partnerLongitude);

        return totalDistance <= this.MAXDISTANCE;
    }

    /** 
     * Computes the Great-Circle distance between two points in km.
     * It takes into account a perfect spherical Earth, ignoring ellipsoidal effects.
     * (Average error margin approximates to around 0.3% depending on the points).
     * 
     * @see Haversine-Formula: a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
     *                         c = 2 ⋅ arcsin( √a )
     *                         d = R ⋅ c
     * 
     * @see https://en.wikipedia.org/wiki/Great-circle_distance
     * @see https://en.wikipedia.org/wiki/Haversine_formula
     * 
     * @param originLatitude       | latitude for the initial point
     * @param originLongitude      | longitude for the initial point
     * @param destinationLatitude  | latitude for the destination point
     * @param destinationLongitude | longitude for the destination point
     * 
     * @returns dist | The distance (in km) rounded to two decimal positions.
    */
    calculateDistance(originLatitude, originLongitude, destinationLatitude, destinationLongitude) {

        // Earth radius in km
        const radius = 6371;

        // Latitude differential
        var latitudeDiff = this.degToRad(destinationLatitude-originLatitude);

        // Longitude differential
        var longitudeDiff = this.degToRad(destinationLongitude-originLongitude);

        // Haversine function
        var haversine = 
            Math.sin(latitudeDiff/2) * Math.sin(latitudeDiff/2) +
            Math.cos(this.degToRad(originLatitude)) * Math.cos(this.degToRad(destinationLatitude)) * 
            Math.sin(longitudeDiff/2) * Math.sin(longitudeDiff/2);

        // Angular distance in radians
        var angularDistance = 2 * Math.asin(Math.sqrt(haversine));

        // Resulting distance in km
        var distance = radius * angularDistance;

        // Final result rounded two decimal positions
        return Math.round(distance * 100) / 100;
    }

    /**
     * Simple degree to radian converter.
     * 
     * @param degrees | float signed number
     * 
     * @returns radian converted value
     */
    degToRad(degrees) {
        return degrees * (Math.PI/180)
    }

    /**
     * Sorts all partners in ascending alphabetical order
     * This function is to be implemented as parameter for Array.sort
     * 
     * @param currentObj | json input data
     * 
     * @returns the comparison number value:
     *          -> @val -1 : sorts 'a' to index lower than 'b'
     *          -> @val  1 : sorts 'b' to index lower than 'a'
     *          -> @val  0 : leaves 'a' and 'b' unchanged
     */
    compareByName(partnerA, partnerB) {

        // toUpperCase() solves any casing problems
        const nameA = partnerA.organization.toUpperCase();
        const nameB = partnerB.organization.toUpperCase();

        let comparison = 0;

        if(nameA > nameB)
        {
            comparison = 1;
        }
        else if (nameA < nameB) 
        {
            comparison = -1;
        }
        return comparison;
    }

    /**
     * Presents the resulting Partners data in a more legible format.
     * 
     * @param jsonObj | json input data
     * 
     * @returns string with nearby partners data
     */
    presentData(jsonObj) {

        return JSON.stringify(jsonObj, null, 4);
    }
}
