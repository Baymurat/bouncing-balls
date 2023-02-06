import styles from "./styles.module.scss";
import Menubar from "./MenuBar";
import Container from "./Container";
import AddBallModal from "../add-ball-modal";

const BallsContainer = () => (
  <div className={styles.container}>
    <AddBallModal />
    <Menubar />
    <Container />
  </div>
);

export default BallsContainer;
