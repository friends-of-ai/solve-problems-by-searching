/**
 * Greedy search class
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-08)
 */
class greedySearch extends Search {

    /**
     * The greedySearch constructor. Calls the constructor of extende Search class.
     *
     * @param meshHolder
     */
    constructor(meshHolder) {
        super(meshHolder);
        this.name = 'greedySearch';
    }
}
