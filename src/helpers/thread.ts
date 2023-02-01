import { Ball as BallType, IThread, BallRunType } from "../types/types";
import { combineLatest, interval, Subject, takeUntil, animationFrameScheduler } from "rxjs";
import { resizeHelper } from "./resizeHelper";

abstract class Thread implements IThread {
  private static _animationInterval$ = interval(0, animationFrameScheduler);
  protected static _broadcast: Subject<number> = new Subject();
  static {
    Thread._animationInterval$.subscribe(Thread._broadcast);
  }

  private stop$!: Subject<boolean>;

  constructor() {
    this.stop$ = new Subject<boolean>();
  }

  public abstract run(context: unknown): void;

  start() {
    Thread._broadcast.pipe(
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

  public run(context: BallRunType) {
    const { containerSize } = context;
    
    const { width: containerWidth = 500, height: containerHeight } = containerSize;
    const { width: ballWidth, height: ballHeight } = this.ball;

    this.x += this.xD * this.xOffset;
    this.y += this.yD * this.yOffset;

    this.xD = this.x + (ballWidth as number) >= containerWidth ? -1 : this.x <= 1 ? 1 : this.xD;
    this.yD = this.y + (ballHeight as number) >= containerHeight ? -1 : this.y <= 1 ? 1 : this.yD;

    this.ballDiv.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
  }

  public start() {
    combineLatest({
      animation: BallThread._broadcast,
      containerSize: resizeHelper.size$
    }).subscribe({
      next: (v) => this.run(v)
    });
  }
}
export { Thread, BallThread };