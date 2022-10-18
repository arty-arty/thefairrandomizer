import { FunctionComponent } from "react";
import styles from "./TextParagraph1.module.css";

type TextParagraph1Type = {
  text?: string;
};

const TextParagraph1: FunctionComponent<TextParagraph1Type> = ({ text }) => {
  return (
    <div className={styles.textParagraphDiv}>
      <div className={styles.textDiv}>{text}</div>
      <div className={styles.widthScrubberDiv}>
        <div className={styles.ignoreDiv} />
        <div className={styles.ignoreDiv} />
      </div>
    </div>
  );
};

export default TextParagraph1;
