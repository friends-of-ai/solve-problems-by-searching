var searchAlgorithm = function (mh) {
    /* initialize the breadth first search class */
    var sa = new aStarSearch(mh);

    /* add the cost functions */
    sa.addCostFunction(function (currentNode, nextNode, targetNode, connection) {
        return connection.cost;
    });
    sa.addHeuristicFunction(function (currentNode, nextNode, targetNode, connection) {
        return distance.fromLatLonInKm(currentNode.x, currentNode.y, targetNode.x, targetNode.y);
    });

    return sa;
};