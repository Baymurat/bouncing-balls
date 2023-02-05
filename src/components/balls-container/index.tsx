import styles from "./styles.module.scss";
import Menubar from "./MenuBar";
import Container from "./Container";

const BallsContainer = () => (
  <div className={styles.container}>
    <Menubar />
    <Container />
  </div>
);

export default BallsContainer;
