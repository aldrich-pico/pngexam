export = Emitter;
/**
 * Emitter class to determine rate of particles generation.
 */
declare class Emitter {
    /**
     * Create the emitter class.
     * @param {*} options Emitter options.
     * @param {*} options.onSpawnBurst Burst of particles when particle system starts; either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random numbers.
     * @param {*} options.onInterval Burst of particles every interval; either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random numbers.
     * @param {Number} options.interval Spawn interval time, in seconds; either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random numbers.
     * @param {Number} options.detoretingMinTtl If provided and particle system's ttl is below this value, will start emitting less and less until stopping completely.
     */
    constructor(options: any);
    options: any;
    age: number;
    timeToSpawn: number;
    /**
     * Update emitter and return how many particles should be generated this frame.
     */
    update(deltaTime: any, system: any): number;
}
