import type { Color, Vector3 } from "three";

export interface Waypoint {
    x: number;
    y: number;
    z: number;
}

export type WipeDirection = "up" | "down" | "left" | "right" | "radial";

export type Axis = "x" | "y" | "z";

export interface MassTokens {
    anticipation: number;
    damping: number;
    frequency: number;
}

export interface ActorHandle {
    position: Vector3;
    rotation: Vector3;
    scale: { value: number };
    presence: { value: number };
    tint: { from: Color; to: Color; mix: number; wipe: WipeDirection };
    drawn: Record<string, { value: number }>;
    hinges: { angles: number[] };
    solid: { value: number };
}

export interface ActorParts {
    layers?: string[];
    hinges?: number;
}

export interface SimulationHandle {
    progress: { value: number };
}

export interface StageContext {
    actors: Record<string, ActorHandle>;
    variants: Record<string, Color>;
    mass: MassTokens;
    simulations?: Record<string, SimulationHandle>;
}

export interface BakedRigid {
    rate: number;
    frames: number;
    bodies: number;
    data: Float32Array;
}

export type Move =
    | { verb: "enter"; actor: string; from: Waypoint; to: Waypoint }
    | { verb: "exit"; actor: string; from: Waypoint; to: Waypoint }
    | {
          verb: "swap";
          outgoing: { actor: string; to: Waypoint };
          incoming: { actor: string; from: Waypoint; to: Waypoint };
          overlap: number;
      }
    | { verb: "travel"; actor: string; path: Waypoint[]; bank: number; face?: boolean }
    | { verb: "lift"; actor: string; from: number; height: number }
    | { verb: "land"; actor: string; from: number; surface: number }
    | {
          verb: "recolour";
          actor: string;
          from: string;
          to: string;
          wipe: WipeDirection;
      }
    | { verb: "rotate"; actor: string; axis: Axis; degrees: number; from?: number }
    | { verb: "scale"; actor: string; to: number }
    | { verb: "simulate"; simulation: string; from: number; to: number }
    | { verb: "draw"; actor: string; layer: string; from: number; to: number }
    | { verb: "fold"; actor: string; from: number[]; to: number[] }
    | { verb: "resolve"; actor: string; from: number; to: number }
    | { verb: "hold" };

export interface MoveCue {
    move: Move;
    at: number;
    length: number;
}

export interface Tone {
    ground: Color;
    ink: Color;
}

export interface Shot {
    id: string;
    at: number;
    length: number;
    camera: string;
    copy?: boolean;
    copyAt?: number;
    tone?: string;
    moves: MoveCue[];
}

export interface Script {
    shots: Shot[];
    length: number;
    peak: string;
}
