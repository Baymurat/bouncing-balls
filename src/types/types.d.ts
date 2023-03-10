import { Subscription } from "rxjs";

export type Ball = {
  speed: number;
  alpha: number;
  height: number;
  width: number;
  color: string;
  word: string;
  id: number;
}

export type CreateBall = Omit<Ball, "id" | "height">;

export type ResizeEmission = {
  width: number;
  height: number;
}

export type AnimationType = {
  interval: number;
  balls: number;
  size: ResizeEmission;
  state: boolean;
}

export interface Animation {
  startAnimation: () => Subscription;
  pauseAnimation: () => void;
  resumeAnimation: () => void;
  clearDesk: () => void;
  addBall: () => void;
}

export interface IThread {
  start: () => void;
  pause: () => void;
  stop: () => void;
}

type BallRunType = {
  animation: number;
  containerSize: ResizeEmission
}

export type Middleware = { 
  name: string;
  observable: Observable<unknown>
}