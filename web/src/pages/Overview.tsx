import { FunctionComponent } from "react";
import TheRandomizerMain from "../components/TheRandomizerMain";
import styles from "./Overview.module.css";

const Overview: FunctionComponent = () => {
  return (
    <div className={styles.overviewDiv}>
      <TheRandomizerMain />
    </div>
  );
};

export default Overview;
