import { useEffect } from "react";
import { useCustomRef } from "../../helpers/hooks";
import { useBallsContext } from "../../context/ballsContext";
import BallV2 from "../ball-v2";
import { BallThread } from "../../helpers/thread";
import { resizeHelper } from "../../helpers/resizeHelper";
import styles from "./styles.module.scss";
import { map } from "rxjs/operators";

const Container = () => {
  const [selfRef, setSelfRef] = useCustomRef<HTMLDivElement>();
  const context = useBallsContext();

  useEffect(() => {
    resizeHelper.emmitResize(selfRef);

    const subResize = resizeHelper.windowResize$.pipe(
      map(() => selfRef),
    ).subscribe(resizeHelper.emmitResize);

    return () => {
      subResize.unsubscribe();
    };
  }, [selfRef]);

  return (
    <div ref={setSelfRef} className={styles.ballsContainer}>
      {
        context.balls.map((ball) => (
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
                  observable: resizeHelper.size$
                });
                ballThread.addEventListener("mouseenter", (_, threadSelf) => {
                  threadSelf.stop();
                });
                ballThread.addEventListener("mouseleave", (_, threadSelf) => {
                  threadSelf.start();
                });
                let i = false;
                ballThread.addEventListener("click", (_, threadSelf) => {
                  if (i) {
                    threadSelf.freeze();
                  } else {
                    threadSelf.unFreeze();
                  }
                  i = !i;
                });
                ballThread.start(); 
                context.addThread(ballThread);
              }
            }}
          >
            {ball.word}
          </BallV2>
        ))
      }
    </div>
  );};

export default Container;