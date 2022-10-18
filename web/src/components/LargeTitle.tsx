import { FunctionComponent } from "react";
import styles from "./LargeTitle.module.css";

type LargeTitleType = {
  title?: string;
};

const LargeTitle: FunctionComponent<LargeTitleType> = ({ title }) => {
  return (
    <div className={styles.largeTitleDiv}>
      <div className={styles.largeDiv}>{title}</div>
    </div>
  );
};

export default LargeTitle;
