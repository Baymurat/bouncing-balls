import { useEffect, PropsWithChildren } from "react";
import { useCustomRef } from "../../helpers/hooks";
import { Thread } from "../../helpers/thread";
import styles from "./styles.module.scss";

type Props = PropsWithChildren & React.CSSProperties & {
  onMount: (ref: HTMLDivElement | null) => Thread | undefined;
}

const BallV2 = (props: Props) => {
  const {
    width, height, backgroundColor, children, onMount
  } = props;
  const [ref, setRef] = useCustomRef<HTMLDivElement>();

  useEffect(() => {
    const ballThread = onMount(ref);
    
    return () => ballThread?.stop();
  }, [ref]);

  return (
    <div 
      style={{
        width, height, backgroundColor,
      }}
      className={styles.ballv2} ref={setRef}
    >
      {children}
    </div>
  );};

export default BallV2;