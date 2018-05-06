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
     * @param svgBuilderInstance
     * @param startNodeId
     * @param targetNodeId
     */
    constructor(meshHolderInstance, svgBuilderInstance, startNodeId, targetNodeId) {

        /* do not instantiate this class directly  */
        if (this.constructor.name === 'Search') {
            throw new Error('Cannot instanciate abstract class');
        }

        /* check the given parameter */
        if (!(meshHolderInstance instanceof meshHolder)) {
            throw new Error('The given parameter meshHolderInstance must be an instance of meshHolder.');
        }
        if (!(svgBuilderInstance instanceof svgBuilder)) {
            throw new Error('The given parameter svgBuilderInstance must be an instance of svgBuilder.');
        }

        this.meshHolder = meshHolderInstance;
        this.svgBuilder = svgBuilderInstance;

        this.startNodeId = startNodeId;
        this.targetNodeId = targetNodeId;
    }

    /**
     * Abstract method.
     *
     * @param startPlace
     * @param targetPlace
     */
    calculateTree(startPlace, targetPlace) {
        throw new Error('Cannot call abstract method');
    }

    /**
     * Abstract method. The cost function.
     *
     * @param currentNode
     * @param nextNode
     * @param connection
     */
    costFunction(currentNode, nextNode, connection) {
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
     * @param connection
     */
    heuristicFunction(currentNode, nextNode, connection) {
        throw new Error('Cannot call abstract method');
    }

    /**
     * Calculate and redraw the tree.
     *
     * @param firstCall
     */
    calculateTreeAndRedraw(firstCall) {
        var startNode = document.getElementById(this.startNodeId).value;
        var targetNode = document.getElementById(this.targetNodeId).value;

        if (firstCall) {
            /* create the nodes and the mesh */
            this.svgBuilder.createMeshAndNodes();
        }

        var tree = this.calculateTree(startNode, targetNode);

        /* redraw the mesh */
        this.svgBuilder.redraw(tree, targetNode);
    }
}
