import React, { useEffect, PropsWithChildren, useMemo, useState } from "react";
import { Subscription, BehaviorSubject, combineLatest } from "rxjs";
import { filter } from "rxjs/operators";
import { useCustomRef } from "../../helpers/hooks";
import { animationInstance } from "../../helpers/animation";
import styles from "./styles.module.scss";

type Props = PropsWithChildren & React.CSSProperties & { speed: number, alpha: number }

type Coordinates = {
  x: number;
  y: number;
  xD: 1 | -1;
  yD: 1 | -1;
}

const initialCoordinates: Coordinates = {
  x: 0, y: 0, xD: 1, yD: 1
};

const Ball = (props: Props) => {
  const {
    width, height, backgroundColor, speed, alpha, children,
  } = props;

  const [coordinates, setCoordinates] = useState<Coordinates>(initialCoordinates);
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [selfRef, setSelfRef] = useCustomRef<HTMLDivElement>();
  const isPaused$ = useMemo(() => new BehaviorSubject(false), []);

  useEffect(() => {
    const {
      x, y, xD, yD
    } = coordinates;

    let currentX = x;
    let currentY = y;

    let xDirect = xD;
    let yDirect = yD;

    const xOffset = Math.abs(speed * Math.cos(alpha));
    const yOffset = Math.abs(speed * Math.sin(alpha));

    let sub: Subscription;
    if (selfRef) {
      const animation$ = animationInstance.addBall();
      sub = combineLatest({
        animation: animation$,
        isPaused: isPaused$,
      }).pipe(
        filter(({ isPaused }) => !isPaused && !showContextMenu),
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

    return () => {
      setCoordinates({
        x: currentX,
        y: currentY,
        xD: xDirect,
        yD: yDirect
      });
      sub?.unsubscribe();
    };
  }, [selfRef, showContextMenu]);

  return (
    <div
      onMouseEnter={() => isPaused$.next(true)}
      onMouseLeave={() => isPaused$.next(false)}
      onClick={() => setShowContextMenu((prev) => !prev)}
      ref={setSelfRef}
      className={styles.ball}
      style={{
        width, height, backgroundColor,
      }}
    >
      {children}
      {showContextMenu && (
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
