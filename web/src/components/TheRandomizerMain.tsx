import { FunctionComponent } from "react";
import LargeTitle from "../components/LargeTitle";
import TextParagraph from "../components/TextParagraph";
import RandomGenerator from "../components/RandomGenerator";
import ChestOpener from "../components/ChestOpener";
import TextParagraph1 from "../components/TextParagraph1";
import styles from "./TheRandomizerMain.module.css";

const TheRandomizerMain: FunctionComponent = () => {
  return (
    <div className={styles.frameDiv}>
      <LargeTitle title="The Fair Randomizer" />
      <TextParagraph text="Welcome! Enjoy blockchain-approved random numbers generator. Try to generate a random number from 0 to 255 or simulate the case opening with fair random by yourseflf!" />
      <RandomGenerator min="0" max="255" />
      <ChestOpener
        chestImage="../closed.png"
        lootsTitle="Possible loot:"
        loot1="Gold 50%"
        loot2="Emeralds 30%"
        loot3="Diamonds 15%"
        loot4="Magical Algo Sphere 5% "
      />
      <TextParagraph1 text="You can read more about project and watch the code here." />
    </div>
  );
};

export default TheRandomizerMain;
