var searchAlgorithm = function (mh) {
    /* initialize the breadth first search class */
    var sa = new breadthFirstSearch(mh);

    /* add the cost functions */
    sa.addCostFunction(function (currentNode, nextNode, targetNode, connection) {
        return connection.cost;
    });

    return sa;
};