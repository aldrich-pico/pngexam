export const ParticlesSystem: typeof import("./particles_system");
export const Particle: typeof import("./particle");
export const Emitter: typeof import("./emitter");
export const Utils: {
    getRandomBetween: (min: any, max: any) => any;
    getRandomWithSpread: (baseVal: any, extraRandom: any) => any;
    getRandomColorBetween: (colMin: any, colMax: any) => any;
    getRandomVectorBetween: (vecMin: any, vecMax: any) => any;
    lerpColors: (colA: any, colB: any, alpha: any) => any;
    lerp: (x: any, y: any, alpha: any) => number;
    randomizerOrValue: (val: any) => any;
};
export const Randomizers: {
    Randomizer: typeof import("./randomizers/randomizer");
    BoxRandomizer: typeof import("./randomizers/box_randomizer");
    SphereRandomizer: typeof import("./randomizers/sphere_randomizer");
    ColorsRandomizer: typeof import("./randomizers/colors_randomizer");
    MinMaxRandomizer: typeof import("./randomizers/minmax_randomizer");
};
export as namespace Partykals;