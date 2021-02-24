export = ParticlesMaterial;
/**
 * Material for particles.
 */
declare class ParticlesMaterial {
    /**
     * Create the particles material.
     * @param {*} options Material options.
     * @param {Number} options.color Material general color.
     * @param {Boolean} options.transparent Should we support transparency?
     * @param {THREE.Blending} options.blending Blending mode.
     * @param {THREE.Texture} options.map Texture to use.
     * @param {Boolean} options.perspective If true, will scale particles based on distance from camera.
     * @param {Boolean} options.perParticleColor If true, will allow per-particle colors.
     * @param {Boolean} options.perParticleRotation If true, will allow per-particle rotation.
     * @param {Number} options.constSize If exist, will set const size to all particles.
     * @param {Boolean} options.alphaTest If true, will perform alpha test and discard transparent pixels.
     * @param {Boolean} options.depthWrite If true, will perform depth write.
     * @param {Boolean} options.depthTest If true, will perform depth test.
     */
    constructor(options: any);
    options: any;
    material: globalThis.THREE.ShaderMaterial;
    /**
     * Dispose the material.
     */
    dispose(): void;
    /**
     * Set unified scale for all particles.
     */
    setBaseScale(val: any): void;
}
