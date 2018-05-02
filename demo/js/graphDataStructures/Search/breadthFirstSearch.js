/**
 * Breadth first search class
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-01)
 */
class breadthFirstSearch extends Search {

    /**
     * The breadthFirstSearch constructor. Calls the constructor of extende Search class.
     *
     * @param meshHolder
     * @param svgBuilder
     * @param startNodeId
     * @param targetNodeId
     */
    constructor(meshHolder, svgBuilder, startNodeId, targetNodeId) {
        super(meshHolder, svgBuilder, startNodeId, targetNodeId);
        this.name = 'breadthFirstSearch';
    }

    /**
     * Abstract method: Add the algorithm to calculate the tree.
     *
     * @param startNode
     * @param targetNode
     */
    calculateTree(startNode, targetNode) {
        var tree         = {};
        var currentCosts = {};
        var currentList  = [[0, startNode]];
        var self         = this;
        var mesh         = this.meshHolder.getMesh();

        currentCosts[startNode] = 0;

        /* the Breadth-first Search - Search with Costs algorithm */
        while (true) {
            var currentPlace = currentList.shift();

            /* the target place was found */
            if (currentPlace[1] === targetNode) {
                break;
            }

            /* add the new nodes connected to currentPlace */
            for (var i = 0; i < mesh[currentPlace[1]].length; i++) {
                var node = mesh[currentPlace[1]][i];
                var key  = self.meshHolder.getKey(currentPlace[1], node);
                var cost = self.meshHolder.getConnection(key).cost + currentPlace[0];
                if ((node in currentCosts) && currentCosts[node] < cost) {
                    continue;
                }
                currentList.push([cost, node]);
                currentCosts[node] = cost;

                tree[node] = currentPlace[1];
            }

            /* sort the FIFO list */
            currentList.sort(function (a, b) {
                return a[0] - b[0];
            });
        }

        return tree;
    }
}
