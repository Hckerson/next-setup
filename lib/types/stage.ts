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
}

export interface StageContext {
    actors: Record<string, ActorHandle>;
    variants: Record<string, Color>;
    mass: MassTokens;
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
    | { verb: "travel"; actor: string; path: Waypoint[]; bank: number }
    | { verb: "lift"; actor: string; from: number; height: number }
    | { verb: "land"; actor: string; from: number; surface: number }
    | {
          verb: "recolour";
          actor: string;
          from: string;
          to: string;
          wipe: WipeDirection;
      }
    | { verb: "rotate"; actor: string; axis: Axis; degrees: number }
    | { verb: "scale"; actor: string; to: number }
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
    tone?: string;
    moves: MoveCue[];
}

export interface Script {
    shots: Shot[];
    length: number;
    peak: string;
}
