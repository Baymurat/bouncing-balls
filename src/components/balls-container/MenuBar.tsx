import { useBallsContext } from "../../context/ballsContext";
import { generateRandomBall } from "../../helpers/generateBall";

const Menubar = () => {
  const context = useBallsContext();
  
  return (
    <div>
      <button
        onClick={() => {
          const ball = generateRandomBall();
          context.addBall(ball);
        }}
        type="button"
      >
        Add random ball
      </button>
      <button
        onClick={() => {
          context.threads.forEach((thread) => thread.stop());
        }}
        type="button"
      >
        Pause
      </button>
      <button
        onClick={() => {
          context.threads.forEach((thread) => thread.start());
        }}
        type="button"
      >
        Resume
      </button>
      <button
        onClick={() => {
          context.threads.forEach((thread) => thread.stop());
          context.clearDesk();
        }}
        type="button"
      >
        Clear desk
      </button>
    </div>
  );};

export default Menubar;