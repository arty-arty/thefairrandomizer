import { FunctionComponent } from "react";
import LargeTitle from "../components/LargeTitle";
import TextParagraph from "../components/TextParagraph";
import TextParagraphAnchor from "../components/TextParagraph";

import RandomGenerator from "../components/RandomGenerator";
import ChestOpener from "../components/ChestOpener";
import TextParagraph1 from "../components/TextParagraph1";
import stylesT from "./TextParagraph.module.css";
import styles from "./TheRandomizerMain.module.css";


const TheRandomizerMain: FunctionComponent = () => {
  return (
    <div className={styles.frameDiv}>
      <LargeTitle title="The Fair Randomizer" />

      <div className={stylesT.textParagraphDiv}>
        <div className={stylesT.textDiv}>
          Welcome! Enjoy  <a href={"https://github.com/arty-arty/thefairrandomizer"} style={{ textDecoration: "underline" }}>blockchain-approved random numbers generator</a>.  
          The fairness is proved by a smart signature running on decentralized Algorand network.
          Try to generate a random number from 0 to 255 or simulate the case opening with fair random by yourself!
        </div>
        <div className={stylesT.widthScrubberDiv}>
          <div className={stylesT.ignoreDiv} />
          <div className={stylesT.ignoreDiv} />
        </div>
      </div>
      <TextParagraphAnchor text1="Welcome! Enjoy " anchor="" text2="" />
      {/* <TextParagraph text="Welcome! Enjoy blockchain-approved random numbers generator. The fairness is proved by a smart signature running on decentralized Algorand network. Try to generate a random number from 0 to 255 or simulate the case opening with fair random by yourself!" />
      <TextParagraph text="Welcome! Enjoy blockchain-approved random numbers generator. The fairness is proved by a smart signature running on decentralized Algorand network. Try to generate a random number from 0 to 255 or simulate the case opening with fair random by yourself!" />
      <TextParagraph text="Welcome and meet The Fair Randomizer! A simple proven-fair upgrade for your favourite random numbers generator. It is a web2 API that generates true random numbers. The fairness is proved by a smart signature running on decentralized Algorand network.! Enjoy blockchain-approved random numbers generator. Try to generate a random number from 0 to 255 or simulate the case opening with fair random by yourself!" /> */}

      <RandomGenerator min="0" max="255" />
      <ChestOpener
        chestImage="../closed.png"
        lootsTitle="Possible loot:"
        loot1="Gold 50% (0-127)"
        loot2="Emeralds 25% (128-191)"
        loot3="Diamonds 18.75% (192-239)"
        loot4="Magical Algo Sphere 6.25% (240-255)"
      />
      <a href={"https://github.com/arty-arty/thefairrandomizer"} style={{ textDecoration: "underline" }}>Read more about the project and see the code here.</a>
      {/* <TextParagraph1 text="You can" /> */}
    </div>
  );
};

export default TheRandomizerMain;
