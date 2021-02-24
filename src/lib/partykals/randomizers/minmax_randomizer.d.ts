export = MinMaxRandomizer;
/**
 * Min-Max number randomizer.
 */
declare class MinMaxRandomizer extends Randomizer {
    /**
     * Create the min-max randomizer from min and max.
     */
    constructor(min: any, max: any);
    min: any;
    max: any;
}
import Randomizer = require("./randomizer");
