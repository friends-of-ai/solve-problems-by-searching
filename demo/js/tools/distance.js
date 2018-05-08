/**
 * A class to calculate distances.
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-08)
 */
var distance = {

    /**
     * Helper function: calculates the given angle into radiant.
     *
     * @param deg
     * @returns {number}
     */
    deg2rad: function (deg) {
        return deg * (Math.PI / 180)
    },

    /**
     * Calculates the distance between two points.
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @returns {number}
     */
    linear: function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    },

    /**
     * Calculates the distance between two points.
     *
     * @param lon1
     * @param lat1
     * @param lon2
     * @param lat2
     * @returns {number}
     */
    fromLatLonInKm: function (lon1, lat1, lon2, lat2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);  // this.deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km

        return d;
    }
}
