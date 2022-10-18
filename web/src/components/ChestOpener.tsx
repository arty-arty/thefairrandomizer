/* tslint:disable */
import { FunctionComponent, useState } from "react";
import "antd/dist/antd.min.css";
import { Button } from "antd";
import styles from "./ChestOpener.module.css";
import axios from "axios";

type ChestOpenerType = {
  chestImage?: string;
  lootsTitle?: string;
  loot1?: string;
  loot2?: string;
  loot3?: string;
  loot4?: string;
};

type RandData = {
  randNumber?: string;
  txId?: string;
  txUrl?: string;
};

const LootEnumeration = ({
  chestImage,
  lootsTitle,
  loot1,
  loot2,
  loot3,
  loot4,
}: ChestOpenerType) => {
  return (<div className={styles.lootDiv}>
    <p className={styles.possibleLoot}>
      <span>{lootsTitle}</span>
    </p>
    <p className={styles.gold50P}>
      <span>{loot1}</span>
    </p>
    <p className={styles.possibleLoot}>
      <span>{loot2}</span>
    </p>
    <p className={styles.possibleLoot}>
      <span>{loot3}</span>
    </p>
    <p className={styles.magicalAlgoSphere5}>
      <span>{loot4}</span>
    </p>
  </div>)
}

const ChestOpener: FunctionComponent<ChestOpenerType> = ({
  chestImage,
  lootsTitle,
  loot1,
  loot2,
  loot3,
  loot4,
}) => {

  const [currentRound, setCurrentRound] = useState(null);
  const [loading, setLoading] = useState(false);
  const [randData, setRandData] = useState<RandData>({});
  const [pk, setPk] = useState(null);
  const [currentChestImage, setCurrentChestImage] = useState("../closed.png");

  const getRandom = async ({ pk }: { pk: String }) => {
    if (!pk) { setLoading(false); return; }//clear spinning wheel
    const randData = await axios({
      method: 'post',
      url: 'http://localhost:4000/proofOfRandom',
      timeout: 10000, // only wait for 10s
      data: { pk }
    }).catch(() => { setLoading(false); }) || { data: null }
    const data = randData?.data
    console.log("Got data", { data })
    setRandData(data);
    setLoading(false);
  }

  const clicked = async () => {
    //fetch current round from backend by submitting zero
    //or better from algod
    setRandData({});
    const roundData = await axios.get("http://localhost:4000/publicKey")
    const firstRound = roundData?.data?.firstRound;
    console.log(currentRound);
    if (firstRound) { setCurrentRound(firstRound); setLoading(true); }
    const pkData = roundData
    console.log(pkData.data)
    const pk = pkData.data.pk
    setPk(pk);
    setTimeout(async () => { await getRandom({ pk }) }, 11 * 1000)
  }

  return (
    <div className={styles.caseDiv}>
      <b className={styles.chestOpeningSimulator}>Chest Opening Simulator</b>
      <div className={styles.chestandopenDiv}>
        <div className={styles.component1Div}>
          <img className={styles.closed1Icon} alt="" src={currentChestImage} />
        </div>
        <Button type="default" size="middle" shape="round" onClick={async () => { await clicked(); }}>
          Open!
        </Button>
        <br />

      </div>
      !loading ? <LootEnumeration {...{
        loot1,
        loot2,
        loot3,
        loot4
      }}></LootEnumeration> : null
    </div >
  );
};

export default ChestOpener;
