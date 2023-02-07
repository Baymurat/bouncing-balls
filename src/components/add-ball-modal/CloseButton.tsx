import styles from "./styles.module.scss";

type Props = {
  onClick: () => void;
  className?: string;
}

const CloseButton = ({ onClick, className }: Props) => (
  <div onClick={onClick} className={`${styles.closeButton} ${className}`}>
    <div className={styles.one}></div>
    <div className={styles.two}></div>
    <div className={styles.three}></div>
    <div className={styles.four}></div>
  </div>
);

export default CloseButton;