export = ParticlesSystem;
/**
 * Particles system.
 */
declare class ParticlesSystem {
    /**
     * Create particles system.
     * @param {*} options Particles options.
     * @param {THREE.Object3D} options.container Container to add particles system to.
     *
     * // PARTICLES OPTIONS
     * ============================================================================
     * @param {*} options.particles Particle-related options.
     *
     * // PARTICLES TTL
     * @param {Number} options.particles.ttl How long, in seconds, every particle lives.
     * @param {Number} options.particles.ttlExtra If provided, will add random numbers from 0 to ttlExtra to particle's ttl.
     *
     * // PARTICLES FADING / ALPHA
     * @param {Boolean} options.particles.alpha Per-particle constant alpha; either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random values.
     * @param {Number} options.particles.startAlpha Particles starting opacity; either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random values.
     * @param {Number} options.particles.endAlpha Particles ending opacity; either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random values.
     * @param {Number} options.particles.startAlphaChangeAt Will only start shifting alpha when age is over this value; either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random values.
     *
     * // PARTICLES GROWING / SIZE
     * @param {Number} options.particles.size Per-particle constant size; either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random values.
     * @param {Number} options.particles.startSize Particles starting size; either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random values.
     * @param {Number} options.particles.endSize Particles ending size; either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random values.
     * @param {Number} options.particles.startSizeChangeAt Will only start shifting size when age is over this value; either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random values.
     *
     * // PARTICLES COLORING
     * @param {THREE.Color} options.particles.color Per-particle constant color; either a constant value (THREE.Color) or a Partykals.Randomizers.Randomizer instance to create random values.
     * @param {THREE.Color} options.particles.startColor Starting color min value; either a constant value (THREE.Color) or a Partykals.Randomizers.Randomizer instance to create random values.
     * @param {THREE.Color} options.particles.endColor Ending color min value; either a constant value (THREE.Color) or a Partykals.Randomizers.Randomizer instance to create random values.
     * @param {Number} options.particles.startColorChangeAt Will only start shifting color when age is over this value; either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random values.
     *
     * // PARTICLES ACCELERATION
     * @param {THREE.Vector3} options.particles.acceleration Particles acceleration; either a constant value (THREE.Vector3) or a Partykals.Randomizers.Randomizer instance to create random values.
     * @param {Number} options.particles.gravity Gravity force affecting the particles.
     *
     * // PARTICLES ROTATION
     * @param {Number} options.particles.rotation Per-particle rotation (only works with texture); either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random values.
     * @param {Number} options.particles.rotationSpeed Particles rotation speed (only works with texture); either a constant value (Number) or a Partykals.Randomizers.Randomizer instance to create random values.
     *
     * // PARTICLES VELOCITY
     * @param {*} options.particles.velocity Particles starting velocity; either a constant value (THREE.Vector3) or a Partykals.Randomizers.Randomizer instance to create random values.
     * @param {THREE.Vector3} options.particles.velocityBonus Velocity value to add to all particles after randomizing velocity.
     *
     * // PARTICLES OFFSET
     * @param {THREE.Vector3} options.particles.offset Particles offset from system's center; either a constant value (THREE.Vector3) or a Partykals.Randomizers.Randomizer instance to create random values.
     *
     * // PARTICLE GLOBALS
     * @param {Boolean} options.particles.worldPosition If true, particles will maintain their world position after spawn even if the system moves.
     * @param {Number} options.particles.globalSize Const size for all particles. Note: this is more efficient than setting per-particle size property.
     * @param {Number} options.particles.globalColor Global color to affect all particles. Note: this is more efficient than setting per-particle color property.
     * @param {String} options.particles.blending Particles blending mode (opaque / blend / additive).
     * @param {THREE.Texture} options.particles.texture Particle's texture to use.
     *
     * // CUSTOM CALLBACKS
     * @param {Function} options.particles.onUpdate Optional method to call per-particle every update frame.
     * @param {Function} options.particles.onSpawn Optional method to call per-particle every time a particle spawns (after everything is set).
     *
     * // SYSTEM OPTIONS
     * ============================================================================
     * @param {*} options.system System-related options.
     * @param {Number} options.system.particlesCount Particles count.
     * @param {Number} options.system.ttl How long, in seconds, the particle system lives.
     * @param {Number} options.system.speed Speed factor to affect all particles and emitting. Note: the only thing this don't affect is system's ttl.
     * @param {Function} options.system.onUpdate Optional method to call every update frame.
     * @param {Partykals.Emitter} options.system.emitters A single emitter or a list of emitters to attach to this system.
     * @param {Boolean} options.system.perspective If true, will scale particles based on distance from camera.
     * @param {Number} options.system.scale Overall system scale when in perspective mode (if perspective=false, will be ignored). A good value is between 400 and 600.
     * @param {Boolean} options.system.depthWrite Should we perform depth write? (default to true).
     * @param {Boolean} options.system.depthTest Should we perform depth test? (default to true).
     */
    constructor(options: any);
    options: any;
    _emitters: any[];
    particlesGeometry: globalThis.THREE.BufferGeometry;
    material: ParticlesMaterial;
    speed: any;
    _aliveParticles: any[];
    _deadParticles: Particle[];
    particleSystem: globalThis.THREE.Points;
    _positionDirty: boolean;
    _colorsDirty: boolean;
    _alphaDirty: boolean;
    _rotateDirty: boolean;
    /**
     * Add emitter to this particles system.
     */
    addEmitter(emitter: any): void;
    /**
     * Dispose the entire system.
     */
    dispose(): void;
    /**
     * Return true when ttl is expired and there are no more alive particles in system.
     */
    get finished(): boolean;
    /**
     * Get if this system's ttl is expired.
     */
    get ttlExpired(): boolean;
    /**
     * Reset particles system ttl.
     */
    reset(): void;
    ttl: any;
    age: number | undefined;
    _timeToUpdateBS: number | undefined;
    /**
     * Get system's world position.
     */
    getWorldPosition(): globalThis.THREE.Vector3;
    /**
     * Add the particles system to scene or container.
     * @param {THREE.Object3D} container Container to add system to.
     */
    addTo(container: any): void;
    /**
     * Set a particle's color value.
     */
    setColor(index: any, color: any): void;
    /**
     * Set a particle's position.
     */
    setPosition(index: any, position: any): void;
    /**
     * Set particle's alpha.
     */
    setAlpha(index: any, value: any): void;
    /**
     * Set particle's rotation.
     */
    setRotation(index: any, value: any): void;
    /**
     * Set particle's size.
     */
    setSize(index: any, value: any): void;
    _sizeDirty: boolean | undefined;
    /**
     * Get how many particles this system currently shows.
     */
    get particlesCount(): number;
    /**
     * Get max particles count.
     */
    get maxParticlesCount(): number;
    /**
     * If ttl is expired and there are no more alive particles, remove system and dispose it.
     * @returns True if removed & disposed, false if still alive.
     */
    removeAndDisposeIfFinished(): boolean;
    /**
     * Update particles system.
     */
    update(deltaTime: any): void;
    _lastTime: number | undefined;
    dt: any;
    _needBoundingSphereUpdate: any;
    /**
     * Spawn particles.
     * @param {Number} quantity Number of particles to spawn. If exceed max available particles in system, skip.
     */
    spawnParticles(quantity: number): void;
    /**
     * Remove particles system from its parent.
     */
    removeSelf(): void;
}
declare namespace ParticlesSystem {
    const defaultRenderOrder: any;
}
import ParticlesMaterial = require("./material/material");
import Particle = require("./particle");
