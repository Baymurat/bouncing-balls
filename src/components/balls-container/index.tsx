import React, { useEffect, useState } from "react";
import { map } from "rxjs/operators";
import styles from "./styles.module.scss";
import { resizeHelper } from "../../helpers/resizeHelper";
import { generateRandomBall } from "../../helpers/generateBall";
import { useCustomRef } from "../../helpers/hooks";
import { Ball as BallType } from "../../types/types";
import { animationInstance } from "../../helpers/animation";
import BallV2 from "../ball-v2";
import { BallThread, Thread } from "../../helpers/thread";

const BallsContainer = () => {
  const [balls, setBalls] = useState<BallType[]>([]);
  const [selfRef, setSelfRef] = useCustomRef<HTMLDivElement>();
  const [threadPool, addThread] = useState<Thread[]>([]);

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
          threadPool.forEach((thread) => thread.stop());
        }}
        type="button"
      >
        Pause
      </button>
      <button
        onClick={() => {
          threadPool.forEach((thread) => thread.start());
        }}
        type="button"
      >
        Resume
      </button>
      <button
        onClick={() => {
          setBalls([]);
          threadPool.forEach((thread) => thread.stop());
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
                  const ballThread = new BallThread(ref, ball);
                  ballThread.addMiddleware({
                    name: "containerSize",
                    observable:  resizeHelper.size$
                  });
                  ballThread.addEventListener("mouseenter", (_, threadSelf) => {
                    threadSelf.stop();
                  });
                  ballThread.addEventListener("mouseleave", (_, threadSelf) => {
                    threadSelf.start();
                  });
                  ballThread.start(); 
                  addThread((threads) => [...threads, ballThread]);
                  return ballThread;
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
