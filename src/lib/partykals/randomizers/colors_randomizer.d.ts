export = ColorsRandomizer;
/**
 * Box vector randomizer.
 */
declare class ColorsRandomizer extends Randomizer {
    /**
     * Create the box randomizer from min and max colors to randomize between.
     */
    constructor(min: any, max: any);
    min: any;
    max: any;
}
import Randomizer = require("./randomizer");
