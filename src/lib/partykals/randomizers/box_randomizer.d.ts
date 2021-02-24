export = BoxRandomizer;
/**
 * Box vector randomizer.
 */
declare class BoxRandomizer extends Randomizer {
    /**
     * Create the box randomizer from min and max vectors to randomize between.
     */
    constructor(min: any, max: any);
    min: any;
    max: any;
}
import Randomizer = require("./randomizer");
