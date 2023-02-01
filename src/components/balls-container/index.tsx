import React, { useEffect, useState } from "react";
import { map } from "rxjs/operators";
import styles from "./styles.module.scss";
import { resizeHelper } from "../../helpers/resizeHelper";
import { generateRandomBall } from "../../helpers/generateBall";
import { useCustomRef } from "../../helpers/hooks";
import { Ball as BallType } from "../../types/types";
import { animationInstance } from "../../helpers/animation";
import BallV2 from "../ball-v2";
import { BallThread } from "../../helpers/thread";

const BallsContainer = () => {
  const [balls, setBalls] = useState<BallType[]>([]);
  const [selfRef, setSelfRef] = useCustomRef<HTMLDivElement>();

  useEffect(() => {
    resizeHelper.emmitResize(selfRef);

    const subResize = resizeHelper.windowResize$.pipe(
      map(() => selfRef),
    ).subscribe(resizeHelper.emmitResize);

    const subAnimation = animationInstance.startAnimation();

    return () => {
      subResize.unsubscribe();
      subAnimation.unsubscribe();
    };
  }, [selfRef]);

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          const ball = generateRandomBall();
          setBalls((prev) => [...prev, ball]);
        }}
        type="button"
      >
        Add random ball
      </button>
      <button
        onClick={() => {
          animationInstance.pauseAnimation();
        }}
        type="button"
      >
        Pause
      </button>
      <button
        onClick={() => {
          animationInstance.resumeAnimation();
        }}
        type="button"
      >
        Resume
      </button>
      <button
        onClick={() => {
          setBalls([]);
          animationInstance.clearDesk();
        }}
        type="button"
      >
        Clear desk
      </button>

      <div ref={setSelfRef} className={styles.ballsContainer}>
        {
          balls.map((ball) => (
            <BallV2
              key={ball.id}
              width={ball.width}
              height={ball.height}
              backgroundColor={ball.color}
              onMount={(ref) => {
                if (ref) {
                  new BallThread(ref, ball).start();
                }
              }}
            >
              {ball.word}
            </BallV2>
          ))
        }
      </div>
    </div>
  );
};

export default BallsContainer;
