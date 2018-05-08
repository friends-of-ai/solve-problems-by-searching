/**
 * Abstract Search class.
 * You have to add the calculateTree algorithm first before use.
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-01)
 */
class Search {

    /**
     * The constructor of abstract Search class.
     *
     * @param meshHolderInstance
     */
    constructor(meshHolderInstance) {

        /* do not instantiate this class directly  */
        if (this.constructor.name === 'Search') {
            throw new Error('Cannot instanciate abstract class');
        }

        /* check the given parameter */
        if (!(meshHolderInstance instanceof meshHolder)) {
            throw new Error('The given parameter meshHolderInstance must be an instance of meshHolder.');
        }

        this.meshHolder = meshHolderInstance;
    }

    /**
     * Abstract method. The cost function.
     *
     * @param currentNode
     * @param nextNode
     * @param targetNode
     * @param connection
     */
    costFunction(currentNode, nextNode, targetNode, connection) {
        throw new Error('Cannot call abstract method');
    }

    /**
     * Method to add the cost function.
     *
     * @param costFunction
     */
    addCostFunction(costFunction) {
        if (typeof costFunction !== 'function') {
            throw new Error('The parameter costFunction from the method addCostFunction must be a function.');
        }

        this.costFunction = costFunction;
    }

    /**
     * Abstract method. The heuristic function
     *
     * @param currentNode
     * @param nextNode
     * @param targetNode
     * @param connection
     */
    heuristicFunction(currentNode, nextNode, targetNode, connection) {
        throw new Error('Cannot call abstract method');
    }

    /**
     * Method to add the cost function.
     *
     * @param costFunction
     */
    addHeuristicFunction(heuristicFunction) {
        if (typeof heuristicFunction !== 'function') {
            throw new Error('The parameter heuristicFunction from the method addHeuristicFunction must be a function.');
        }

        this.heuristicFunction = heuristicFunction;
    }

    /**
     * Add the algorithm to calculate the tree.
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

                /* add current cost */
                var cost = currentPlace[0];

                /* add cost (breadthFirstSearch and aStarSearch) */
                if (['breadthFirstSearch', 'aStarSearch'].indexOf(this.name) !== -1) {
                    cost += this.costFunction(
                        self.meshHolder.nodes[currentPlace[1]],
                        self.meshHolder.nodes[node],
                        self.meshHolder.nodes[targetNode],
                        self.meshHolder.getConnection(key)
                    );
                }

                /* add heuristic cost (greedySearch and aStarSearch) */
                if (['greedySearch', 'aStarSearch'].indexOf(this.name) !== -1) {
                    cost += this.heuristicFunction(
                        self.meshHolder.nodes[currentPlace[1]],
                        self.meshHolder.nodes[node],
                        self.meshHolder.nodes[targetNode],
                        self.meshHolder.getConnection(key)
                    );
                }

                /* if we have already reached this node and the costs to this node are lower than the current cost:
                 * stop here (avoid loops)
                 */
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

    /**
     * Returns the optimal way (the nodes of the way).
     *
     * @param tree
     * @param targetPlace
     */
    getOptimalWay(tree, targetPlace) {
        var node = targetPlace;

        var resultNodes = [node];

        while (true) {
            if (typeof tree[node] === 'undefined') {
                break;
            }

            node = tree[node];

            resultNodes.push(node);
        }

        resultNodes.reverse();

        var optimalWay = [];

        for (var i = 0; i < resultNodes.length; i++) {
            optimalWay.push(this.meshHolder.nodes[resultNodes[i]]);
        }

        return optimalWay;
    }
}
