/**
 * A class to hold nodes and the mesh.
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-01)
 */
class meshHolder {

    /**
     * The constructor of the meshHolder.
     */
    constructor() {
        this.nodes = {};
        this.mesh = {};
        this.connections = {};
        this.box = {};
        this.separator = '-';
    }

    /**
     * Adds a node to the instance of this class.
     *
     * @param name
     * @param x
     * @param y
     * @returns {string}
     */
    addNode(name, x, y) {
        var key = Object.keys(this.nodes).length + 1;

        key = key < 10 ? '0' + key : '' + key;

        this.nodes[key] = {name: name, x: x, y: y};

        return key;
    }

    /**
     * Returns all nodes.
     *
     * @returns {{}}
     */
    getNodes() {
        return this.nodes;
    }

    /**
     * Add new connection between two given nodes.
     *
     * @param node1
     * @param node2
     * @param cost
     */
    addConnection(node1, node2, cost) {
        var key = this.getKey(node1, node2);

        this.connections[key] = {node1: node1, node2: node2, cost: cost};

        this.addMesh(node1, node2);
    }

    /**
     * Return the connection by given key.
     *
     * @param key
     * @returns {*}
     */
    getConnection(key) {
        return this.connections[key];
    }

    /**
     * Return all connections.
     *
     * @returns {{}}
     */
    getConnections() {
        return this.connections;
    }

    /**
     * Adds a connection between two nodes.
     *
     * @param node1
     * @param node2
     */
    addMesh(node1, node2) {
        if (!(node1 in this.mesh)) {
            this.mesh[node1] = [];
        }

        if (!(node2 in this.mesh)) {
            this.mesh[node2] = [];
        }

        if (this.mesh[node1].indexOf(node2) === -1) {
            this.mesh[node1].push(node2);
        }

        if (this.mesh[node2].indexOf(node1) === -1) {
            this.mesh[node2].push(node1);
        }
    }

    /**
     * Returns the current mesh.
     *
     * @returns {{}}
     */
    getMesh() {
        return this.mesh;
    }

    /**
     * Helper function: calculates the given angle into radiant.
     *
     * @param deg
     * @returns {number}
     */
    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    /**
     * Calculates the distance between two points.
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @returns {number}
     */
    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    /**
     * Calculates the distance between two points.
     *
     * @param lon1
     * @param lat1
     * @param lon2
     * @param lat2
     * @returns {number}
     */
    getDistanceFromLatLonInKm(lon1, lat1, lon2, lat2) {
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

    /**
     * Calculates the key from two nodes.
     *
     * @param start
     * @param target
     * @returns {string}
     */
    getKey(start, target) {
        var arr = [start, target];

        return arr.sort().join(this.separator);
    }

    /**
     * Adds options to given select-tag (from this nodes list).
     *
     * @param selectId
     * @param selected
     * @param changeFunc
     */
    addSelectOptions(selectId, selected, changeFunc) {
        var sorted        = Object.keys(this.nodes).sort();
        var selectTag     = document.getElementById(selectId);
        var selectedIndex = 0;

        /* create all options to select tag */
        for (var i = 0; i < sorted.length; i++) {
            var option = document.createElement('option');
            option.value = sorted[i];
            option.text = this.nodes[sorted[i]].name;

            if (sorted[i] === selected) {
                selectedIndex = i;
            }

            selectTag.add(option);
        }

        /* set selected option */
        selectTag.selectedIndex = selectedIndex;

        if (typeof changeFunc === 'function') {
            document.getElementById(selectId).onchange = changeFunc;
        }
    }
}
