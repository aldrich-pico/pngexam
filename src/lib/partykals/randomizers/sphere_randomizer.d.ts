export = SphereRandomizer;
/**
 * Sphere vector randomizer.
 */
declare class SphereRandomizer extends Randomizer {
    /**
     * Create the sphere randomizer from radius and optional scaler.
     */
    constructor(maxRadius: any, minRadius: any, scaler: any, minVector: any, maxVector: any);
    maxRadius: any;
    minRadius: any;
    scaler: any;
    minVector: any;
    maxVector: any;
}
import Randomizer = require("./randomizer");
