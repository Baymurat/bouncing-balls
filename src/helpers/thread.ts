import { Ball as BallType, IThread } from "../types/types";
import { interval, Subject, takeUntil, animationFrameScheduler } from "rxjs";

const interval$ = interval(0, animationFrameScheduler);
const _broadcast: Subject<number> = new Subject();

interval$.subscribe(_broadcast);

abstract class Thread implements IThread {
  private interval$ = interval$;
  private stop$!: Subject<boolean>;
  private _broadcast: Subject<number> = _broadcast;

  constructor() {
    this.stop$ = new Subject<boolean>();
  }

  public abstract run: () => void;

  start() {
    this._broadcast.pipe(
      takeUntil(this.stop$)
    ).subscribe(this.run);
  }

  pause() {
    // 
  }

  stop() {
    this.stop$.next(true);
  }
}

class BallThread extends Thread {
  private ballDiv: HTMLDivElement;
  private ball: BallType;

  private xOffset: number;
  private yOffset: number;
  private x: number;
  private y: number;
  private xD: 1 | -1;
  private yD: 1 | -1;

  constructor(ballDiv: HTMLDivElement, ball: BallType) {
    super();
    this.ballDiv = ballDiv;
    this.ball = ball;

    this.xOffset = Math.abs(ball.speed * Math.cos(ball.alpha));
    this.yOffset = Math.abs(ball.speed * Math.sin(ball.alpha));
    this.x = 0;
    this.y = 0;
    this.xD = 1;
    this.yD = 1;
  }

  public run = () => {
    const {width, height} = this.ball;

    const size = { width: 500, height: 500 };
    const { width: wm = 500, height: hm } = size;

    this.x += this.xD * this.xOffset;
    this.y += this.yD * this.yOffset;

    this.xD = this.x + (width as number) >= wm ? -1 : this.x <= 1 ? 1 : this.xD;
    this.yD = this.y + (height as number) >= hm ? -1 : this.y <= 1 ? 1 : this.yD;
          
    this.ballDiv.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
  };

}
export { Thread, BallThread };