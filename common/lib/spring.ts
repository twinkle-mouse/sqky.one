export function springStep(pos: number, velocity: number, target: number, mass: number, stiffness: number, damping: number, dT: number) {
    const F_spring = -stiffness * (pos - target);

    const F_damp = -damping * velocity;

    const a = (F_spring + F_damp) / mass;

    const newVel = velocity + a * dT;

    const newPos = pos + newVel * dT;

    return { pos: newPos, velocity: newVel };
}
