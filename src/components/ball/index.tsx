import React, { useEffect, PropsWithChildren, useMemo, useState } from "react";
import { Subscription, BehaviorSubject, combineLatest } from "rxjs";
import { filter } from "rxjs/operators";
import { useCustomRef } from "../../helpers/hooks";
import { animationInstance } from "../../helpers/animation";
import styles from "./styles.module.scss";

type Props = PropsWithChildren & React.CSSProperties & { speed: number, alpha: number }

const Ball = (props: Props) => {
  const {
    width, height, backgroundColor, speed, alpha, children,
  } = props;

  const [st, setSt] = useState<boolean>(false);
  const [selfRef, setSelfRef] = useCustomRef<HTMLDivElement>();
  const isPaused$ = useMemo(() => new BehaviorSubject(false), []);

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;

    let xDirect = 1;
    let yDirect = 1;

    const xOffset = Math.abs(speed * Math.cos(alpha));
    const yOffset = Math.abs(speed * Math.sin(alpha));

    let sub: Subscription;
    if (selfRef) {
      const animation$ = animationInstance.addBall();
      sub = combineLatest({
        animation: animation$,
        isPaused: isPaused$,
      }).pipe(
        filter(({ isPaused }) => !isPaused),
      ).subscribe({
        next: ({ animation: { size } }) => {
          const { width: wm = 500, height: hm } = size;

          currentX += xDirect * xOffset;
          currentY += yDirect * yOffset;

          xDirect = currentX + (width as number) >= wm ? -1 : currentX <= 1 ? 1 : xDirect;
          yDirect = currentY + (height as number) >= hm ? -1 : currentY <= 1 ? 1 : yDirect;

          selfRef.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        },
      });
    }

    return () => sub?.unsubscribe();
  }, [selfRef]);

  console.log(st);

  return (
    <div
      onMouseEnter={() => isPaused$.next(true)}
      onMouseLeave={() => isPaused$.next(false)}
      onClick={() => setSt((prev) => !prev)}
      ref={setSelfRef}
      className={styles.ball}
      style={{
        width, height, backgroundColor,
      }}
    >
      {children}
      {st && (
        <div>
          <ul>
            <li>a</li>
            <li>a</li>
            <li>a</li>
            <li>a</li>
            <li>a</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Ball;
