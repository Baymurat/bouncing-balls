import { interval, animationFrameScheduler, combineLatest, Observable, Subject, BehaviorSubject } from "rxjs";
import { filter, scan, tap } from "rxjs/operators";
import { Animation, AnimationType } from "../types/types";
import { resizeHelper } from "./resizeHelper";

class BallsAnimation implements Animation {
  private _animation$!: Observable<AnimationType>;

  private _broadcastAnimation!: Subject<AnimationType>;

  private _addBall$!: Subject<number>;

  private _interval$!: Observable<number>;

  private _animationState$!: Subject<boolean>;

  private static _instance: BallsAnimation | null = null;

  private constructor() {
    this._interval$ = interval(0, animationFrameScheduler);
    this._addBall$ = new Subject();
    this._broadcastAnimation = new Subject();
    this._animationState$ = new BehaviorSubject(true);

    this._animation$ = combineLatest({
      interval: this._interval$,
      balls: this._addBall$.pipe(
        scan((acc, curr) => (curr === 0 ? 0 : acc + curr), 0),
      ),
      size: resizeHelper.size$,
      state: this._animationState$,
    }).pipe(
      filter(({ state }) => state),
      filter(({ balls }) => balls > 0),
    );
  }

  static getInstance() {
    if (this._instance === null) {
      this._instance = new BallsAnimation();
    }

    return this._instance;
  }

  startAnimation() {
    return this._animation$.subscribe(this._broadcastAnimation);
  }

  pauseAnimation() {
    this._animationState$.next(false);
  }

  resumeAnimation() {
    this._animationState$.next(true);
  }

  clearDesk() {
    this._addBall$.next(0);
  }

  addBall() {
    this._addBall$.next(1);
    return this._broadcastAnimation.asObservable();
  }
}

export const animationInstance = BallsAnimation.getInstance();
