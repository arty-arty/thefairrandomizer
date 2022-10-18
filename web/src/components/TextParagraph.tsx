import { FunctionComponent } from "react";
import styles from "./TextParagraph.module.css";

type TextParagraphType = {
  text?: string;
};

const TextParagraph: FunctionComponent<TextParagraphType> = ({ text }) => {
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

export default TextParagraph;
