export = Particle;
/**
 * A single particle metadata in the particles system.
 * We attach this to the particle's vertices when in system's geometry.
 */
declare class Particle {
    /**
     * Create the particle.
     * @param {ParticlesSystem} system The particles system this particle belongs to.
     */
    constructor(system: any);
    system: any;
    /**
     * Reset the particle.
     */
    reset(): void;
    age: number | undefined;
    finished: boolean | undefined;
    gravity: any;
    velocity: any;
    acceleration: any;
    position: any;
    ttl: any;
    alpha: any;
    startAlpha: any;
    endAlpha: any;
    startAlphaChangeAt: number | undefined;
    colorize: boolean | undefined;
    color: any;
    startColor: any;
    endColor: any;
    startColorChangeAt: number | undefined;
    size: any;
    startSize: any;
    endSize: any;
    startSizeChangeAt: number | undefined;
    rotation: any;
    rotationSpeed: any;
    startWorldPosition: any;
    onUpdate: any;
    /**
     * Update the particle (call this every frame).
     * @param {*} index Particle index in system.
     * @param {*} deltaTime Update delta time.
     */
    update(index: any, deltaTime: any): void;
    /**
     * Get particle's world position.
     */
    get worldPosition(): any;
}
