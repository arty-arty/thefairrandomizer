/* tslint:disable */
import { FunctionComponent, useState } from "react";
import "antd/dist/antd.min.css";
import { Button } from "antd";
import styles from "./ChestOpener.module.css";
import axios from "axios";

const waitingTime = 11 * 1000; // initial time in milliseconds
const interval = 1000; // interval to change remaining time amount

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
// loot1 = "Gold 50% (0-127)"
// loot2 = "Emeralds 25% (128-191)"
// loot3 = "Diamonds 18.75% (192-239)"
// loot4 = "Magical Algo Sphere 6.25% (240-255)"

const decidePrize = (n: Number) => {
  if (0 <= n && n <= 127) return "../gold.png"
  if (128 <= n && n <= 191) return "../emeralds.png"
  if (192 <= n && n <= 239) return "../diamonds.png"
  if (240 <= n && n <= 255) return "../sphere.png"
}

import { TechnicalData } from "./RandomGenerator";
import { RotatingLines } from "react-loader-spinner";
import useCountDown from "react-countdown-hook";
import { HexLoader } from "./HexLoader";
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
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(waitingTime + 7000, interval);

  const getRandom = async ({ pk, start }: { pk: String, start: Function }) => {
    if (!pk) { setLoading(false); return; }//clear spinning wheel

    const randData = await axios({
      method: 'post',
      url: 'https://api.algotool.app/random/proofOfRandom',
      timeout: 25000, // only wait for 20s
      data: { pk }
    }).catch(() => { setLoading(false); }) || { data: null }
    const data = randData?.data
    console.log("Got data", { data })
    setRandData(data);
    setLoading(false);

    setCurrentChestImage(decidePrize(parseInt(data.randNumber, 10)))
  }

  const clicked = async ({ start }) => {
    //fetch current round from backend by submitting zero
    //or better from algod
    setRandData({});
    setCurrentChestImage("../closed.png");
    const roundData = await axios.get("https://api.algotool.app/random/publicKey")
    const firstRound = roundData?.data?.firstRound;
    console.log(currentRound);
    if (firstRound) { setCurrentRound(firstRound); setLoading(true); start(); }
    const pkData = roundData
    console.log(pkData.data)
    const pk = pkData.data.pk
    setPk(pk);
    setTimeout(async () => { await getRandom({ pk, start }) }, waitingTime)
  }

  return (
    <div className={styles.caseDiv}>
      <b className={styles.chestOpeningSimulator}>Chest Opening Simulator</b>
      <div className={styles.chestandopenDiv}>
        <div className={styles.component1Div}>
          <img className={styles.closed1Icon} alt="" src={currentChestImage} />
        </div>
        {!loading ? <Button type="default" size="middle" shape="round" onClick={async () => { await clicked({ start }); }}>
          Open!
        </Button> :
          <HexLoader timeLeft={timeLeft / 1000} />}
        <br />

      </div>
      {!randData.txId ? <LootEnumeration {...{
        loot1,
        loot2,
        loot3,
        loot4
      }}></LootEnumeration> : null}
      {(randData.txId || loading) ? <TechnicalData {...{ currentRound, randData, pk, timeLeft: 0 }}></TechnicalData> : null
      }
    </div >
  );
};

export default ChestOpener;
