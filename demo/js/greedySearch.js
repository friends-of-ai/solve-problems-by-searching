var searchAlgorithm = function (mh) {
    /* initialize the breadth first search class */
    var sa = new greedySearch(mh);

    /* add the cost functions */
    sa.addHeuristicFunction(function (currentNode, nextNode, targetNode, connection) {
        return distance.fromLatLonInKm(currentNode.x, currentNode.y, targetNode.x, targetNode.y);
    });

    return sa;
};