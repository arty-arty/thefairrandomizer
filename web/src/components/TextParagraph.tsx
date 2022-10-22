import { FunctionComponent } from "react";
import styles from "./TextParagraph.module.css";

type TextParagraphType = {
  text1?: string;
  href?: string;
  text?: string;
  text2?: string;
  anchor?: string;
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

export const TextParagraphAnchor: FunctionComponent<TextParagraphType> = ({ anchor, text1, text2, href }) => {
  return (
    <div className={styles.textParagraphDiv}>
      <div className={styles.textDiv}>
        {text1}
        <a href={href}>{anchor}</a>
        {text2}
      </div>
      <div className={styles.widthScrubberDiv}>
        <div className={styles.ignoreDiv} />
        <div className={styles.ignoreDiv} />
      </div>
    </div>
  );
};

export default TextParagraph;
