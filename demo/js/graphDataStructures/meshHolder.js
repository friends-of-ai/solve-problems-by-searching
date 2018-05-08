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
    addConnection(node1, node2, properties) {
        var key = this.getKey(node1, node2);

        this.connections[key] = {node1: node1, node2: node2};

        for (var index in properties) {
            this.connections[key][index] = properties[index];
        }

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
}
