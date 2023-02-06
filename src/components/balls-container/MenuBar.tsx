import { useBallsContext } from "../../context/ballsContext";
import { generateRandomBall } from "../../helpers/generateBall";
import { Button } from "@mui/material";

import styles from "./styles.module.scss";

const Menubar = () => {
  const context = useBallsContext();
  
  return (
    <div className={styles.menubar}>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          const ball = generateRandomBall();
          context.addBall(ball);
        }}
      >
        Add random ball
      </Button>
      <Button
        classes={{textInfo: "ASDSAD"}}
        variant="contained"
        color="success"
        onClick={() => {
          context.threads.forEach((thread) => thread.stop());
        }}
        type="button"
      >
        Pause
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          context.threads.forEach((thread) => thread.start());
        }}
        type="button"
      >
        Resume
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          context.threads.forEach((thread) => thread.stop());
          context.clearDesk();
        }}
        type="button"
      >
        Clear desk
      </Button>
    </div>
  );};

export default Menubar;