import { Ball as BallType, IThread, BallRunType, Middleware } from "../types/types";
import { combineLatest, interval, Subject, takeUntil, animationFrameScheduler } from "rxjs";

abstract class Thread implements IThread {
  private static _animationInterval$ = interval(0, animationFrameScheduler);
  private _middlewares: Middleware[];
  private _isStarted: boolean;

  protected static _broadcast: Subject<number> = new Subject();
  static {
    Thread._animationInterval$.subscribe(Thread._broadcast);
  }

  protected stop$!: Subject<boolean>;

  constructor() {
    this.stop$ = new Subject<boolean>();
    this._middlewares = [];
    this._isStarted = false;
  }

  public abstract run(context: unknown): void;

  start() {
    if (this._isStarted) {
      return;
    }

    this._isStarted = true;

    const middlewares = this._middlewares
      .reduce((acc, { name, observable }) => ({ ...acc, [name]: observable }), {});

    combineLatest({
      animation: Thread._broadcast,
      ...middlewares
    }).pipe(
      takeUntil(this.stop$)
    ).subscribe({
      next: (v) => this.run(v)
    });
  }

  addMiddleware(middleware: Middleware) {
    this._middlewares.push(middleware);
  }

  pause() {
    // 
  }

  stop() {
    this._isStarted = false;
    this.stop$.next(true);
  }
}

class BallThread extends Thread {
  private ballDiv: HTMLDivElement;
  private ball: BallType;
  private isFreezed: boolean;

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
    this.isFreezed = false;
  }

  public run(context: BallRunType) {
    if (this.isFreezed) { 
      return;
    }

    const { containerSize } = context;
    
    const { width: containerWidth, height: containerHeight } = containerSize;
    const { width: ballWidth, height: ballHeight } = this.ball;

    this.x += this.xD * this.xOffset;
    this.y += this.yD * this.yOffset;

    this.xD = this.x + (ballWidth as number) >= containerWidth ? -1 : this.x <= 1 ? 1 : this.xD;
    this.yD = this.y + (ballHeight as number) >= containerHeight ? -1 : this.y <= 1 ? 1 : this.yD;

    this.ballDiv.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
  }

  freeze() {
    this.isFreezed = true;
    this.stop();
  }

  unFreeze() {
    this.isFreezed = false;
    this.start();
  }

  addEventListener(
    eventName: keyof HTMLElementEventMap, 
    callback: (divElement: HTMLDivElement, threadSelf: BallThread) => void
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const threadSelf = this;
    this.ballDiv.addEventListener(eventName, function() {
      callback(this, threadSelf);
    });
  }
}

export { Thread, BallThread };