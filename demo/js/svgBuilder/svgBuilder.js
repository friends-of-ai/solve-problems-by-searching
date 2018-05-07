/**
 * SVGBuilder to build svg documents from given meshHolder.
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-01)
 */
class svgBuilder {

    /**
     * The constructor of svgBuilder class.
     *
     * @param meshHolderInstance
     * @param height
     * @param width
     * @param border
     */
    constructor(meshHolderInstance, height, width, border) {

        this.box = {};

        this.height = height;
        this.width = width;
        this.border = border;

        /* check the given parameter */
        if (!(meshHolderInstance instanceof meshHolder)) {
            throw new Error('The given parameter meshHolderInstance must be an instance of meshHolder.');
        }

        this.svgns = 'http://www.w3.org/2000/svg';

        /* create svg document */
        this.document = document.createElementNS(this.svgns, 'svg');

        /* add some properties */
        this.document.setAttributeNS(null, 'id', 'svgDoc');
        this.document.setAttributeNS(null, 'height', height + 'px');
        this.document.setAttributeNS(null, 'width', width + 'px');

        this.meshHolder = meshHolderInstance;

        /* add svg to body */
        document.body.appendChild(this.document);
    }

    /**
     * Returns the document.
     *
     * @returns {SVGElement}
     */
    getDocument() {
        return this.document;
    }

    /**
     * Creates the mesh and nodes.
     *
     * @param tree
     * @param optimalWay
     */
    initialize() {
        this.createMesh();
        this.createNodes();
    }

    /**
     * Reset the mesh. Set the standard width and color.
     */
    reset() {
        for (var key in this.meshHolder.getConnections()) {
            document.getElementById('connection-' + key).setAttribute('stroke', 'blue');
            document.getElementById('connection-' + key).setAttribute('stroke-width', '1px');
        }
    }

    /**
     * Redraw the svg document with the new calculated tree.
     *
     * @param tree
     * @param targetNode
     */
    redraw(tree, targetNode) {
        /* reset mesh */
        this.reset();

        /* print tree */
        this.printTree(tree, targetNode);
    }

    /**
     * Analyses the box.
     */
    analyseBox(nodes, width, height, border) {
        var innerHeight = height - 2 * border;
        var innerWidth = width - 2 * border;

        this.box = {
            minY: 1000000,
            maxY: 0,
            minX: 1000000,
            maxX: 0
        }

        /* analyse the places */
        for (var index in nodes) {
            var value = nodes[index];
            this.box.minY = value.y < this.box.minY ? value.y : this.box.minY;
            this.box.maxY = value.y > this.box.maxY ? value.y : this.box.maxY;
            this.box.minX = value.x < this.box.minX ? value.x : this.box.minX;
            this.box.maxX = value.x > this.box.maxX ? value.x : this.box.maxX;
        }

        this.box.distY = this.box.maxY - this.box.minY;
        this.box.distX = this.box.maxX - this.box.minX;

        this.box.scaleY = innerHeight / this.box.distY;
        this.box.scaleX = innerWidth / this.box.distX;

        return this.box;
    }

    /**
     * Create all nodes from current node and mesh structure.
     */
    createNodes() {
        var self = this;
        var svgDocument = this.getDocument();
        var nodes = this.meshHolder.getNodes();

        this.analyseBox(nodes, this.width, this.height, this.border);
        var innerHeight = this.height - 2 * this.border;

        /* create nodes */
        for (var key in nodes) {
            var node = nodes[key];

            var x = Math.round((node.x - this.box.minX) * this.box.scaleX + this.border);
            var y = Math.round(innerHeight - (node.y - this.box.minY) * this.box.scaleY + this.border);

            var circle = document.createElementNS(self.svgns, 'circle');
            circle.setAttributeNS(null, 'cx', x + 'px');
            circle.setAttributeNS(null, 'cy', y + 'px');
            circle.setAttributeNS(null, 'id', 'node-' + key);
            circle.setAttributeNS(null, 'r', 5);
            circle.setAttributeNS(null, 'style', 'fill: blue; stroke: blue; stroke-width: 1px;');
            svgDocument.appendChild(circle);

            var theText = document.createTextNode(node.name);
            var txtElem = document.createElementNS(self.svgns, 'text');
            txtElem.setAttributeNS(null, 'x', (x - 8) + 'px');
            txtElem.setAttributeNS(null, 'y', (y - 8) + 'px');

            txtElem.appendChild(theText);
            svgDocument.appendChild(txtElem);
        }
    }

    /**
     * Create the mesh from current node and mesh structure.
     */
    createMesh() {
        var self = this;
        var svgDocument = this.getDocument();
        var nodes = this.meshHolder.getNodes();
        var connections = this.meshHolder.getConnections();

        this.analyseBox(nodes, this.width, this.height, this.border);
        var innerHeight = this.height - 2 * this.border;

        for (var key in connections) {
            var distance = connections[key].cost;
            var keySplit = key.split(self.meshHolder.separator);

            var x1 = Math.round((nodes[keySplit[0]].x - this.box.minX) * this.box.scaleX + this.border);
            var y1 = Math.round(innerHeight - (nodes[keySplit[0]].y - this.box.minY) * this.box.scaleY + this.border);
            var x2 = Math.round((nodes[keySplit[1]].x - this.box.minX) * this.box.scaleX + this.border);
            var y2 = Math.round(innerHeight - (nodes[keySplit[1]].y - this.box.minY) * this.box.scaleY + this.border);

            var newLine = document.createElementNS(self.svgns, 'line');
            newLine.setAttribute('x1', x1 + 'px');
            newLine.setAttribute('y1', y1 + 'px');
            newLine.setAttribute('x2', x2 + 'px');
            newLine.setAttribute('y2', y2 + 'px');
            newLine.setAttribute('id', 'connection-' + key);
            newLine.setAttribute('stroke', 'blue');
            svgDocument.appendChild(newLine);

            var theText = document.createTextNode(distance + ' km');
            var txtElem = document.createElementNS(self.svgns, 'text');
            txtElem.setAttributeNS(null, 'x', Math.round((x1 + x2) / 2) + 'px');
            txtElem.setAttributeNS(null, 'y', Math.round((y1 + y2) / 2) + 'px');
            txtElem.setAttributeNS(null, 'style', 'font-size: 10px;');
            txtElem.setAttributeNS(null, 'fill', 'green');
            txtElem.appendChild(theText);
            svgDocument.appendChild(txtElem);
        }
    }

    /**
     * Prints the given tree.
     *
     * @param tree
     * @param optimalWay
     */
    printTree(tree, targetNode) {
        for (var beforePlace in tree) {
            var key = this.meshHolder.getKey(beforePlace, tree[beforePlace]);
            document.getElementById('connection-' + key).setAttribute('stroke', 'red');
        }

        this.markWayBackFromTarget(tree, targetNode);
    }

    /**
     * Mark the optimal path.
     *
     * @param tree
     * @param targetPlace
     */
    markWayBackFromTarget(tree, targetNode) {
        var node = targetNode;

        while (true) {
            if (typeof tree[node] === 'undefined') {
                break;
            }

            var key = this.meshHolder.getKey(node, tree[node]);

            document.getElementById('connection-' + key).setAttribute('stroke-width', '5px');

            node = tree[node];
        }
    }
}
