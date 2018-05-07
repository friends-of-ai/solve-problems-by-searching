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
     */
    constructor(meshHolder) {
        super(meshHolder);
        this.name = 'breadthFirstSearch';
    }
}
