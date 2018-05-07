/**
 * A class do some html select stuff.
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-08)
 */
class selectHelper {

    /**
     * The constructor of the meshHolder.
     */
    constructor(meshHolderInstance) {

        /* check the given parameter */
        if (!(meshHolderInstance instanceof meshHolder)) {
            throw new Error('The given parameter meshHolderInstance must be an instance of meshHolder.');
        }

        this.meshHolder = meshHolderInstance;
    }

    /**
     * Adds options to given select-tag (from this nodes list).
     *
     * @param selectId
     * @param selected
     * @param changeFunc
     */
    addSelectOptions(selectId, selected, changeFunc) {
        var sorted        = Object.keys(this.meshHolder.nodes).sort();
        var selectTag     = document.getElementById(selectId);
        var selectedIndex = 0;

        /* create all options to select tag */
        for (var i = 0; i < sorted.length; i++) {
            var option = document.createElement('option');
            option.value = sorted[i];
            option.text = this.meshHolder.nodes[sorted[i]].name;

            if (sorted[i] === selected) {
                selectedIndex = i;
            }

            selectTag.add(option);
        }

        /* set selected option */
        selectTag.selectedIndex = selectedIndex;

        if (typeof changeFunc === 'function') {
            document.getElementById(selectId).onchange = changeFunc;
        }
    }
}
