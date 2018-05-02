/**
 * SVGBuilder to build svg documents from given meshHolder.
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-01)
 */
class svgBuilder {

    /**
     *
     * @param meshHolder
     * @param height
     * @param width
     */
    constructor(meshHolderInstance, height, width) {

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
     * Draws the mesh and nodes.
     */
    createMeshAndNodes() {
        this.createNodes();
        this.createMesh();
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
        this.printTree(tree);

        /* print the ideal way */
        this.markWayBackFromTarget(tree, targetNode);
    }

    /**
     * Create all nodes from current node and mesh structure.
     */
    createNodes() {
        var self = this;
        var svgDocument = this.getDocument();
        var nodes = this.meshHolder.getNodes();

        /* create nodes */
        for (var key in nodes) {
            var value = nodes[key];

            var circle = document.createElementNS(self.svgns, 'circle');
            circle.setAttributeNS(null, 'cx', value.posX + 'px');
            circle.setAttributeNS(null, 'cy', value.posY + 'px');
            circle.setAttributeNS(null, 'id', 'node-' + key);
            circle.setAttributeNS(null, 'r', 5);
            circle.setAttributeNS(null, 'style', 'fill: blue; stroke: blue; stroke-width: 1px;');
            svgDocument.appendChild(circle);

            var theText = document.createTextNode(value.name);
            var txtElem = document.createElementNS(self.svgns, 'text');
            txtElem.setAttributeNS(null, 'x', (value.posX - 8) + 'px');
            txtElem.setAttributeNS(null, 'y', (value.posY - 8) + 'px');

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

        for (var key in connections) {
            var distance = connections[key].cost;
            var keySplit = key.split(self.meshHolder.separator);

            var x1 = nodes[keySplit[0]].posX;
            var y1 = nodes[keySplit[0]].posY;
            var x2 = nodes[keySplit[1]].posX;
            var y2 = nodes[keySplit[1]].posY;

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
     */
    printTree(tree) {
        for (var beforePlace in tree) {
            var key = this.meshHolder.getKey(beforePlace, tree[beforePlace]);
            document.getElementById('connection-' + key).setAttribute('stroke', 'red');
        }
    }

    /**
     * Mark the optimal path.
     *
     * @param tree
     * @param targetPlace
     */
    markWayBackFromTarget(tree, targetPlace) {
        var node = targetPlace;

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
